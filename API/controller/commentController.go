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

func CreateComment(w http.ResponseWriter, r *http.Request) {

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	var comment entity.Comment
	if err := json.NewDecoder(r.Body).Decode(&comment); err != nil {
		log.Fatal(err)
	}

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

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(comment)
}

func GetPostComments(w http.ResponseWriter, r *http.Request) {
	var postComments []entity.Comment

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	id, _ := strconv.Atoi(strings.Split(r.URL.Path, "/")[len(strings.Split(r.URL.Path, "/"))-1])

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

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(postComments)
}

func DeleteComment(w http.ResponseWriter, r *http.Request) {

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
	err = db.QueryRow("SELECT userId FROM Comment WHERE id=?", id).Scan(&creatorId)
	if err != nil {
		panic(err)
	}

	if creatorId == userId {
		_, err = db.Exec("DELETE FROM Comment WHERE id=?", id)
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
