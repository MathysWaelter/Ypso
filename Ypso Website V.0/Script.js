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


// Slider Portfolio section
document.addEventListener('DOMContentLoaded', function() {
let items = document.querySelectorAll('.slider .item');
let next = document.getElementById('next');
let prev =  document.getElementById('prev');

let active = items.length % 2 !== 0 ? (items.length - 1) / 2 : items.length / 2;

function loadShow(){
  let stt = 0;
  items[active].style.transform = `none`;
  items[active].style.zIndex = 1;
  items[active].style.filter = 'none';
  items[active].style.opacity = 1;
  for(var i = active + 1; i < items.length;  i++){
    stt++;
    items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
    items[i].style.zIndex = -stt;
    items[i].style.filter = 'blur(5px)';
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }
  stt = 0;
  for(var i = active - 1;  i >=0; i--){
    stt++;
    items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
    items[i].style.zIndex = -stt;
    items[i].style.filter = 'blur(5px)';
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }
}
loadShow();
next.onclick = function(){
  active = active + 1 < items.length ? active + 1 : active = 0;
  loadShow();
}
prev.onclick = function(){
  active = active - 1 >= 0 ? active - 1 : active = items.length - 1;
  loadShow();
}
});