package db

import (
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
)

func Initdb(db *sql.DB) {
	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
		return
	}

	defer db.Close()

	_, err1 := db.Exec("CREATE TABLE IF NOT EXISTS User(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, pseudo TEXT, email TEXT, password TEXT, biography TEXT)")
	if err1 != nil {
		fmt.Println(err1)
		return
	}
	_, err2 := db.Exec("CREATE TABLE IF NOT EXISTS Follow(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, followerId INTEGER, userId INTEGER)")
	if err2 != nil {
		fmt.Println(err2)
		return
	}
	_, err3 := db.Exec("CREATE TABLE IF NOT EXISTS BlockedUser(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, userWhoBlockedId INTEGER, userBlockedId INTEGER)")
	if err3 != nil {
		fmt.Println(err3)
		return
	}
	_, err4 := db.Exec("CREATE TABLE IF NOT EXISTS Post(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, creatorId INTEGER, title TEXT, category TEXT, message TEXT)")
	if err4 != nil {
		fmt.Println(err4)
		return
	}
	_, err5 := db.Exec("CREATE TABLE IF NOT EXISTS PostLike(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, postId INTEGER, userId INTEGER)")
	if err5 != nil {
		fmt.Println(err5)
		return
	}
	_, err6 := db.Exec("CREATE TABLE IF NOT EXISTS Comment(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, creatorId INTEGER, postId INTEGER, message TEXT)")
	if err6 != nil {
		fmt.Println(err6)
		return
	}
	_, err7 := db.Exec("CREATE TABLE IF NOT EXISTS CommentLike(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, commentId INTEGER, userId INTEGER)")
	if err7 != nil {
		fmt.Println(err7)
		return
	}
}
