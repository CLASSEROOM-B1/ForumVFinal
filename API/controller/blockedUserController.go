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

func CreateBlockedUser(w http.ResponseWriter, r *http.Request) {

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	var blockedUser entity.BlockedUser
	if err := json.NewDecoder(r.Body).Decode(&blockedUser); err != nil {
		log.Fatal(err)
	}

	try := db.QueryRow("SELECT * FROM BlockedUser WHERE userWhoBlockedId=? AND userBlockedId=?", blockedUser.UserWhoBlockedId, blockedUser.UserBlockedId)
	if try == nil {
		return
	}

	exec := "INSERT INTO BlockedUser (userWhoBlockedId, userBlockedId) VALUES (?,?)"
	stmt, err := db.Prepare(exec)
	if err != nil {
		fmt.Println(err)
		return
	}

	res, err := stmt.Exec(blockedUser.UserWhoBlockedId, blockedUser.UserBlockedId)
	if err != nil {
		fmt.Println(err)
		fmt.Println(res)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(blockedUser)
}

func GetBlockedUsers(w http.ResponseWriter, r *http.Request) {
	var blockedUsers []entity.User

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	id, _ := strconv.Atoi(strings.Split(r.URL.Path, "/")[len(strings.Split(r.URL.Path, "/"))-1])

	rows, err := db.Query("SELECT * FROM BlockedUser WHERE userWhoBlockedId = ?", id)
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

		blockedUsers = append(blockedUsers, user)
	}

	err = rows.Err()
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(blockedUsers)
}

func DeleteBlockedUser(w http.ResponseWriter, r *http.Request) {

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

	_, err = db.Exec("DELETE FROM BlockedUser WHERE userWhoBlockedId=? AND userBlockedId=?", user.Id, id)
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
}
