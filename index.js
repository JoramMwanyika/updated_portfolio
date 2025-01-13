function showNextProject() {
  const project2 = document.getElementById("project2");
  project2.style.display = "block";
  window.scrollTo(0, project2.offsetTop);
}


document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav__menu");

  menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
  });
});

