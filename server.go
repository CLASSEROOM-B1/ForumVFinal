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

	// jss := http.FileServer(http.Dir("./js"))
	// http.Handle("/js", http.StripPrefix("/js/", jss))

	http.HandleFunc("/", HomePage)

	fmt.Println("http://localhost:8080" + "aaa")
	http.ListenAndServe(":8080", nil)

}

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
func HomePage(w http.ResponseWriter, r *http.Request) {

	tmpl, err := template.ParseFiles("./html/pages/homepage.html", "./html/templates/category.html", "./js/category.js")
	if err != nil {
		println(err)
	}

	tmpl.Execute(w, "hhh")
}
