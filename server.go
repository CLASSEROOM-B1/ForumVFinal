package main

import (
	"database/sql"
	"fmt"
	base "forum/API/db"
	"net/http"
)

func main() {
	//Demarrage du Serveur
	var db *sql.DB
	base.Initdb(db)

	fmt.Println("http://localhost:8080")

	http.ListenAndServe(":8080", nil)

}
