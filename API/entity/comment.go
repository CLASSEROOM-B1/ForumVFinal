package entity

type Comment struct {
	Id        int    `json:"id"`
	CreatorId int    `json:"creatorId"`
	PostId    int    `json:"postId"`
	Message   string `json:"message"`
}
