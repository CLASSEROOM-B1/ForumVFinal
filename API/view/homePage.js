
var count = 0;

function get10Posts() {
    fetch('/API/posts')
        .then(function (response) {
            return response.json();
        })
        .then(function (posts) {
            try {
                document.getElementById("scrollable").lastChild.remove();
            } catch (error) {

            }
            for (let index = count * 10; index < (count + 1) * 10; index++) {
                var card = document.getElementById("cardpost");
                var newDiv = document.createElement("div");
                newDiv.innerHTML = card.innerHTML;
                var fruitImg = newDiv.querySelector("#fruitsImg");
                var backColor = newDiv.querySelector("#backcolor");
                switch (posts[index].category) {
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
                title.innerHTML = posts[index].title;
                fetch('/API/user/' + posts[index].creatorId)
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
                message.innerHTML = posts[index].message;
                var category = newDiv.querySelector("#category");
                category.innerHTML = posts[index].category;
                document.getElementById("scrollable").appendChild(newDiv);
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
            document.getElementById("scrollable").innerHTML = "";
            fetch('/API/post/category/' + element.id)
                .then(function (response) {
                    return response.json();
                })
                .then(function (posts) {
                    posts.forEach(function (post) {
                        var card = document.getElementById("cardpost");
                        var newDiv = document.createElement("div");
                        newDiv.innerHTML = card.innerHTML;
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
                        document.getElementById("scrollable").appendChild(newDiv);
                    });
                });
        });
    });
}

function getPostByTitle() {
    document.getElementById("searchImg").addEventListener("submit", function (event) {
        document.getElementById("scrollable").innerHTML = "";
        var search = document.getElementById("searchResult").value;
        fetch('/API/post/title/' + search)
            .then(function (response) {
                return response.json();
            })
            .then(function (posts) {
                posts.forEach(function (post) {
                    var card = document.getElementById("cardpost");
                    var newDiv = document.createElement("div");
                    newDiv.innerHTML = card.innerHTML;
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
                    document.getElementById("scrollable").appendChild(newDiv);
                });
            });
    });
};

function defineButtons() {
    var createPost = document.querySelector("#createPost");
    var addPeople = document.getElementById("#addPeople");
    var profil = document.getElementById("#profil");
    var contactUs = document.querySelector("#contactUs");
    var popup = document.getElementById("popup");
    var popup2 = document.getElementById("popupcontact")
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
            createPost.href = "/login";
            addPeople.href = "/login";
            profil.href = "/login";
        });
}

document.getElementById("submitPost").addEventListener("submit", function (event) {
    event.preventDefault();
    var userId = 0;
    const title = document.getElementById('Title').value;
    const category = document.getElementById('categorySearch').value;
    const message = document.getElementById('textArea').value;
    fetch('/API/user/me')
        .then(function (response) {
            return response.json();
        })
        .then(function (user) {
            userId = user.id;
        });
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

getPostsByCategory();

get10Posts();

defineButtons();