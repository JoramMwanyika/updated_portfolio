document.addEventListener("DOMContentLoaded", (event) => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
    })
  })

  // Form submission handling
  const form = document.querySelector("form")
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      // Add form submission logic here
      console.log("Form submitted")
      // You can add AJAX call to submit the form data to a server
    })
  }

  // Next Project button functionality
  const nextProjectBtn = document.getElementById("nextProjectBtn")
  const project1 = document.querySelector("#projects > div > div:first-child")
  const project2 = document.getElementById("project2")
  let showingProject1 = true

  if (nextProjectBtn) {
    nextProjectBtn.addEventListener("click", () => {
      if (showingProject1) {
        project1.classList.add("hidden")
        project2.classList.remove("hidden")
        nextProjectBtn.textContent = "Previous Project"
      } else {
        project2.classList.add("hidden")
        project1.classList.remove("hidden")
        nextProjectBtn.textContent = "Next Project"
      }
      showingProject1 = !showingProject1
    })
  }

  // Add more JavaScript functionality as needed
})

