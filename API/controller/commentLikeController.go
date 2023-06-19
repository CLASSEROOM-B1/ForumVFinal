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

func CreateCommentLike(w http.ResponseWriter, r *http.Request) {

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	var commentLike entity.CommentLike
	if err := json.NewDecoder(r.Body).Decode(&commentLike); err != nil {
		log.Fatal(err)
	}

	try := db.QueryRow("SELECT * FROM CommentLike WHERE commentId=? AND userId=?", commentLike.CommentId, commentLike.UserId)
	if try == nil {
		return
	}

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

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(commentLike)
}

func GetLikesOfComment(w http.ResponseWriter, r *http.Request) {
	var commentLikes []entity.CommentLike

	db, err := sql.Open("sqlite3", "API/db/dataBase.db")
	if err != nil {
		fmt.Println(err)
	}

	defer db.Close()

	id, _ := strconv.Atoi(strings.Split(r.URL.Path, "/")[len(strings.Split(r.URL.Path, "/"))-1])

	rows, err := db.Query("SELECT * FROM CommentLike WHERE CommentId = ?", id)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var commentLike entity.CommentLike
		err := rows.Scan(&commentLike.Id, &commentLike.CommentId, &commentLike.UserId)
		if err != nil {
			panic(err)
		}

		commentLikes = append(commentLikes, commentLike)
	}

	err = rows.Err()
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(commentLikes)
}

func DeleteCommentLike(w http.ResponseWriter, r *http.Request) {

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
	err = db.QueryRow("SELECT userId FROM CommentLike WHERE id=?", id).Scan(&creatorId)
	if err != nil {
		panic(err)
	}

	if creatorId == userId {
		_, err = db.Exec("DELETE FROM CommentLike WHERE id=?", id)
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
