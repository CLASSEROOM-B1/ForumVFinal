var submitButton = document.getElementById("submitRegister");

submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    var pseudo = document.getElementById('pseudo').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value
    if (password == confirmPassword) {
        var data = { pseudo: pseudo, email: email, password: password };
        fetch('/API/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(function (response) {
                if (response.status == 400) {
                    //Bad request
                } else if (response.status == 201) {
                    document.location.href = "http://localhost:8080/profil";
                }
                return response.json();
            })
    } else {
        //Bad request
    }
});