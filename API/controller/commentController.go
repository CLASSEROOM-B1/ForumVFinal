package controller

import (
	"database/sql"
	"fmt"
	base "forum/API/db"
	entity "forum/API/entity"
)

func CreateComment(db *sql.DB, comment entity.Comment) {

	base.ConnectDb(db)

	defer db.Close()

	exec := "INSERT INTO Comment (creatorId, postId, message) VALUES (?,?,?)"
	stmt, err := db.Prepare(exec)
	if err != nil {
		fmt.Println(err)
		return
	}

	res, err := stmt.Exec(comment.CreatorId, comment.PostId, comment.Message)
	if err != nil {
		fmt.Println(err)
		fmt.Println(res)
		return
	}
}

func GetPostComments(db *sql.DB, id int) []entity.Comment {
	var postComments []entity.Comment

	base.ConnectDb(db)

	defer db.Close()

	rows, err := db.Query("SELECT * FROM Comment WHERE postId = ?", id)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var comment entity.Comment
		err := rows.Scan(&comment.Id, &comment.CreatorId, &comment.PostId, &comment.Message)
		if err != nil {
			panic(err)
		}

		postComments = append(postComments, comment)
	}

	err = rows.Err()
	if err != nil {
		panic(err)
	}

	return postComments
}

func DeleteComment(db *sql.DB, id int) {

	base.ConnectDb(db)

	defer db.Close()

	_, err := db.Exec("DELETE FROM Comment WHERE id=?", id)
	if err != nil {
		panic(err)
	}
}
