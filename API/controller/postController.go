package controller

import (
	"database/sql"
	"fmt"
	base "forum/API/db"
	entity "forum/API/entity"
)

func CreatePost(db *sql.DB, post entity.Post) {

	base.ConnectDb(db)

	defer db.Close()

	exec := "INSERT INTO Post (creatorId, title, category, message) VALUES (?,?,?,?)"
	stmt, err := db.Prepare(exec)
	if err != nil {
		fmt.Println(err)
		return
	}

	res, err := stmt.Exec(post.CreatorId, post.Title, post.Category, post.Message)
	if err != nil {
		fmt.Println(err)
		fmt.Println(res)
		return
	}
}

func GetPosts(db *sql.DB) []entity.Post {
	var posts []entity.Post

	base.ConnectDb(db)

	defer db.Close()

	rows, err := db.Query("SELECT * FROM Post")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var post entity.Post
		err := rows.Scan(&post.Id, &post.CreatorId, &post.Title, &post.Category, &post.Message)
		if err != nil {
			panic(err)
		}
		posts = append(posts, post)
	}

	err = rows.Err()
	if err != nil {
		panic(err)
	}

	return posts
}

func GetOnePost(db *sql.DB, id int) entity.Post {
	var post entity.Post

	base.ConnectDb(db)

	defer db.Close()

	err := db.QueryRow("SELECT * FROM Post WHERE id=?", id).Scan(&post.Id, &post.CreatorId, &post.Title, &post.Category, &post.Message)
	if err != nil {
		panic(err)
	}

	return post
}

func GetUserPosts(db *sql.DB, id int) []entity.Post {
	var posts []entity.Post

	base.ConnectDb(db)

	defer db.Close()

	rows, err := db.Query("SELECT * FROM Post WHERE creatorId=?", id)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var post entity.Post
		err := rows.Scan(&post.Id, &post.CreatorId, &post.Title, &post.Category, &post.Message)
		if err != nil {
			panic(err)
		}
		posts = append(posts, post)
	}

	err = rows.Err()
	if err != nil {
		panic(err)
	}

	return posts
}

func UpdatePost(db *sql.DB, param string, updater string, id int) {

	base.ConnectDb(db)

	defer db.Close()

	stmt, err := db.Prepare("UPDATE Post SET " + param + "=? WHERE email=?")
	if err != nil {
		fmt.Println(err)
		return
	}
	res, err := stmt.Exec(updater, id)
	if err != nil {
		fmt.Println(err)
		fmt.Println(res)
		return
	}
}

func DeletePost(db *sql.DB, id int) {

	base.ConnectDb(db)

	defer db.Close()

	_, err := db.Exec("DELETE FROM Post WHERE id=?", id)
	if err != nil {
		panic(err)
	}
}
