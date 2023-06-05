package controller

import (
	"database/sql"
	"fmt"
	base "forum/API/db"
	entity "forum/API/entity"
)

func CreateFollow(db *sql.DB, follow entity.Follow) {

	base.ConnectDb(db)

	defer db.Close()

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
}

func GetFollows(db *sql.DB, id int) []entity.User {
	var follows []entity.User

	base.ConnectDb(db)

	defer db.Close()

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

	return follows
}

func GetFollowers(db *sql.DB, id int) []entity.User {
	var follows []entity.User

	base.ConnectDb(db)

	defer db.Close()

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

	return follows
}

func DeleteFollow(db *sql.DB, id int) {

	base.ConnectDb(db)

	defer db.Close()

	_, err := db.Exec("DELETE FROM Follow WHERE id=?", id)
	if err != nil {
		panic(err)
	}
}
