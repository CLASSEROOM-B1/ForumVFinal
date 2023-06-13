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

func CreatePostLike(w http.ResponseWriter, r *http.Request) {

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	var postLike entity.PostLike
	if err := json.NewDecoder(r.Body).Decode(&postLike); err != nil {
		log.Fatal(err)
	}

	try := db.QueryRow("SELECT * FROM PostLike WHERE postId=? AND userId=?", postLike.PostId, postLike.UserId)
	if try == nil {
		return
	}

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

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(postLike)
}

func GetLikesOfPost(w http.ResponseWriter, r *http.Request) {
	var postLikes []entity.PostLike

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	id, _ := strconv.Atoi(strings.Split(r.URL.Path, "/")[len(strings.Split(r.URL.Path, "/"))-1])

	rows, err := db.Query("SELECT * FROM PostLike WHERE PostId = ?", id)
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

		postLikes = append(postLikes, postLike)
	}

	err = rows.Err()
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(postLikes)
}

func GetUserPostLiked(w http.ResponseWriter, r *http.Request) {
	var postsLiked []entity.Post

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	id, _ := strconv.Atoi(strings.Split(r.URL.Path, "/")[len(strings.Split(r.URL.Path, "/"))-1])

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

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(postsLiked)
}

func DeletePostLike(w http.ResponseWriter, r *http.Request) {

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	var userId int
	if err := json.NewDecoder(r.Body).Decode(&userId); err != nil {
		log.Fatal(err)
	}

	id, _ := strconv.Atoi(strings.Split(r.URL.Path, "/")[len(strings.Split(r.URL.Path, "/"))-1])

	var creatorId int
	err = db.QueryRow("SELECT userId FROM PostLike WHERE id=?", id).Scan(&creatorId)
	if err != nil {
		panic(err)
	}

	if userId == creatorId {
		_, err := db.Exec("DELETE FROM PostLike WHERE id=?", id)
		if err != nil {
			panic(err)
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
	}
}
