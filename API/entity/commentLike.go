package entity

type CommentLike struct {
	Id        int `json:"id"`
	CommentId int `json:"commentId"`
	UserId    int `json:"userId"`
}
