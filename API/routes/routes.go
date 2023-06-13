package routes

import (
	"forum/API/controller"
	"net/http"
)

func RoutageNoConnect() {

	http.HandleFunc("/API/user/create", controller.CreateUser)
	http.HandleFunc("/API/posts", controller.GetPosts)
	http.HandleFunc("/API/post/id/", controller.GetOnePost)
	http.HandleFunc("/API/post/title/", controller.GetPostsByTitle)
	http.HandleFunc("/API/post/category/", controller.GetPostsByCategory)
	http.HandleFunc("/API/comment/", controller.GetPostComments)
	http.HandleFunc("/API/postLike/post/", controller.GetLikesOfPost)
	http.HandleFunc("/API/user/login", controller.LoginUser)
	http.HandleFunc("/API/user/register", controller.CreateUser)

}

func RoutageConnect() {

	http.HandleFunc("/API/users", controller.GetUsers)
	http.HandleFunc("/API/user/{id}", controller.GetOneUser)

	http.HandleFunc("/API/post/create", controller.CreatePost)
	http.HandleFunc("/API/post/user/{id}", controller.GetUserPosts)
	http.HandleFunc("/API/post/delete/{id}", controller.DeletePost)

	http.HandleFunc("/API/comment/create", controller.CreateComment)
	http.HandleFunc("/API/comment/delete/{id}", controller.DeleteComment)

	http.HandleFunc("/API/postLike/create", controller.CreatePostLike)
	http.HandleFunc("/API/postLike/user/{id}", controller.GetUserPostLiked)
	http.HandleFunc("/API/postLike/delete/{id}", controller.DeletePostLike)

	http.HandleFunc("/API/commentLike/create", controller.CreateCommentLike)
	http.HandleFunc("/API/commentLike/delete/{id}", controller.DeleteCommentLike)

	http.HandleFunc("/API/follow/create", controller.CreateFollow)
	http.HandleFunc("/API/follows/{id}", controller.GetFollows)
	http.HandleFunc("/API/followers/{id}", controller.GetFollowers)
	http.HandleFunc("/API/follow/delete/{id}", controller.DeleteFollow)

	http.HandleFunc("/API/blockedUser/create", controller.CreateBlockedUser)
	http.HandleFunc("/API/blockedUsers/{id}", controller.GetBlockedUsers)
	http.HandleFunc("/API/blockedUser/delete/{id}", controller.DeleteBlockedUser)

}
