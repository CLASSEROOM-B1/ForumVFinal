package db

import (
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
)

func ConnectDb(db *sql.DB) {
	db, err := sql.Open("sqlite3", "API/dataBase.db")
	if err != nil {
		fmt.Println(err)
		return
	}
}

func Initdb(db *sql.DB) {
	ConnectDb(db)

	defer db.Close()

	_, err := db.Exec("CREATE TABLE IF NOT EXISTS User(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, pseudo varchar(255), email varchar(255), password varchar(255), biography text)")
	if err != nil {
		fmt.Println(err)
		return
	}
	_, err2 := db.Exec("CREATE TABLE IF NOT EXISTS Follow(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, followerId int, userId int)")
	if err2 != nil {
		fmt.Println(err2)
		return
	}
	_, err3 := db.Exec("CREATE TABLE IF NOT EXISTS BlockedUser(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, userWhoBlockedId int, userBlockedId int)")
	if err3 != nil {
		fmt.Println(err3)
		return
	}
	_, err4 := db.Exec("CREATE TABLE IF NOT EXISTS Post(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, creatorId int, title varchar(255), category varchar(255), message text)")
	if err4 != nil {
		fmt.Println(err4)
		return
	}
	_, err5 := db.Exec("CREATE TABLE IF NOT EXISTS PostLike(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, postId int, userId int)")
	if err5 != nil {
		fmt.Println(err5)
		return
	}
	_, err6 := db.Exec("CREATE TABLE IF NOT EXISTS Comment(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, creatorId int, postId int, message text)")
	if err6 != nil {
		fmt.Println(err6)
		return
	}
	_, err7 := db.Exec("CREATE TABLE IF NOT EXISTS CommentLike(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, commentId int, userId int)")
	if err7 != nil {
		fmt.Println(err7)
		return
	}
}
