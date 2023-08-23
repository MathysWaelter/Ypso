/***************************************************************************************
 ***********************************  SECTION: SCROLL  **********************************
 ***************************************************************************************/

function detectScroll(event) {
  if (event.deltaY > 0) {
    const currentSection = getCurrentSection();
    const nextSection = currentSection.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    const currentSection = getCurrentSection();
    const previousSection = currentSection.previousElementSibling;
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
  // Sélection des éléments nécessaires
  const bubbles = document.querySelectorAll(".bubble");
  const mainCard = document.getElementById("mainCard");
  const closeButton = document.querySelector(".close-btn");
  let lastClickedBubble = null;

  // Initialisation des données pour les bulles
  const bubblesData = [];
  // Calcul des limites maximales pour la position des bulles
  const bubbleContainer = document.querySelector(".bubble-container");
  const maxX = bubbleContainer.clientWidth - bubbles[0].offsetWidth;
  const maxY = bubbleContainer.clientHeight - bubbles[0].offsetHeight;

  // Fonction pour vérifier si deux bulles se chevauchent
  function isOverlapping(bubble1, bubble2) {
    const dx = bubble1.x - bubble2.x;
    const dy = bubble1.y - bubble2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < bubble1.element.offsetWidth;
  }

  // Initialisation des positions des bulles sans chevauchement
  bubbles.forEach((bubble) => {
    let position;
    do {
      position = {
        x: Math.random() * maxX,
        y: Math.random() * maxY,
        dx: (Math.random() - 0.5) * 4,
        dy: (Math.random() - 0.5) * 4,
        element: bubble,
        isHovered: false,
      };
    } while (bubblesData.some((b) => isOverlapping(b, position)));
    bubblesData.push(position);
  });

  // Gestion des collisions entre bulles
  function handleCollision(bubble1, bubble2) {
    const angle = Math.atan2(bubble2.y - bubble1.y, bubble2.x - bubble1.x);
    bubble2.dx = Math.cos(angle);
    bubble2.dy = Math.sin(angle);
    bubble1.dx = -Math.cos(angle);
    bubble1.dy = -Math.sin(angle);
  }

  // Mise à jour de la position des bulles
  function updateBubblePosition(bubbleData) {
    if (!bubbleData.isHovered) {
      bubbleData.x += bubbleData.dx;
      bubbleData.y += bubbleData.dy;

      // Vérification des limites de l'écran
      if (bubbleData.x < 0 || bubbleData.x > maxX) {
        bubbleData.dx = -bubbleData.dx;
      }

      if (bubbleData.y < 0 || bubbleData.y > maxY) {
        bubbleData.dy = -bubbleData.dy;
      }
    }

    // Vérification des collisions avec les autres bulles
    for (let otherBubble of bubblesData) {
      if (
        otherBubble !== bubbleData &&
        isOverlapping(bubbleData, otherBubble)
      ) {
        handleCollision(bubbleData, otherBubble);
      }
    }

    // Mise à jour de la position de l'élément DOM
    bubbleData.element.style.transform = `translate(${bubbleData.x}px, ${bubbleData.y}px)`;
  }

  // Réinitialisation de la dernière bulle cliquée
  function resetLastClickedBubble() {
    if (lastClickedBubble) {
      lastClickedBubble.style.transition = "opacity 5s";
      lastClickedBubble.style.opacity = 1;
    }
  }

  // Gestion des événements pour chaque bulle
  bubbles.forEach((bubble) => {
    bubble.addEventListener("mouseover", function () {
      const bubbleData = bubblesData.find((b) => b.element === this);
      bubbleData.isHovered = true;
    });

    bubble.addEventListener("mouseout", function () {
      const bubbleData = bubblesData.find((b) => b.element === this);
      bubbleData.isHovered = false;
    });

    bubble.addEventListener("click", function () {
      if (lastClickedBubble) {
        resetLastClickedBubble();
      }

      // Récupération des données de la bulle cliquée
      const memberImage = this.getAttribute("data-image");
      const memberName = this.getAttribute("data-name");
      const memberRole = this.getAttribute("data-role");
      const memberDescription = this.getAttribute("data-description");
      const githubURL = this.getAttribute("data-github");
      const linkedinURL = this.getAttribute("data-linkedin");

      // Mise à jour de la carte principale avec les données de la bulle cliquée
      mainCard.querySelector(
        ".img-team"
      ).style.backgroundImage = `url(${memberImage})`;
      mainCard.querySelector("h2").textContent = memberName;
      mainCard.querySelector("h3").textContent = memberRole;
      mainCard.querySelector("p").textContent = memberDescription;
      mainCard.querySelector('.social-icons a[href*="github.com"]').href =
        githubURL;
      mainCard.querySelector('.social-icons a[href*="linkedin.com"]').href =
        linkedinURL;

      mainCard.style.display = "block";

      this.style.transition = "opacity 1s";
      this.style.opacity = 0;
      lastClickedBubble = this;
    });
  });

  // Gestion de l'événement de fermeture de la carte principale
  closeButton.addEventListener("click", function () {
    mainCard.style.display = "none";
    resetLastClickedBubble();
  });

  // Animation des bulles
  function animateBubbles() {
    bubblesData.forEach(updateBubblePosition);
    requestAnimationFrame(animateBubbles);
  }

  animateBubbles();
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
