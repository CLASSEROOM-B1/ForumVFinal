package controller

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"forum/API/entity"
	"log"
	"net/http"
	"strconv"
	"strings"
)

func CreateFollow(w http.ResponseWriter, r *http.Request) {

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	var follow entity.Follow
	if err := json.NewDecoder(r.Body).Decode(&follow); err != nil {
		log.Fatal(err)
	}

	try := db.QueryRow("SELECT * FROM Follow WHERE followerId=? AND userId=?", follow.FollowerId, follow.UserId)
	if try == nil {
		return
	}

	exec := "INSERT INTO Follow (followerId, userId) VALUES (?,?)"
	stmt, err := db.Prepare(exec)
	if err != nil {
		fmt.Println(err)
		return
	}

	res, err := stmt.Exec(follow.FollowerId, follow.UserId)
	if err != nil {
		fmt.Println(err)
		fmt.Println(res)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(follow)
}

func GetFollows(w http.ResponseWriter, r *http.Request) {
	var follows []entity.User

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	id, _ := strconv.Atoi(strings.Split(r.URL.Path, "/")[len(strings.Split(r.URL.Path, "/"))-1])

	rows, err := db.Query("SELECT * FROM Follow WHERE followerId = ?", id)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var follow entity.Follow
		err := rows.Scan(&follow.Id, &follow.FollowerId, &follow.UserId)
		if err != nil {
			panic(err)
		}

		var user entity.User
		err = db.QueryRow("SELECT * FROM User WHERE id=?", follow.UserId).Scan(&user.Id, &user.Pseudo, &user.Email, &user.Password, &user.Biography)
		if err != nil {
			panic(err)
		}

		follows = append(follows, user)
	}

	err = rows.Err()
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(follows)
}

func GetFollowers(w http.ResponseWriter, r *http.Request) {
	var follows []entity.User

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	id, _ := strconv.Atoi(strings.Split(r.URL.Path, "/")[len(strings.Split(r.URL.Path, "/"))-1])

	rows, err := db.Query("SELECT * FROM Follow WHERE UserId = ?", id)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var follow entity.Follow
		err := rows.Scan(&follow.Id, &follow.FollowerId, &follow.UserId)
		if err != nil {
			panic(err)
		}

		var user entity.User
		err = db.QueryRow("SELECT * FROM User WHERE id=?", follow.FollowerId).Scan(&user.Id, &user.Pseudo, &user.Email, &user.Password, &user.Biography)
		if err != nil {
			panic(err)
		}

		follows = append(follows, user)
	}

	err = rows.Err()
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(follows)
}

func DeleteFollow(w http.ResponseWriter, r *http.Request) {

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	cookie, _ := r.Cookie("cookieForum")

	var user entity.User
	err = db.QueryRow("SELECT * FROM User WHERE email=?", cookie.Value).Scan(&user.Id, &user.Pseudo, &user.Email, &user.Password, &user.Biography)
	if err != nil {
		panic(err)
	}

	id, _ := strconv.Atoi(strings.Split(r.URL.Path, "/")[len(strings.Split(r.URL.Path, "/"))-1])

	_, err = db.Exec("DELETE FROM Follow WHERE followerId=? AND userId=?", user.Id, id)
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

}
