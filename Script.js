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