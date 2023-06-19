package main

import (
	"database/sql"
	"fmt"
	base "forum/API/db"
	"forum/API/middleware"
	"forum/API/routes"
	"html/template"
	"net/http"
)

func main() {
	//Demarrage du Serveur
	var db *sql.DB
	base.Initdb(db)

	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/login", LoginPage)
	http.HandleFunc("/register", RegisterPage)
	http.HandleFunc("/userprofil", UserProfilePage)
	http.HandleFunc("/profil", ProfilPage)
	http.HandleFunc("/aboutus", AboutUsPage)
	http.HandleFunc("/", HomePage)
	http.HandleFunc("/follow", FollowPage)

	routes.RoutageNoConnect()
	routes.RoutageConnect()

	fmt.Println("http://localhost:8080/")
	http.ListenAndServe(":8080", nil)

}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

func HomePage(w http.ResponseWriter, r *http.Request) {

	tmpl, _ := template.ParseFiles("./html/pages/homepage.html", "./html/templates/header.html", "./html/templates/category.html", "./html/templates/commentaire.html", "./html/templates/contenu.html", "./html/templates/searchbar.html", "./html/templates/card.html")

	tmpl.Execute(w, "")

}

func LoginPage(w http.ResponseWriter, r *http.Request) {

	tmpl, _ := template.ParseFiles("./html/pages/loginpage.html", "./html/templates/header.html")

	tmpl.Execute(w, "")
}

func RegisterPage(w http.ResponseWriter, r *http.Request) {

	tmpl, _ := template.ParseFiles("./html/pages/registerpage.html", "./html/templates/header.html")

	tmpl.Execute(w, "")
}

func UserProfilePage(w http.ResponseWriter, r *http.Request) {

	tmpl, _ := template.ParseFiles("./html/pages/userprofilpage.html", "./html/templates/header.html", "./html/templates/card.html")

	tmpl.Execute(w, "")
}

func ProfilPage(w http.ResponseWriter, r *http.Request) {

	if r.Method == "POST" {
		http.Redirect(w, r, "/home", 200)
		middleware.DeleteCookie(w, r)
	}

	tmpl, _ := template.ParseFiles("./html/pages/profilpage.html", "./html/templates/header.html", "./html/templates/card.html", "./html/templates/commentaire.html", "./html/templates/followers.html", "./html/templates/blockeduser.html")

	tmpl.Execute(w, "")
}

func AboutUsPage(w http.ResponseWriter, r *http.Request) {

	tmpl, err := template.ParseFiles("./html/pages/aboutus.html", "./html/templates/header.html")
	if err != nil {
		println(err)
	}

	tmpl.Execute(w, "")
}

func FollowPage(w http.ResponseWriter, r *http.Request) {

	tmpl, err := template.ParseFiles("./html/pages/addfriendpage.html", "./html/templates/header.html", "./html/templates/searchbar.html", "./html/templates/searchUser.html")
	if err != nil {
		println(err)
	}

	tmpl.Execute(w, "")
}
