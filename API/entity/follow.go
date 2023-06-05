package entity

type Follow struct {
	Id         int `json:"id"`
	FollowerId int `json:"followerId"`
	UserId     int `json:"userId"`
}
