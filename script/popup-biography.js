document.addEventListener("DOMContentLoaded", function() {
    const popupTrigger = document.querySelector(".open-popup");
    const popup = document.querySelector(".container-popup-content");
    const closeBtn = document.querySelector(".close-btn");
  
    popupTrigger.addEventListener("click", function() {
      popup.style.display = "flex";
    });
  
    closeBtn.addEventListener("click", function() {
      popup.style.display = "none";
    });
  });
  