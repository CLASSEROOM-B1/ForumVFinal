
let userId = 0;

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
    let newDiv = document.createElement("div");
    newDiv.className = "cardpost";
    newDiv.id = "post" + post.id;
    newDiv.innerHTML = div.innerHTML;
    let fruitImg = newDiv.querySelector("#fruitsImg");
    let backColor = newDiv.querySelector("#backcolor");
    console.log(backColor)
    switch (post.category) {
        case "Politics":
            fruitImg.src = "/static/images/melon 1.png";
            backColor.className = "politics";
            break;
        case "Sports":
            fruitImg.src = "/static/images/peach 2.png";
            backColor.className = "sports";
            break;
        case "HighTech":
            fruitImg.src = "/static/images/orange 1.png";
            backColor.className = "highTech";
            break;
        case "Arts":
            fruitImg.src = "/static/images/pear 1.png";
            backColor.className = "arts";
            break;
        case "TipsTricks":
            fruitImg.src = "/static/images/strawberry (1) 2.png";
            backColor.className = "tipsTricks";
            break;
        case "MoviesShows":
            fruitImg.src = "/static/images/6238-raspberry 1.png";
            backColor.className = "moviesShows";
            break;
        case "Society":
            fruitImg.src = "/static/images/grapes 3.png";
            backColor.className = "society";
            break;
        case "Musics":
            fruitImg.src = "/static/images/cherries.png";
            backColor.className = "musics";
            break;
        case "Gaming":
            fruitImg.src = "/static/images/watermelon 1.png";
            backColor.className = "gaming";
            break;
        case "HistoryLearning":
            fruitImg.src = "/static/images/lemon 1.png";
            backColor.className = "historyLearning";
            break;
        case "FoodDrinks":
            fruitImg.src = "/static/images/apple 2.png";
            backColor.className = "foodDrinks";
            break;
        case "Travels":
            fruitImg.src = "/static/images/mango 1.png";
            backColor.className = "travels";
            break;
        default:
            break;
    }
    let title = newDiv.querySelector("#titre");
    title.innerHTML = post.title;
    let pseudoLink = newDiv.querySelector("#pseudo");
    fetch('/API/user/' + post.creatorId)
        .then(function (response) {
            return response.json();
        })
        .then(function (user) {
            pseudoLink.innerHTML = '<a id="pseudoLink" href="/userprofil"> @' + user.pseudo + '</a>';
        });
    let message = newDiv.querySelector("#postmessage");
    message.innerHTML = post.message;
    let category = newDiv.querySelector("#category");
    category.innerHTML = post.category;
    let postLike = newDiv.querySelector("#postLike")
    fetch('/API/postLike/post/' + post.id)
        .then(function (response) {
            return response.json();
        })
        .then(function (postLikes) {
            if (postLikes != null) {
                for (let index = 0; index < postLikes.length; index++) {
                    if (postLikes[index].userId == userId) {
                        //Coeur en rouge
                    }

                }
                postLike.innerHTML = postLikes.length;
            } else {
                postLike.innerHTML = "0";
            }
        });
    let nbrcomment = newDiv.querySelector("#nbrcomment")
    fetch('/API/comment/' + post.id)
        .then(function (response) {
            return response.json();
        })
        .then(function (comment) {
            if (comment != null) {
                for (let index = 0; index < comment.length; index++) {
                    if (comment[index].userId == userId) {
                        //Coeur en rouge
                    }

                }
                nbrcomment.innerHTML = nbrcomment.length;
            } else {
                nbrcomment.innerHTML = "0";
            }
        });
    // let popup3 = document.getElementById('commentcontainer');
    // let postLikeImg = newDiv.querySelector("#postLikeImg");
    // let commentImg = newDiv.querySelector("#commentImg");
    // postLikeImg.addEventListener("onclick", function (event) {
    //     event.preventDefault();


    // })
    let commentcontainer = document.getElementById("commentsmany");
    newDiv.querySelector("#commentBtn").addEventListener("click", function (event) {
        event.preventDefault();

        document.getElementById("commentTitle").innerHTML = post.title;

        fetch('/API/comment/' + post.id)
            .then(function (response) {
                return response.json();
            })
            .then(function (comment) {
                if (commentcontainer.innerHTML != "") {
                    commentcontainer.innerHTML = "";
                }
                if (comment != null) {
                    let div = document.createElement("div");
                    div.id = "cardpost"
                    div.className = "comment-style"
                    div.innerHTML = '<div class="usernameComments" id="usernameComments">@user1</div>' +
                        '<div class="contentCom" id="contentCom>' +
                        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s ' +
                        'standard dummy text ever since the 1500s, when an unknown printer took a galley of' +
                        '</div>' +
                        '<div class="likeCom" id="likeCom">' +
                        '<img id="imgLikeCom" src="/static/images/coeur.png">' +
                        '11' +
                        '</div>' +
                        '<br>';
                    comment.forEach(function (comment) {
                        document.getElementById("commentsmany").appendChild(initComment(comment, div));
                    });
                } else {
                    nbrcomment.innerHTML = "0";
                }
            });
    })
    return newDiv;
}

function initComment(comment, div) {
    div.querySelector("#contentCom").innerHTML = comment.message;
    let pseudo = newDiv.querySelector("#usernameComment");
    fetch('/API/user/' + comment.creatorId)
        .then(function (response) {
            return response.json();
        })
        .then(function (user) {
            pseudo.innerHTML = user.pseudo;
        });
    fetch('/API/commentLike/comment/' + comment.id)
        .then(function (response) {
            return response.json();
        })
        .then(function (commentLikes) {
            if (commentLikes != null) {
                commentLikes.forEach(function (commentLike) {
                    if (commentLike.userId == userId) {
                        //Coeur en rouge
                    }
                });
                newDiv.querySelector("#likeCom").innerHTML = '<img id="imgLikeCom" src="/static/images/coeur.png">' + postLikes.length;
            } else {
                newDiv.querySelector("#likeCom").innerHTML = '<img id="imgLikeCom" src="/static/images/coeur.png">' + "0";
            }
        });
    return div
}

fetch('/API/posts')
    .then(function (response) {
        return response.json();
    })
    .then(function (posts) {
        if (posts != null) {
            let div = document.createElement("div");
            div.id = "cardpost"
            div.className = "cardpost"
            div.innerHTML = '<div class="society" id="backcolor">' +
                '<div class="haut">' +
                '<div class="gauche">' +
                '<div class="imgcard">' +
                '<img id="fruitsImg" src="/static/images/grappes.png">' +
                '</div>' +
                '<div class="titre" id="titre"> &ensp; Title</div>' +
                '</div>' +
                '<div class="pseudo" id="pseudo"><a id="pseudoLink" href="#"> @user</a></div>' +
                '</div>' +
                '<div class="milieu" id="postmessage">' +
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ' +
                "industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of" +
                '</div>' +
                '<div class="bas">' +
                '<div class="categorie" id="category">society</div>' +
                '<div class="rs">' +
                '<div id="commentpopup" class="commentaires">' +
                '<img src="/static/images/commentaire.png" id="commentBtn" onclick="popupFunc()">' +
                '<div class="nbrcommentaires" id="nbrcomment"> 13</div>' +
                '</div>' +
                '<div class="likes">' +
                '<img src="/static/images/coeur.png">' +
                '<div class="nbrlikes" id="postLike"> 11</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
            document.getElementById("scrollable").innerHTML = "";
            posts.forEach(function (post) {
                document.getElementById("scrollable").appendChild(initPost(post, div));
            });
            document.getElementById("scrollable").innerHTML += '<form method="post"><button class="voirplus" id="morePosts"> SEE MORE </button></form>';
        } else {
            document.getElementById("scrollable").innerHTML = "";
        }
    });

let allDivCategory = document.getElementsByClassName("fruit");
for (let index = 0; index < allDivCategory.length; index++) {
    allDivCategory[index].children[0].addEventListener("click", function (event) {
        fetch('/API/post/category/' + allDivCategory[index].id)
            .then(function (response) {
                return response.json();
            })
            .then(function (posts) {
                if (posts != null) {
                    let div = document.createElement("div");
                    div.id = "cardpost"
                    div.className = "cardpost"
                    div.innerHTML = '<div class="society" id="backcolor">' +
                        '<div class="haut">' +
                        '<div class="gauche">' +
                        '<div class="imgcard">' +
                        '<img id="fruitsImg" src="/static/images/grappes.png">' +
                        '</div>' +
                        '<div class="titre" id="titre"> &ensp; Title</div>' +
                        '</div>' +
                        '<div class="pseudo" id="pseudo"><a id="pseudoLink" href="#"> @user</a></div>' +
                        '</div>' +
                        '<div class="milieu" id="postmessage">' +
                        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ' +
                        "industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of" +
                        '</div>' +
                        '<div class="bas">' +
                        '<div class="categorie" id="category">society</div>' +
                        '<div class="rs">' +
                        '<div id="commentpopup" class="commentaires">' +
                        '<img src="/static/images/commentaire.png" id="commentBtn" onclick="popupFunc()">' +
                        '<div class="nbrcommentaires" id="nbrcomment"> 13</div>' +
                        '</div>' +
                        '<div class="likes">' +
                        '<img src="/static/images/coeur.png">' +
                        '<div class="nbrlikes" id="postLike"> 11</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                    document.getElementById("scrollable").innerHTML = "";
                    posts.forEach(function (post) {
                        document.getElementById("scrollable").appendChild(initPost(post, div));
                    });
                } else {
                    document.getElementById("scrollable").innerHTML = "";
                }
            });
    });

}

document.getElementById("searchImg").addEventListener("click", function (event) {
    let search = document.getElementById("searchResult").value;
    console.log("testSearch")
    fetch('/API/post/title/' + search)
        .then(function (response) {
            return response.json();
        })
        .then(function (posts) {
            if (posts != null) {
                let div = document.createElement("div");
                div.id = "cardpost"
                div.className = "cardpost"
                div.innerHTML = '<div class="society" id="backcolor">' +
                    '<div class="haut">' +
                    '<div class="gauche">' +
                    '<div class="imgcard">' +
                    '<img id="fruitsImg" src="/static/images/grappes.png">' +
                    '</div>' +
                    '<div class="titre" id="titre"> &ensp; Title</div>' +
                    '</div>' +
                    '<div class="pseudo" id="pseudo"><a id="pseudoLink" href="#"> @user</a></div>' +
                    '</div>' +
                    '<div class="milieu" id="postmessage">' +
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ' +
                    "industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of" +
                    '</div>' +
                    '<div class="bas">' +
                    '<div class="categorie" id="category">society</div>' +
                    '<div class="rs">' +
                    '<div id="commentpopup" class="commentaires">' +
                    '<img src="/static/images/commentaire.png" id="commentBtn" onclick="popupFunc()">' +
                    '<div class="nbrcommentaires" id="nbrcomment"> 13</div>' +
                    '</div>' +
                    '<div class="likes">' +
                    '<img src="/static/images/coeur.png">' +
                    '<div class="nbrlikes" id="postLike"> 11</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                document.getElementById("scrollable").innerHTML = "";
                posts.forEach(function (post) {
                    document.getElementById("scrollable").appendChild(initPost(post, div));
                });
            } else {
                document.getElementById("scrollable").innerHTML = "";
            }
        });
});

// function defineButtons() {
//     let createPost = document.querySelector("createPost");
//     let addPeople = document.getElementById("addPeople");
//     let profil = document.getElementById("profil");
//     let contactUs = document.getElementById("contactUs");
//     let postLikeImg = document.getElementById("postLikeImg");
//     let commentImg = document.getElementById("commentImg");
//     let popup = document.getElementById("popup");
//     let popup2 = document.getElementById("popupcontact");
//     fetch('/API/users', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
//         .then(function (response) {
//             createPost.addEventListener("click", function (event) {
//                 event.preventDefault();

//                 popup.style.display = "block";
//             });
//             contactUs.addEventListener("click", function (event) {
//                 event.preventDefault();

//                 popup2.style.display = "block";
//             });
//             addPeople.href = "/addFriend";
//             profil.href = "/profil";
//         })
//         .catch(function (error) {
//             commentImg.href = "/login";
//             postLikeImg.href = "/login";
//             createPost.href = "/login";
//             contactUs.href = "/login";
//             addPeople.href = "/login";
//             profil.href = "/login";
//         });
// }

// document.getElementById("submitPost").addEventListener("submit", function (event) {
//     event.preventDefault();
//     const title = document.getElementById('Title').value;
//     const category = document.getElementById('categorySearch').value;
//     const message = document.getElementById('textArea').value;
//     const data = { creatorId: userId, title: title, category: category, message: message };
//     fetch('/API/post/create', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data),
//     })
//         .then(function (response) {
//             return response.json();
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// })

// defineButtons();

document.getElementById("submitPost").addEventListener("click", function (event) {
    const title = document.getElementById('Title').value;
    const category = document.getElementById('category-select').value;
    const message = document.getElementById('textArea').value;
    const data = { title: title, creatorId: userId, category: category, message: message };
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
        .then(function (post) {
            let div = document.createElement("div");
            div.id = "cardpost"
            div.className = "cardpost"
            div.innerHTML = '<div class="society" id="backcolor">' +
                '<div class="haut">' +
                '<div class="gauche">' +
                '<div class="imgcard">' +
                '<img id="fruitsImg" src="/static/images/grappes.png">' +
                '</div>' +
                '<div class="titre" id="titre"> &ensp; Title</div>' +
                '</div>' +
                '<div class="pseudo" id="pseudo"><a id="pseudoLink" href="#"> @user</a></div>' +
                '</div>' +
                '<div class="milieu" id="postmessage">' +
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ' +
                "industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of" +
                '</div>' +
                '<div class="bas">' +
                '<div class="categorie" id="category">society</div>' +
                '<div class="rs">' +
                '<div id="commentpopup" class="commentaires">' +
                '<img src="/static/images/commentaire.png" id="commentBtn" onclick="popupFunc()">' +
                '<div class="nbrcommentaires" id="nbrcomment"> 13</div>' +
                '</div>' +
                '<div class="likes">' +
                '<img src="/static/images/coeur.png">' +
                '<div class="nbrlikes" id="postLike"> 11</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';;
            if (document.getElementById("scrollable").innerHTML != "") {
                document.getElementById("scrollable").lastChild.remove();
            }
            document.getElementById("scrollable").appendChild(initPost(post, div));
            document.getElementById("scrollable").innerHTML += '<form method="post"><button class="voirplus" id="morePosts"> SEE MORE </button></form>';
        })
        .catch(function (error) {
            console.log(error);
        });
})