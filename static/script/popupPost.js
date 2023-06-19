//popup new post
let createNewPostImage = document.getElementById('addpost');
let submitButton = document.getElementById('submitPost');
let popupNewPost = document.getElementById('overlayPost');

createNewPostImage.addEventListener('click', function (event) {
    console.log("test");
    event.preventDefault();
    popupNewPost.style.display = 'block';
});

submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    popupNewPost.style.display = 'none';
});

//scroll categories

let coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

//popup contact us
let contactUsImage = document.getElementById('contactUs');
let submitButtonContact = document.getElementById('closePopup');
let popupContact = document.getElementById('overlayContact');

contactUsImage.addEventListener('click', function (event) {
    event.preventDefault();
    popupContact.style.display = 'block';
});

submitButtonContact.addEventListener('click', function (event) {
    event.preventDefault();
    popupContact.style.display = 'none';
});
