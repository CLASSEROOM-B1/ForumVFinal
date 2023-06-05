package controller

import (
	"database/sql"
	"fmt"
	base "forum/API/db"
	entity "forum/API/entity"
)

func CreateBlockedUser(db *sql.DB, blockedUser entity.BlockedUser) {

	base.ConnectDb(db)

	defer db.Close()

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
}

func GetBlockedUsers(db *sql.DB, id int) []entity.User {
	var blockedUsers []entity.User

	base.ConnectDb(db)

	defer db.Close()

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

	return blockedUsers
}

func DeleteBlockedUser(db *sql.DB, id int) {

	base.ConnectDb(db)

	defer db.Close()

	_, err := db.Exec("DELETE FROM BlockedUser WHERE id=?", id)
	if err != nil {
		panic(err)
	}
}
