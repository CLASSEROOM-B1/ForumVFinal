
var count = 0;

var userId = 0;

function getActualUser() {
    fetch('/API/user/me')
        .then(function (response) {
            return response.json();
        })
        .then(function (user) {
            userId = user.id;
        });
}

getActualUser();

function initPost(post, div) {
    var newDiv = document.createElement("div");
    newDiv.className = "cardpost";
    newDiv.innerHTML = div.innerHTML;
    var fruitImg = newDiv.querySelector("#fruitsImg");
    var backColor = newDiv.querySelector("#backcolor");
    switch (post.category) {
        case "politics":
            fruitImg.src = "/static/images/melon.png";
            backColor.className = "politics";
            break;
        case "sports":
            fruitImg.src = "/static/images/peach.png";
            backColor.className = "sports";
            break;
        case "high-tech":
            fruitImg.src = "/static/images/orange.png";
            backColor.className = "highTech";
            break;
        case "arts":
            fruitImg.src = "/static/images/pear.png";
            backColor.className = "arts";
            break;
        case "tips/tricks":
            fruitImg.src = "/static/images/strawberry.png";
            backColor.className = "tipsTricks";
            break;
        case "movies/shows":
            fruitImg.src = "/static/images/raspberry.png";
            backColor.className = "moviesShows";
            break;
        case "society":
            fruitImg.src = "/static/images/grapes.png";
            backColor.className = "society";
            break;
        case "musics":
            fruitImg.src = "/static/images/cherry.png";
            backColor.className = "musics";
            break;
        case "gaming":
            fruitImg.src = "/static/images/watermelon.png";
            backColor.className = "gaming";
            break;
        case "history/learning":
            fruitImg.src = "/static/images/lemon.png";
            backColor.className = "historyLearning";
            break;
        case "food/drinks":
            fruitImg.src = "/static/images/apple.png";
            backColor.className = "foodDrinks";
            break;
        case "travels":
            fruitImg.src = "/static/images/mango.png";
            backColor.className = "travels";
            break;
        default:
            break;
    }
    var title = newDiv.querySelector("#titre");
    title.innerHTML = post.title;
    fetch('/API/user/' + post.creatorId)
        .then(function (response) {
            return response.json();
        })
        .then(function (user) {
            var pseudo = newDiv.querySelector("#pseudo");
            pseudo.innerHTML = user.pseudo;
            var pseudoLink = newDiv.querySelector("#pseudoLink");
            pseudoLink.href = "/user/" + user.id;
        });
    var message = newDiv.querySelector("#message");
    message.innerHTML = post.message;
    var category = newDiv.querySelector("#category");
    category.innerHTML = post.category;
    fetch('/API/postLike/post/' + post.id)
        .then(function (response) {
            return response.json();
        })
        .then(function (postLikes) {
            postLikes.forEach(function (postLike) {
                if (postLike.userId == userId) {
                    //Coeur en rouge
                }
            });
            newDiv.querySelector("#postLike").innerHTML = postLikes.length;
        });
    let popup3 = document.getElementById('commentcontainer');
    var postLikeImg = document.getElementById("postLikeImg");
    var commentImg = document.getElementById("commentImg");
    postLikeImg.addEventListener("click", function (event) {
        event.preventDefault();


    })
    commentImg.addEventListener("click", function (event) {
        event.preventDefault();

        var commentType = document.getElementById("commentStyle");
        var div = document.createElement("div");
        div.innerHTML = commentType.innerHTML;
        initComment(post, div);
        popup3.style.display = 'block';
    })
    return newDiv;
}

function initComment(post, commentType) {
    document.getElementById("commentTitle").innerHTML = post.title;
    document.getElementById("allComments").innerHTML = "";
    fetch('/API/comment/' + post.id)
        .then(function (response) {
            return response.json();
        })
        .then(function (comments) {
            comments.forEach(function (comment) {
                var newDiv = document.createElement("div");
                newDiv.className = "comment-style";
                newDiv.innerHTML = commentType.innerHTML;
                newDiv.querySelector("#contentCom").innerHTML = comment.message;
                fetch('/API/user/' + comment.creatorId)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (user) {
                        var pseudo = newDiv.querySelector("#usernameComment");
                        pseudo.innerHTML = user.pseudo;
                        var pseudoLink = newDiv.querySelector("#usernameLink");
                        pseudoLink.href = "/user/" + user.id;
                    });
                fetch('/API/commentLike/comment/' + comment.id)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (commentLikes) {
                        commentLikes.forEach(function (commentLike) {
                            if (commentLike.userId == userId) {
                                //Coeur en rouge
                            }
                        });
                        newDiv.querySelector("#commentLike").innerHTML = postLikes.length;
                    });
                document.getElementById("scrollable").appendChild(initPost(post));
            });
        });

}

function get10Posts() {
    fetch('/API/posts')
        .then(function (response) {
            return response.json();
        })
        .then(function (posts) {
            var card = document.getElementById("cardpost");
            var div = document.createElement("div");
            div.innerHTML = card.innerHTML;
            document.getElementById("scrollable").innerHTML = "";
            for (let index = count * 10; index < (count + 1) * 10; index++) {
                document.getElementById("scrollable").appendChild(initPost(posts[index], div));
            }
            count++;
            var newButton = document.createElement("button");
            newButton.className = "voirplus";
            newButton.innerHTML = "Voir plus";
            document.getElementById("scrollable").appendChild(newButton);
        });
}

function getPostsByCategory() {
    var allDivCategory = document.getElementsByClassName("fruit");
    allDivCategory.forEach(element => {
        element.addEventListener("onclick", function (event) {
            fetch('/API/post/category/' + element.id)
                .then(function (response) {
                    return response.json();
                })
                .then(function (posts) {
                    var card = document.getElementById("cardpost");
                    var div = document.createElement("div");
                    div.innerHTML = card.innerHTML;
                    document.getElementById("scrollable").innerHTML = "";
                    posts.forEach(function (post) {
                        document.getElementById("scrollable").appendChild(initPost(post, div));
                    });
                });
        });
    });
}

function getPostByTitle() {
    document.getElementById("searchImg").addEventListener("submit", function (event) {
        var search = document.getElementById("searchResult").value;
        fetch('/API/post/title/' + search)
            .then(function (response) {
                return response.json();
            })
            .then(function (posts) {
                var card = document.getElementById("cardpost");
                var div = document.createElement("div");
                div.innerHTML = card.innerHTML;
                document.getElementById("scrollable").innerHTML = "";
                posts.forEach(function (post) {
                    document.getElementById("scrollable").appendChild(post, div);
                });
            });
    });
};

function defineButtons() {
    var createPost = document.querySelector("createPost");
    var addPeople = document.getElementById("addPeople");
    var profil = document.getElementById("profil");
    var contactUs = document.getElementById("contactUs");
    var postLikeImg = document.getElementById("postLikeImg");
    var commentImg = document.getElementById("commentImg");
    var popup = document.getElementById("popup");
    var popup2 = document.getElementById("popupcontact");
    fetch('/API/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(function (response) {
            createPost.addEventListener("click", function (event) {
                event.preventDefault();

                popup.style.display = "block";
            });
            contactUs.addEventListener("click", function (event) {
                event.preventDefault();

                popup2.style.display = "block";
            });
            addPeople.href = "/addFriend";
            profil.href = "/profil";
        })
        .catch(function (error) {
            commentImg.href = "/login";
            postLikeImg.href = "/login";
            createPost.href = "/login";
            contactUs.href = "/login";
            addPeople.href = "/login";
            profil.href = "/login";
        });
}

document.getElementById("submitPost").addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById('Title').value;
    const category = document.getElementById('categorySearch').value;
    const message = document.getElementById('textArea').value;
    const data = { creatorId: userId, title: title, category: category, message: message };
    fetch('/API/post/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        });
})

document.getElementById("morePosts").addEventListener("onclick", function (event) {
    get10Posts();
});

getPostByTitle();

getPostsByCategory();

get10Posts();

defineButtons();