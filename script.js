// Sélection des boutons
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const likedpostcontents = document.getElementById('likedposts')
const ourpostcontents = document.getElementById('ourposts')


// Appliquer la classe active au premier bouton par défaut
button1.classList.add('active');

// Événements de clic sur les boutons
button1.addEventListener('click', () => {
    button1.classList.add('active');
    button2.classList.remove('active');
    likedpostcontents.style.display ='none';
    ourpostcontents.style.display='flex'
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

// Sélectionne la balise <a> de la div "password"
var link = document.querySelector('#passwordlink');
var link2 = document.querySelector('#submit');
// Sélectionne la popup box
var popup = document.getElementById('popup');

// Ajoute un gestionnaire d'événement de clic sur le lien
link.addEventListener('click', function(event) {
  event.preventDefault(); // Empêche le comportement par défaut du lien

  // Affiche la popup box
  popup.style.display = 'block';
});


link2.addEventListener('click', function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien
  
    // Affiche la popup box
    popup.style.display = 'none';
  });