package controller

import (
	"database/sql"
	"fmt"
	base "forum/API/db"
	entity "forum/API/entity"
)

func CreatePostLike(db *sql.DB, postLike entity.PostLike) {

	base.ConnectDb(db)

	defer db.Close()

	exec := "INSERT INTO PostLike (postId, userId) VALUES (?,?)"
	stmt, err := db.Prepare(exec)
	if err != nil {
		fmt.Println(err)
		return
	}

	res, err := stmt.Exec(postLike.PostId, postLike.UserId)
	if err != nil {
		fmt.Println(err)
		fmt.Println(res)
		return
	}
}

func GetUserPostLiked(db *sql.DB, id int) []entity.Post {
	var postsLiked []entity.Post

	base.ConnectDb(db)

	defer db.Close()

	rows, err := db.Query("SELECT * FROM PostLike WHERE UserId = ?", id)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var postLike entity.PostLike
		err := rows.Scan(&postLike.Id, &postLike.PostId, &postLike.UserId)
		if err != nil {
			panic(err)
		}

		var post entity.Post
		err = db.QueryRow("SELECT * FROM Post WHERE id=?", postLike.PostId).Scan(&post.Id, &post.CreatorId, &post.Title, &post.Category, &post.Message)
		if err != nil {
			panic(err)
		}

		postsLiked = append(postsLiked, post)
	}

	err = rows.Err()
	if err != nil {
		panic(err)
	}

	return postsLiked
}

func DeletePostLike(db *sql.DB, id int) {

	base.ConnectDb(db)

	defer db.Close()

	_, err := db.Exec("DELETE FROM PostLike WHERE id=?", id)
	if err != nil {
		panic(err)
	}
}
