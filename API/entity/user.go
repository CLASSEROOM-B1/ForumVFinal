package entity

type User struct {
	Id        int    `json:"id"`
	Pseudo    string `json:"pseudo"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	Biography string `json:"biography"`
}
