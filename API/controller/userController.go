package controller

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"forum/API/entity"
	"forum/API/middleware"
	"log"
	"net/http"
	"strconv"
	"strings"
)

var db *sql.DB

func CreateUser(w http.ResponseWriter, r *http.Request) {

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	var user entity.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		log.Fatal(err)
	}

	if VerifPseudo(user.Pseudo) {
		if VerifEmail(user.Email) {
			exec := "INSERT INTO User (pseudo, email, password, biography) VALUES (?,?,?,?)"
			stmt, err := db.Prepare(exec)
			if err != nil {
				fmt.Println(err)
				return
			}

			user.Password, _ = middleware.HashPassword(user.Password)

			res, err := stmt.Exec(user.Pseudo, user.Email, user.Password, user.Biography)
			if err != nil {
				fmt.Println(err)
				fmt.Println(res)
				return
			}
			middleware.CreateCookie(w, r, user.Email)
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusCreated)
			json.NewEncoder(w).Encode(user)
		} else {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)
		}
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
	}

}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	var users []entity.User

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	rows, err := db.Query("SELECT * FROM User")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var user entity.User
		err := rows.Scan(&user.Id, &user.Pseudo, &user.Email, &user.Password, &user.Biography)
		if err != nil {
			panic(err)
		}
		users = append(users, user)
	}

	err = rows.Err()
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
}

func GetOneUser(w http.ResponseWriter, r *http.Request) {
	var user entity.User

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	id, _ := strconv.Atoi(strings.Split(r.URL.Path, "/")[len(strings.Split(r.URL.Path, "/"))-1])

	err = db.QueryRow("SELECT * FROM User WHERE id=?", id).Scan(&user.Id, &user.Pseudo, &user.Email, &user.Password, &user.Biography)
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}

func GetUserConnected(w http.ResponseWriter, r *http.Request) {
	var user entity.User

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	cookie, _ := r.Cookie("cookieForum")

	err = db.QueryRow("SELECT * FROM User WHERE email=?", cookie.Value).Scan(&user.Id, &user.Pseudo, &user.Email, &user.Password, &user.Biography)
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	type Updater struct {
		Param   string `json:"param"`
		Updater string `json:"updater"`
		Id      int    `json:"id"`
	}
	var update Updater
	if err := json.NewDecoder(r.Body).Decode(&update); err != nil {
		log.Fatal(err)
	}

	stmt, err := db.Prepare("UPDATE User SET " + update.Param + "=? WHERE id=?")
	if err != nil {
		fmt.Println(err)
		return
	}
	res, err := stmt.Exec(update.Updater, update.Id)
	if err != nil {
		fmt.Println(err)
		fmt.Println(res)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	var user entity.User

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	var userDecode entity.User
	if err := json.NewDecoder(r.Body).Decode(&userDecode); err != nil {
		log.Fatal(err)
	}

	err = db.QueryRow("SELECT * FROM User WHERE pseudo=?", userDecode.Pseudo).Scan(&user.Id, &user.Pseudo, &user.Email, &user.Password, &user.Biography)
	if err != nil {
		panic(err)
	}

	if middleware.CheckPasswordHash(userDecode.Password, user.Password) {
		middleware.CreateCookie(w, r, user.Email)
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(user)
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
	}

}

func VerifPseudo(pseudo string) bool {
	var bool bool
	var result string

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	err = db.QueryRow("SELECT pseudo FROM User WHERE pseudo=?", pseudo).Scan(&result)
	if err != nil {
		bool = true
	}

	return bool
}

func VerifEmail(email string) bool {
	var bool bool
	var result string

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	err = db.QueryRow("SELECT email FROM User WHERE email=?", email).Scan(&result)
	if err != nil {
		bool = true
	}

	return bool
}

func VerifPassword(pseudo string, password string) bool {
	var bool bool
	var result string

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	err = db.QueryRow("SELECT password FROM User WHERE pseudo=?", pseudo).Scan(&result)
	if err != nil {
		fmt.Println(err)
	}

	if middleware.CheckPasswordHash(password, result) {
		bool = true
	}

	return bool
}
