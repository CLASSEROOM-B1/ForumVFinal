package entity

type PostLike struct {
	Id     int `json:"id"`
	PostId int `json:"postId"`
	UserId int `json:"userId"`
}
