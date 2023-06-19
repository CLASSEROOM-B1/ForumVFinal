package routes

import (
	"forum/API/controller"
	"forum/API/middleware"
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
	http.HandleFunc("/API/commentLike/comment/", controller.GetLikesOfComment)
	http.HandleFunc("/API/user/login", controller.LoginUser)
	http.HandleFunc("/API/user/logout", middleware.DeleteCookie)
	http.HandleFunc("/API/user/register", controller.CreateUser)

}

func RoutageConnect() {

	http.HandleFunc("/API/users", controller.GetUsers)
	http.HandleFunc("/API/user/", controller.GetOneUser)
	http.HandleFunc("/API/user/me", controller.GetUserConnected)

	http.HandleFunc("/API/post/create", controller.CreatePost)
	http.HandleFunc("/API/post/user/", controller.GetUserPosts)
	http.HandleFunc("/API/post/delete/", controller.DeletePost)

	http.HandleFunc("/API/comment/create", controller.CreateComment)
	http.HandleFunc("/API/comment/delete/", controller.DeleteComment)

	http.HandleFunc("/API/postLike/create", controller.CreatePostLike)
	http.HandleFunc("/API/postLike/user/", controller.GetUserPostLiked)
	http.HandleFunc("/API/postLike/delete/", controller.DeletePostLike)

	http.HandleFunc("/API/commentLike/create", controller.CreateCommentLike)
	http.HandleFunc("/API/commentLike/delete/", controller.DeleteCommentLike)

	http.HandleFunc("/API/follow/create", controller.CreateFollow)
	http.HandleFunc("/API/follows/", controller.GetFollows)
	http.HandleFunc("/API/followers/", controller.GetFollowers)
	http.HandleFunc("/API/follow/delete/", controller.DeleteFollow)

	http.HandleFunc("/API/blockedUser/create", controller.CreateBlockedUser)
	http.HandleFunc("/API/blockedUsers/", controller.GetBlockedUsers)
	http.HandleFunc("/API/blockedUser/delete/", controller.DeleteBlockedUser)

}
