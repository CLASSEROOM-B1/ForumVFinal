
//ANIMATION POSTS
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const likedpostcontents = document.getElementById('likedposts')
const ourpostcontents = document.getElementById('ourposts')



button1.classList.add('active');


button1.addEventListener('click', () => {
    button1.classList.add('active');
    button2.classList.remove('active');
    likedpostcontents.style.display = 'none';
    ourpostcontents.style.display = 'flex'
});

button2.addEventListener('click', () => {
    button1.classList.remove('active');
    button2.classList.add('active');

});

button2.addEventListener('click', () => {
    likedpostcontents.style.display = 'flex';
    ourpostcontents.style.display = 'none';
})

button1.addEventListener('click', () => {
    ourpostcontents.style.display = 'flex';
})

//POPUP CHANGE PASSWORD
let link = document.querySelector('#passwordlink');
let link2 = document.querySelector('#submit');
let popup = document.querySelector('.overlay');


link.addEventListener('click', function (event) {
    event.preventDefault();
    popup.style.display = 'block';
});


link2.addEventListener('click', function (event) {
    event.preventDefault();
    popup.style.display = 'none';
});

//POPUP VIEW FRIENDS
let viewFriend = document.querySelector('#viewfriends');
let popupFriend = document.querySelector('.overlayFriend');
let closepopup = document.querySelector('#closepopup');

viewFriend.addEventListener('click', function (event) {
    event.preventDefault();
    popupFriend.style.display = 'block';
});


closepopup.addEventListener('click', function (event) {
    event.preventDefault();
    popupFriend.style.display = 'none';
});

//ANIMATION FRIENDS
const friends = document.getElementById('button-friends');
const block = document.getElementById('button-block');
const blockeduser = document.getElementById('blocked')
const followers = document.getElementById('followers')



friends.classList.add('active');


friends.addEventListener('click', () => {
    friends.classList.add('active');
    block.classList.remove('active');
    blockeduser.style.display = 'none';
    followers.style.display = 'flex'
});

block.addEventListener('click', () => {
    friends.classList.remove('active');
    block.classList.add('active');

});

block.addEventListener('click', () => {
    blockeduser.style.display = 'flex';
    followers.style.display = 'none';
})

friends.addEventListener('click', () => {
    followers.style.display = 'flex';
})


let biographyElement = document.querySelector('.biography');

biographyElement.addEventListener('click', function () {
    let text = biographyElement.textContent.trim();
    let input = document.createElement('input');
    input.type = 'text';
    input.value = text;
    input.maxLength = 50;
    input.classList.add('biography-input');

    biographyElement.textContent = '';
    biographyElement.appendChild(input);

    input.focus();

    input.addEventListener('blur', function () {
        let newText = input.value.trim();
        biographyElement.textContent = newText || 'Biography ...';
    });
});

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
    // fetch('/API/user/' + post.creatorId)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (user) {
    //         var pseudo = newDiv.querySelector("#pseudo");
    //         pseudo.innerHTML = user.pseudo;
    //         var pseudoLink = newDiv.querySelector("#pseudoLink");
    //         pseudoLink.href = "/user/" + user.id;
    //     });
    var message = newDiv.querySelector("#message");
    message.innerHTML = post.message;
    var category = newDiv.querySelector("#category");
    category.innerHTML = post.category;
    // fetch('/API/postLike/post/' + post.id)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (postLikes) {
    //         postLikes.forEach(function (postLike) {
    //             if (postLike.userId == userId) {
    //                 //Coeur en rouge
    //             }
    //         });
    //         newDiv.querySelector("#postLike").innerHTML = postLikes.length;
    //     });
    // let popup3 = document.getElementById('commentcontainer');
    // var postLikeImg = document.getElementById("postLikeImg");
    // var commentImg = document.getElementById("commentImg");
    // postLikeImg.addEventListener("click", function (event) {
    //     event.preventDefault();


    // })
    // commentImg.addEventListener("click", function (event) {
    //     event.preventDefault();

    //     var commentType = document.getElementById("commentStyle");
    //     var div = document.createElement("div");
    //     div.innerHTML = commentType.innerHTML;
    //     initComment(post, div);
    //     popup3.style.display = 'block';
    // })
    return newDiv;
}

fetch('/API/user/me', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
})
    .then(function (response) {
        if (response.status == 200) {
            return response.json();
        } else if (response.status == 400) {
            //Bad request
        }
    })
    .then(function (user) {
        document.getElementById("nbFollow").innerHTML;
        document.getElementById("biography").innerHTML = user.biography;
        document.getElementById("pseudo").placeholder = user.pseudo;
        document.getElementById("email").placeholder = user.email;
        let likedPosts = document.getElementById("likedposts");
        let createdPosts = document.getElementById("ourposts");
        fetch('/API/post/user/' + user.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(function (response) {
                if (response.status == 200) {
                    return response.json();
                } else if (response.status == 400) {
                    //Bad request
                }
            })
            .then(function (posts) {
                if (posts.length > 0) {
                    var card = document.getElementById("cardpost");
                    var div = document.createElement("div");
                    div.innerHTML = card.innerHTML;
                    document.getElementById("ourposts").innerHTML = "";
                    for (let index = 0; index < posts.length; index++) {
                        document.getElementById("ourposts").appendChild(initPost(posts[index], div));
                    }
                } else {
                    createdPosts.innerHTML = '<img src="/static/images/any.png" alt="Croix" class="croix"><p class="NLP">NO POSTS</p>';
                }
            });
        fetch('/API/postLike/user/' + user.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(function (response) {
                if (response.status == 200) {
                    return response.json();
                } else if (response.status == 400) {
                    //Bad request
                }
            })
            .then(function (postLikes) {
                if (postLikes != null) {
                    for (let index = 0; index < postLikes.length; index++) {
                        fetch('/API/post/' + postLikes.postId, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        })
                            .then(function (response) {
                                if (response.status == 200) {
                                    return response.json();
                                } else if (response.status == 400) {
                                    //Bad request
                                }
                            })
                            .then(function (post) {
                                var card = document.getElementById("cardpost");
                                var div = document.createElement("div");
                                div.innerHTML = card.innerHTML;
                                document.getElementById("likedposts").innerHTML = "";
                                document.getElementById("likedposts").appendChild(initPost(post, div));
                            });
                    }
                } else {
                    likedPosts.innerHTML = '<img src="/static/images/any.png" alt="Croix" class="croix"><p class="NLP">NO LIKED POSTS</p>';
                }
            });
    });

document.getElementById("viewfriends").addEventListener("onclick", function (event) {
    let blockedUsers = document.getElementById("blocked");
    let followers = document.getElementById("followers");
    fetch('/API/postLike/user/' + user.id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(function (response) {
            if (response.status == 200) {
                return response.json();
            } else if (response.status == 400) {
                //Bad request
            }
        })
        .then(function (postLikes) {
            if (postLikes != null) {
                for (let index = 0; index < postLikes.length; index++) {
                    fetch('/API/post/' + postLikes.postId, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                        .then(function (response) {
                            if (response.status == 200) {
                                return response.json();
                            } else if (response.status == 400) {
                                //Bad request
                            }
                        })
                        .then(function (post) {
                            var card = document.getElementById("cardpost");
                            var div = document.createElement("div");
                            div.innerHTML = card.innerHTML;
                            document.getElementById("likedposts").innerHTML = "";
                            document.getElementById("likedposts").appendChild(initPost(post, div));
                        });
                }
            } else {
                likedPosts.innerHTML = '<img src="/static/images/any.png" alt="Croix" class="croix"><p class="NLP">NO LIKED POSTS</p>';
            }
        });
});