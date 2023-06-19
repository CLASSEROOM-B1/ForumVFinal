var submitButton = document.getElementById("submitLogin");

submitButton.addEventListener("submit", function (event) {
    event.preventDefault();
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
                document.location.href = "http://localhost:8080/profil";
            } else if (response.status == 400) {
                //Bad request
            }
            return response.json();
        })
});