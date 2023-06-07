// Sélectionne la balise <a> de la div "password"
var link = document.querySelector('#passwordlink');

// Sélectionne la popup box
var popup = document.getElementById('popup');

// Ajoute un gestionnaire d'événement de clic sur le lien
link.addEventListener('click', function(event) {
  event.preventDefault(); // Empêche le comportement par défaut du lien

  // Affiche la popup box
  popup.style.display = 'block';
});