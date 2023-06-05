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

	http.HandleFunc("/", LoginPage)
	http.HandleFunc("/register", RegisterPage)

	fmt.Println("http://localhost:8080")
	http.ListenAndServe(":8080", nil)

}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
func LoginPage(w http.ResponseWriter, r *http.Request) {

	tmpl, _ := template.ParseFiles("./html/pages/loginpage.html", "./html/templates/header.html")

	tmpl.Execute(w, "")
}

func RegisterPage(w http.ResponseWriter, r *http.Request) {

	tmpl, _ := template.ParseFiles("./html/pages/registerpage.html", "./html/templates/header.html")

	tmpl.Execute(w, "")
}
