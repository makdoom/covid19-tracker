const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const menuBg = document.querySelector(".menu-bg");

burger.addEventListener("click", () => {
  // for Toggle
  burger.classList.toggle("toggle");

  //   show nav-links
  navLinks.classList.toggle("show");

  //   show nav-links
  menuBg.classList.toggle("change-bg");
});
