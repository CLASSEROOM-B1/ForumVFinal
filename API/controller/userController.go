package controller

import (
	"database/sql"
	"fmt"
	base "forum/API/db"
	entity "forum/API/entity"
	middleware "forum/API/middleware"
)

func CreateUser(db *sql.DB, user entity.User) {

	base.ConnectDb(db)

	defer db.Close()

	exec := "INSERT INTO User (pseudo, email, password, biography) VALUES (?,?,?,?)"
	stmt, err := db.Prepare(exec)
	if err != nil {
		fmt.Println(err)
		return
	}

	res, err := stmt.Exec(user.Pseudo, user.Email, user.Password, user.Biography)
	if err != nil {
		fmt.Println(err)
		fmt.Println(res)
		return
	}

	user.Password, _ = middleware.HashPassword(user.Password)
}

func GetUsers(db *sql.DB) []entity.User {
	var users []entity.User

	base.ConnectDb(db)

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

	return users
}

func GetOneUser(db *sql.DB, Pseudo string) entity.User {
	var user entity.User

	base.ConnectDb(db)

	defer db.Close()

	err := db.QueryRow("SELECT * FROM User WHERE pseudo=?", Pseudo).Scan(&user.Id, &user.Pseudo, &user.Email, &user.Password, &user.Biography)
	if err != nil {
		panic(err)
	}

	return user
}

func UpdateUser(db *sql.DB, param string, updater string, email string) {

	base.ConnectDb(db)

	defer db.Close()

	stmt, err := db.Prepare("UPDATE User SET " + param + "=? WHERE email=?")
	if err != nil {
		fmt.Println(err)
		return
	}
	res, err := stmt.Exec(updater, email)
	if err != nil {
		fmt.Println(err)
		fmt.Println(res)
		return
	}
}

func VerifPseudo(db *sql.DB, pseudo string) bool {
	var bool bool
	var result string

	base.ConnectDb(db)

	defer db.Close()

	err := db.QueryRow("SELECT pseudo FROM User WHERE pseudo=?", pseudo).Scan(&result)
	if err != nil {
		bool = true
	}

	return bool
}

func VerifEmail(db *sql.DB, email string) bool {
	var bool bool
	var result string

	base.ConnectDb(db)

	defer db.Close()

	err := db.QueryRow("SELECT email FROM User WHERE email=?", email).Scan(&result)
	if err != nil {
		bool = true
	}

	return bool
}

func VerifPassword(db *sql.DB, pseudo string, password string) bool {
	var bool bool
	var result string

	base.ConnectDb(db)

	defer db.Close()

	err := db.QueryRow("SELECT password FROM User WHERE pseudo=?", pseudo).Scan(&result)
	if err != nil {
		fmt.Println(err)
	}

	if middleware.CheckPasswordHash(password, result) {
		bool = true
	}

	return bool
}
