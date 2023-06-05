package entity

type BlockedUser struct {
	Id               int `json:"id"`
	UserWhoBlockedId int `json:"userWhoBlockedId"`
	UserBlockedId    int `json:"userBlockedId"`
}
