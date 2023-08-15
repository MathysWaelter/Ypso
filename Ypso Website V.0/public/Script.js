// Burger Menu Open / Close

document.addEventListener('DOMContentLoaded', function() {
  const menuIcon = document.getElementById('menu-icon-link');
  const menu = document.querySelector('.menu');

  menuIcon.addEventListener('click', function() {
    event.preventDefault();
    menu.classList.toggle('show');
  });
});

// Scroll Effect between section

function detectScroll(event) {
      
  if (event.deltaY > 0) {
    const currentSection = getCurrentSection();
    const nextSection = currentSection.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth"});
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


// Section team - Bubble Effect

document.addEventListener('DOMContentLoaded', function() {
  // Sélection des éléments nécessaires
  const bubbles = document.querySelectorAll('.bubble');
  const mainCard = document.getElementById('mainCard');
  const closeButton = document.querySelector('.close-btn');
  let lastClickedBubble = null;

  // Initialisation des données pour les bulles
  const bubblesData = [];
  // Calcul des limites maximales pour la position des bulles
  const bubbleContainer = document.querySelector('.bubble-container');
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
  bubbles.forEach(bubble => {
      let position;
      do {
          position = {
              x: Math.random() * maxX,
              y: Math.random() * maxY,
              dx: (Math.random() - 0.5) * 4,
              dy: (Math.random() - 0.5) * 4,
              element: bubble,
              isHovered: false
          };
      } while (bubblesData.some(b => isOverlapping(b, position)));
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
          if (otherBubble !== bubbleData && isOverlapping(bubbleData, otherBubble)) {
              handleCollision(bubbleData, otherBubble);
          }
      }

      // Mise à jour de la position de l'élément DOM
      bubbleData.element.style.transform = `translate(${bubbleData.x}px, ${bubbleData.y}px)`;
  }

  // Réinitialisation de la dernière bulle cliquée
  function resetLastClickedBubble() {
      if (lastClickedBubble) {
          lastClickedBubble.style.transition = 'opacity 5s';
          lastClickedBubble.style.opacity = 1;
      }
  }

  // Gestion des événements pour chaque bulle
  bubbles.forEach(bubble => {
      bubble.addEventListener('mouseover', function() {
          const bubbleData = bubblesData.find(b => b.element === this);
          bubbleData.isHovered = true;
      });

      bubble.addEventListener('mouseout', function() {
          const bubbleData = bubblesData.find(b => b.element === this);
          bubbleData.isHovered = false;
      });

      bubble.addEventListener('click', function() {
          if (lastClickedBubble) {
              resetLastClickedBubble();
          }

          // Récupération des données de la bulle cliquée
          const memberImage = this.getAttribute('data-image');
          const memberName = this.getAttribute('data-name');
          const memberRole = this.getAttribute('data-role');
          const memberDescription = this.getAttribute('data-description');
          const githubURL = this.getAttribute('data-github');
          const linkedinURL = this.getAttribute('data-linkedin');

          // Mise à jour de la carte principale avec les données de la bulle cliquée
          mainCard.querySelector('.img-team').style.backgroundImage = `url(${memberImage})`;
          mainCard.querySelector('h2').textContent = memberName;
          mainCard.querySelector('h3').textContent = memberRole;
          mainCard.querySelector('p').textContent = memberDescription;
          mainCard.querySelector('.social-icons a[href*="github.com"]').href = githubURL;
          mainCard.querySelector('.social-icons a[href*="linkedin.com"]').href = linkedinURL;  

          mainCard.style.display = 'block';

          this.style.transition = 'opacity 1s';
          this.style.opacity = 0;
          lastClickedBubble = this;
      });
  });

  // Gestion de l'événement de fermeture de la carte principale
  closeButton.addEventListener('click', function() {
      mainCard.style.display = 'none';
      resetLastClickedBubble();
  });

  // Animation des bulles
  function animateBubbles() {
      bubblesData.forEach(updateBubblePosition);
      requestAnimationFrame(animateBubbles);
  }

  animateBubbles();
});
