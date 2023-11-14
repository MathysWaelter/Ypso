/***************************************************************************************
 ***********************************  SECTION: SCROLL  **********************************
 ***************************************************************************************/


 document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("menu-icon-link");
  const menu = document.querySelector(".menu");

  menuIcon.addEventListener("click", function () {
    event.preventDefault();
    menu.classList.toggle("show");
  });
});