
let count = 0;

let userId = 0;

// function getActualUser() {
//     fetch('/API/user/me')
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (user) {
//             userId = user.id;
//         });
// }

// getActualUser();

function initPost(post, div) {
    let newDiv = document.createElement("div");
    newDiv.className = "cardpost";
    newDiv.id = "post" + post.id;
    newDiv.innerHTML = div.innerHTML;
    let fruitImg = newDiv.querySelector("#fruitsImg");
    let backColor = newDiv.querySelector("#backcolor");
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
    let message = newDiv.querySelector("#message");
    message.innerHTML = post.message;
    let category = newDiv.querySelector("#category");
    category.innerHTML = post.category;
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
                newDiv.querySelector("#postLike").innerHTML = postLikes.length;
            } else {
                newDiv.querySelector("#postLike").innerHTML = "0";
            }
        });
    let popup3 = document.getElementById('commentcontainer');
    let postLikeImg = newDiv.querySelector("#postLikeImg");
    let commentImg = newDiv.querySelector("#commentImg");
    postLikeImg.addEventListener("onclick", function (event) {
        event.preventDefault();


    })
    // commentImg.addEventListener("click", function (event) {
    //     event.preventDefault();

    //     let commentType = document.getElementById("commentStyle");
    //     let div = document.createElement("div");
    //     div.innerHTML = commentType.innerHTML;
    //     initComment(post, div);
    //     let submitbutton = document.querySelector('#submitDiv');
    //     let popupComment = document.getElementById('overlay');
    //     submitbutton.addEventListener('click', function (event) {
    //         event.preventDefault();
    //         popupComment.style.display = 'none';
    //     });
    //     popupComment.style.display = 'block';
    // })
    return newDiv;
}

// function initComment(post, commentType) {
//     document.getElementById("commentTitle").innerHTML = post.title;
//     document.getElementById("allComments").innerHTML = "";
//     fetch('/API/comment/' + post.id)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (comments) {
//             comments.forEach(function (comment) {
//                 let newDiv = document.createElement("div");
//                 newDiv.className = "comment-style";
//                 newDiv.innerHTML = commentType.innerHTML;
//                 newDiv.querySelector("#contentCom").innerHTML = comment.message;
//                 fetch('/API/user/' + comment.creatorId)
//                     .then(function (response) {
//                         return response.json();
//                     })
//                     .then(function (user) {
//                         let pseudo = newDiv.querySelector("#usernameComment");
//                         pseudo.innerHTML = user.pseudo;
//                         let pseudoLink = newDiv.querySelector("#usernameLink");
//                         pseudoLink.href = "/user/" + user.id;
//                     });
//                 fetch('/API/commentLike/comment/' + comment.id)
//                     .then(function (response) {
//                         return response.json();
//                     })
//                     .then(function (commentLikes) {
//                         commentLikes.forEach(function (commentLike) {
//                             if (commentLike.userId == userId) {
//                                 //Coeur en rouge
//                             }
//                         });
//                         newDiv.querySelector("#commentLike").innerHTML = postLikes.length;
//                     });
//                 document.getElementById("scrollable").appendChild(initPost(post));
//             });
//         });

// }

function get10Posts() {
    fetch('/API/posts')
        .then(function (response) {
            return response.json();
        })
        .then(function (posts) {
            let card = document.getElementById("cardpost");
            let div = document.createElement("div");
            div.innerHTML = card.innerHTML;
            document.getElementById("scrollable").innerHTML = "";
            for (let index = count * 10; index < (count + 1) * 10; index++) {
                if (posts.length <= index) {
                    break;
                }
                document.getElementById("scrollable").appendChild(initPost(posts[index], div));
            }
            count++;
            document.getElementById("scrollable").innerHTML += '<form method="post"><button class="voirplus" id="morePosts"> SEE MORE </button></form>';
        });
}

// function getPostsByCategory() {
//     let allDivCategory = document.getElementsByClassName("fruit");
//     for (let index = 0; index < allDivCategory.length; index++) {
//         allDivCategory[index].addEventListener("onclick", function (event) {
//             fetch('/API/post/category/' + allDivCategory[index].id)
//                 .then(function (response) {
//                     return response.json();
//                 })
//                 .then(function (posts) {
//                     let card = document.getElementById("cardpost");
//                     let div = document.createElement("div");
//                     div.innerHTML = card.innerHTML;
//                     document.getElementById("scrollable").innerHTML = "";
//                     posts.forEach(function (post) {
//                         document.getElementById("scrollable").appendChild(initPost(post, div));
//                     });
//                 });
//         });

//     }
// }

// function getPostByTitle() {
//     document.getElementById("searchImg").addEventListener("submit", function (event) {
//         let search = document.getElementById("searchResult").value;
//         fetch('/API/post/title/' + search)
//             .then(function (response) {
//                 return response.json();
//             })
//             .then(function (posts) {
//                 let card = document.getElementById("cardpost");
//                 let div = document.createElement("div");
//                 div.innerHTML = card.innerHTML;
//                 document.getElementById("scrollable").innerHTML = "";
//                 posts.forEach(function (post) {
//                     document.getElementById("scrollable").appendChild(post, div);
//                 });
//             });
//     });
// };

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

document.getElementById("morePosts").addEventListener("onclick", function (event) {
    get10Posts();
});

// getPostByTitle();

// getPostsByCategory();

get10Posts();

// defineButtons();