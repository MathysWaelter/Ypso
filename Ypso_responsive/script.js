/***************************************************************************************
 ***********************************  SECTION: SCROLL  **********************************
 ***************************************************************************************/


 function detectScroll(event) {
    console.log(event.deltaY);
  if (event.deltaY > 0) {
    let currentSection = getCurrentSection();
    let nextSection = currentSection.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    let currentSection = getCurrentSection();
    let previousSection = currentSection.previousElementSibling;
    if (previousSection) {
      previousSection.scrollIntoView({ behavior: "smooth" });
    }
  }
}

function getCurrentSection() {
  const sections = document.querySelectorAll("section");
  let currentSection = sections[0];
  let minDistance = Math.abs(window.scrollY - currentSection.offsetTop);

  sections.forEach((section) => {
    const distance = Math.abs(window.scrollY - section.offsetTop);
    if (distance < minDistance) {
      minDistance = distance;
      currentSection = section;
    }
  });

  return currentSection;
}

window.addEventListener("wheel", detectScroll);

/***************************************************************************************
 ************************************  MENU: BUTTON  ************************************
 ***************************************************************************************/

function toggleButton(buttonId) {
  var button = document.getElementById(buttonId);
  if (button.classList.contains("button-on")) {
    button.classList.remove("button-on");
  } else {
    button.classList.add("button-on");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("menu-icon-link");
  const menu = document.querySelector(".menu");

  menuIcon.addEventListener("click", function () {
    event.preventDefault();
    menu.classList.toggle("show");
  });
});

/***************************************************************************************
 ********************************  TEAM : BUBBLES EFFECT ********************************
 ***************************************************************************************/

document.addEventListener("DOMContentLoaded", function () {

  // Récupération des éléments nécessaires du DOM
  const bubbles = document.querySelectorAll(".bubble");
  const mainCard = document.getElementById("mainCard");
  const closeButton = document.querySelector(".close-btn");

  // Calcul des limites maximales pour le placement des bulles
  const maxX = document.querySelector(".bubble-container").clientWidth - bubbles[0].offsetWidth;
  const maxY = document.querySelector(".bubble-container").clientHeight - bubbles[0].offsetHeight;
  const margin = 5;
  let lastClickedBubble = null;

  // Fonction pour vérifier si deux bulles se chevauchent
  function isOverlapping(bubble1, bubble2) {
      return Math.hypot(bubble1.x - bubble2.x, bubble1.y - bubble2.y) < bubble1.element.offsetWidth + margin;
  }

  // Fonction pour positionner une bulle de manière aléatoire
  function positionBubble(bubble) {
      let position;
      do {
          position = {
              x: Math.random() * maxX,
              y: Math.random() * maxY,
              element: bubble
          };
      } while (Array.from(bubbles).some(b => b !== bubble && isOverlapping(position, b.dataset)));

      // Applique la position calculée à la bulle
      bubble.style.transform = `translate(${position.x}px, ${position.y}px)`;
      bubble.dataset.x = position.x;
      bubble.dataset.y = position.y;
  }

  // Positionne chaque bulle et écoute l'événement de clic
  bubbles.forEach(bubble => {
      positionBubble(bubble);
      bubble.addEventListener("click", function () {
          if (lastClickedBubble) {
              lastClickedBubble.style.opacity = 1;
          }

          // Mise à jour de la carte principale avec les données de la bulle cliquée
          const attributes = this.dataset;
          mainCard.querySelector(".img-team").style.backgroundImage = `url(${attributes.image})`;
          mainCard.querySelector("h2").textContent = attributes.name;
          mainCard.querySelector("h3").textContent = attributes.role;
          mainCard.querySelector("p").textContent = attributes.description;
          mainCard.querySelector('.social-icons a[href*="github.com"]').href = attributes.github;
          mainCard.querySelector('.social-icons a[href*="linkedin.com"]').href = attributes.linkedin;

          mainCard.style.display = "block";
          this.style.opacity = 0;
          lastClickedBubble = this;
      });
  });

  // Écoute l'événement de clic sur le bouton de fermeture
  closeButton.addEventListener("click", function () {
      mainCard.style.display = "none";
      if (lastClickedBubble) {
          lastClickedBubble.style.opacity = 1;
      }
  });
});


/***************************************************************************************
 ******************************  PORTFOLIO: SLIDER ********************************
 ***************************************************************************************/

// Cet Event Listener attend que le document HTML soit entièrement chargé et analysé avant d'exécuter son contenu.
document.addEventListener("DOMContentLoaded", function () {
  // Sélection de tous les éléments ayant la classe "portfolio-item" à l'intérieur d'un élément avec la classe "portfolio-slider".
  let items = document.querySelectorAll(".portfolio-slider .portfolio-item");

  // Obtention des références aux boutons "suivant" et "précédent" par leurs identifiants respectifs.
  let next = document.getElementById("portfolio-next");
  let prev = document.getElementById("portfolio-prev");

  // Calcul de l'index de l'élément actif initialement en fonction du nombre total d'éléments, pair ou impair.
  let active =
    items.length % 2 !== 0 ? (items.length - 1) / 2 : items.length / 2;

  // Fonction pour définir l'état visuel initial des éléments du portfolio.
  function loadShow() {
    let stt = 0; // Variable de compteur pour contrôler les transformations et les effets.

    // Définition des propriétés visuelles de l'élément actif.
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = "none";
    items[active].style.opacity = 1;

    // Boucle à travers les éléments après l'élément actif, en appliquant les transformations et les effets.
    for (var i = active + 1; i < items.length; i++) {
      stt++;
      items[i].style.transform = `translateX(${120 * stt}px) scale(${
        1 - 0.2 * stt
      }) perspective(16px) rotateY(-1deg)`;
      items[i].style.zIndex = -stt;
      items[i].style.filter = "blur(5px)";
      items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }

    stt = 0; // Réinitialisation du compteur pour la prochaine boucle.

    // Boucle à travers les éléments avant l'élément actif, en appliquant les transformations et les effets.
    for (var i = active - 1; i >= 0; i--) {
      stt++;
      items[i].style.transform = `translateX(${-120 * stt}px) scale(${
        1 - 0.2 * stt
      }) perspective(16px) rotateY(1deg)`;
      items[i].style.zIndex = -stt;
      items[i].style.filter = "blur(5px)";
      items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
  }

  // Appel de la fonction loadShow pour définir l'état visuel initial des éléments du portfolio.
  loadShow();

  // Gestionnaire d'événements pour le clic sur le bouton "suivant".
  next.onclick = function () {
    // Incrément de l'index actif. S'il dépasse le dernier élément, revenir au premier élément.
    active = active + 1 < items.length ? active + 1 : (active = 0);
    // Mise à jour de l'état visuel des éléments du portfolio.
    loadShow();
  };

  // Gestionnaire d'événements pour le clic sur le bouton "précédent".
  prev.onclick = function () {
    // Décrément de l'index actif. S'il devient inférieur au premier élément, revenir au dernier élément.
    active = active - 1 >= 0 ? active - 1 : (active = items.length - 1);
    // Mise à jour de l'état visuel des éléments du portfolio.
    loadShow();
  };
});

/***************************************************************************************
 ******************************  CONTACT: TOGGLES SELECT ********************************
 ***************************************************************************************/

function toggleButton(buttonId) {
  // Désactiver tous les boutons
  const buttons = document.querySelectorAll(".button-container .button");
  buttons.forEach((button) => {
    button.classList.remove("active");
  });

  // Activer le bouton cliqué
  const clickedButton = document.getElementById(buttonId);
  clickedButton.classList.add("active");

  // Mettre à jour le champ caché avec la valeur du bouton cliqué
  const hiddenInput = document.getElementById("userChoice");
  hiddenInput.value = clickedButton.innerText;
}

// Validation du formulaire
function validateForm() {
  const userChoice = document.getElementById("userChoice").value;
  if (!userChoice) {
      alert('Veuillez sélectionner le projet a développer avant de soumettre le formulaire.');
      return false;
  }
  return true;
}
