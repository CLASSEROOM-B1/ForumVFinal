var submitButton = document.getElementById("submitLogin");

submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("test1")
    var pseudo = document.getElementById('pseudo').value;
    var password = document.getElementById('password').value;
    var data = { pseudo: pseudo, email: "", password: password };
    fetch('/API/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(function (response) {
            if (response.status == 200) {
                console.log("test");
                document.location.href = "http://localhost:8080/profil";
            } else if (response.status == 400) {
                //Bad request
            }
            return response.json();
        })
});