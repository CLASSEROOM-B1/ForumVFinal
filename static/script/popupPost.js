function popupPost(){
    let submitbutton = document.querySelector('#submitDiv');
    let popupNewPost = document.getElementById('overlayPost');
    popupNewPost.style.display = 'block';
    submitbutton.addEventListener('click', function (event) {
        event.preventDefault();
        popupNewPost.style.display = 'none';
    });
}
