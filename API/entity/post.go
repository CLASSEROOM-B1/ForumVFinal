package entity

type Post struct {
	Id        int    `json:"id"`
	CreatorId int    `json:"creatorId"`
	Title     string `json:"title"`
	Category  string `json:"category"`
	Message   string `json:"message"`
}
