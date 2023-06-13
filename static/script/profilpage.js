console.log("test");
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
    likedpostcontents.style.display ='flex';
    ourpostcontents.style.display='none';
})

button1.addEventListener('click', () => { 
    ourpostcontents.style.display ='flex';
})


let link = document.querySelector('#passwordlink');
let link2 = document.querySelector('#submit');
let popup = document.querySelector('.overlay');


link.addEventListener('click', function(event) {
  event.preventDefault();  
  popup.style.display = 'block';
});


link2.addEventListener('click', function(event) {
    event.preventDefault(); 
    popup.style.display = 'none';
  });


let biographyElement = document.querySelector('.biography');

biographyElement.addEventListener('click', function() {
    let text = biographyElement.textContent.trim();
    let input = document.createElement('input');
    input.type = 'text';
    input.value = text;
    input.maxLength = 50;
    input.classList.add('biography-input');

    biographyElement.textContent = '';
    biographyElement.appendChild(input);

    input.focus();

    input.addEventListener('blur', function() {
        let newText = input.value.trim();
        biographyElement.textContent = newText || 'Biography ...';
    });
});
