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

	fmt.Println("http://localhost:8080")
	http.ListenAndServe(":8080", nil)

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

func HomePage(w http.ResponseWriter, r *http.Request) {

	tmpl, _ := template.ParseFiles("./html/pages/index.html", "./html/templates/header.html", "./html/templates/searchbar.html", "./html/templates/footer.html", "./html/templates/vinyle.html")

	tmpl.Execute(w, "")
}
