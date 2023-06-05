package controller

import (
	"database/sql"
	"fmt"
	base "forum/API/db"
	entity "forum/API/entity"
)

func CreateCommentLike(db *sql.DB, commentLike entity.CommentLike) {

	base.ConnectDb(db)

	defer db.Close()

	exec := "INSERT INTO CommentLike (commentId, userId) VALUES (?,?)"
	stmt, err := db.Prepare(exec)
	if err != nil {
		fmt.Println(err)
		return
	}

	res, err := stmt.Exec(commentLike.CommentId, commentLike.UserId)
	if err != nil {
		fmt.Println(err)
		fmt.Println(res)
		return
	}
}

func DeleteCommentLike(db *sql.DB, id int) {

	base.ConnectDb(db)

	defer db.Close()

	_, err := db.Exec("DELETE FROM CommentLike WHERE id=?", id)
	if err != nil {
		panic(err)
	}
}
