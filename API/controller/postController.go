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

func CreatePost(w http.ResponseWriter, r *http.Request) {

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	var post entity.Post
	if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
		log.Fatal(err)
	}

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

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(post)
}

func GetPosts(w http.ResponseWriter, r *http.Request) {
	var posts []entity.Post

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

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

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(posts)
}

func GetOnePost(w http.ResponseWriter, r *http.Request) {
	var post entity.Post

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	id, _ := strconv.Atoi(strings.Split(r.URL.Path, "/")[len(strings.Split(r.URL.Path, "/"))-1])

	err = db.QueryRow("SELECT * FROM Post WHERE id=?", id).Scan(&post.Id, &post.CreatorId, &post.Title, &post.Category, &post.Message)
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(post)
}

func GetPostsByTitle(w http.ResponseWriter, r *http.Request) {
	var posts []entity.Post

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	title := strings.Split(r.URL.Path, "/")[len(strings.Split(r.URL.Path, "/"))-1]

	rows, err := db.Query("SELECT * FROM Post WHERE title LIKE ?", "%"+title+"%")
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

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(posts)
}

func GetPostsByCategory(w http.ResponseWriter, r *http.Request) {
	var posts []entity.Post

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	category := strings.Split(r.URL.Path, "/")[len(strings.Split(r.URL.Path, "/"))-1]

	rows, err := db.Query("SELECT * FROM Post WHERE category =?", category)
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

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(posts)
}

func GetUserPosts(w http.ResponseWriter, r *http.Request) {
	var posts []entity.Post

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	id, _ := strconv.Atoi(strings.Split(r.URL.Path, "/")[len(strings.Split(r.URL.Path, "/"))-1])

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

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(posts)
}

func UpdatePost(w http.ResponseWriter, r *http.Request) {

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	type Updater struct {
		Param   string `json:"param"`
		Updater string `json:"updater"`
		Id      int    `json:"id"`
	}
	var update Updater
	if err := json.NewDecoder(r.Body).Decode(&update); err != nil {
		log.Fatal(err)
	}

	stmt, err := db.Prepare("UPDATE Post SET " + update.Param + "=? WHERE id=?")
	if err != nil {
		fmt.Println(err)
		return
	}
	res, err := stmt.Exec(update.Updater, update.Id)
	if err != nil {
		fmt.Println(err)
		fmt.Println(res)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
}

func DeletePost(w http.ResponseWriter, r *http.Request) {

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
	err = db.QueryRow("SELECT creatorId FROM Post WHERE id=?", id).Scan(&creatorId)
	if err != nil {
		panic(err)
	}

	if creatorId == userId {
		_, err = db.Exec("DELETE FROM Post WHERE id=?", id)
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
