package middleware

import (
	"net/http"
)

func ReadCookie(w http.ResponseWriter, r *http.Request) bool {
	_, err := r.Cookie("cookieForum")
	if err != nil {
		return false
	} else {
		return true
	}
}

func DeleteCookie(w http.ResponseWriter, r *http.Request) {
	c := http.Cookie{
		Name:   "cookieForum",
		MaxAge: -1}
	http.SetCookie(w, &c)
}

func CreateCookie(w http.ResponseWriter, r *http.Request, email string) {
	c := http.Cookie{
		Name:   "cookieForum",
		Value:  email,
		MaxAge: 3600}
	http.SetCookie(w, &c)
}
