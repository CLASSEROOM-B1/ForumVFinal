package main

import (
	"fmt"
	"html/template"
	"net/http"
)

func main() {
	//Demarrage du Serveur
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/", HomePage)

	fmt.Println("http://localhost:8080" + "aaa")
	http.ListenAndServe(":8080", nil)

}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
func HomePage(w http.ResponseWriter, r *http.Request) {

	tmpl, err := template.ParseFiles("./html/pages/profilpage.html", "./html/templates/header.html")
	if err != nil {
		println(err)
	}

	tmpl.Execute(w, "hhh")
}
