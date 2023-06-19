
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
    console.log(popup)
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
const follow = document.getElementById('button-follows');
const block = document.getElementById('button-block');
const blockeduser = document.getElementById('blocked')
const follows = document.getElementById('follows')
const followers = document.getElementById('followers')


friends.classList.add('active');

follows.style.display = 'none';
blockeduser.style.display = 'none';


friends.addEventListener('click', () => {
    friends.classList.add('active');
    block.classList.remove('active');
    follow.classList.remove('active');
    blockeduser.style.display = 'none';
    follows.style.display = 'none';
    followers.style.display = 'flex'
});

follow.addEventListener('click', () => {
    follow.classList.add('active');
    block.classList.remove('active');
    friends.classList.remove('active');
    followers.style.display = 'none';
    blockeduser.style.display = 'none';
    follows.style.display = 'flex'
});

block.addEventListener('click', () => {
    friends.classList.remove('active');
    follow.classList.remove('active');
    block.classList.add('active');
    blockeduser.style.display = 'flex';
    followers.style.display = 'none';
    follows.style.display = 'none';
});


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
    // let popup3 = document.getElementById('commentcontainer');
    // let postLikeImg = newDiv.querySelector("#postLikeImg");
    // let commentImg = newDiv.querySelector("#commentImg");
    // postLikeImg.addEventListener("onclick", function (event) {
    //     event.preventDefault();


    // })
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
                if (posts != null) {
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
    let blocked = document.getElementById("blocked");
    let follower = document.getElementById("followers");
    let follow = document.getElementById("follows");
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
            fetch('/API/blockedUsers/' + user.id, {
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
                .then(function (blockedUsers) {
                    if (blockedUsers != null) {
                        blocked.innerHTML = "";
                        for (let index = 0; index < blockedUsers.length; index++) {
                            let newDiv = document.createElement("div");
                            newDiv.className = "comment-style";
                            newDiv.innerHTML = '<div class="user">' +
                                '<div class="username">@' + blockedUsers[index].pseudo + '&ensp; | &ensp;</div>' +
                                '<div class="unblock"><img src="/static/images/unblock.png" class="unblock-image" id="unblock"></div>' +
                                '</div>' +
                                '<br>';
                            newDiv.querySelector("#unblock").addEventListener("click", function (event) {
                                fetch('/API/blockedUsers/delete/' + blockedUsers[index].id, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                })
                                    .then(function (response) {
                                        blocked.removeChild(newDiv);
                                        return response.json();
                                    })
                            })
                            blocked.appendChild(newDiv);
                        }
                    }
                });
            fetch('/API/follows/' + user.id, {
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
                .then(function (follows) {
                    if (follows != null) {
                        follow.innerHTML = "";
                        for (let index = 0; index < follows.length; index++) {
                            let newDiv = document.createElement("div");
                            newDiv.className = "comment-style";
                            newDiv.innerHTML = '<div class="user">' +
                                '<div class="username">' + follows[index].pseudo + ' &ensp; | &ensp;</div>' +
                                '<div class="block"><img src="/static/images/block.png" class="block-image" id="unfollow"></div>' +
                                '</div>' +
                                '<br>';
                            newDiv.querySelector("#unfollow").addEventListener("click", function (event) {
                                fetch('/API/follow/delete/' + follows[index].id, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                })
                                    .then(function (response) {
                                        follow.removeChild(newDiv);
                                        return response.json();
                                    })
                            })
                            follow.appendChild(newDiv);
                        }
                    }
                });
            fetch('/API/followers/' + user.id, {
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
                .then(function (followers) {
                    if (followers != null) {
                        follower.innerHTML = "";
                        for (let index = 0; index < followers.length; index++) {
                            let newDiv = document.createElement("div");
                            newDiv.className = "comment-style";
                            newDiv.innerHTML = '<div class="user">' +
                                '<div class="username">' + follows[index].pseudo + ' &ensp; | &ensp;</div>' +
                                '</div>' +
                                '<br>';
                            follower.appendChild(newDiv);
                        }
                    }
                });
        });
});