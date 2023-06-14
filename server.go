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

	http.HandleFunc("/login", LoginPage)
	http.HandleFunc("/register", RegisterPage)
	http.HandleFunc("/userprofil", UserProfilePage)
	http.HandleFunc("/profil", ProfilPage)
	http.HandleFunc("/aboutus", AboutUsPage)

	fmt.Println("http://localhost:8080/")
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

func UserProfilePage(w http.ResponseWriter, r *http.Request) {

	tmpl, _ := template.ParseFiles("./html/pages/userprofilpage.html", "./html/templates/header.html")

	tmpl.Execute(w, "")
}

func ProfilPage(w http.ResponseWriter, r *http.Request) {

	tmpl, _ := template.ParseFiles("./html/pages/profilpage.html", "./html/templates/header.html")

	tmpl.Execute(w, "")
}

func AboutUsPage(w http.ResponseWriter, r *http.Request) {

	tmpl, err := template.ParseFiles("./html/pages/aboutus.html", "./html/templates/header.html")
	if err != nil {
		println(err)
	}

	tmpl.Execute(w, "")
}
