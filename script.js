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
  emailjs.init("C97oLWXQYg2Bm-1IP");

  document.getElementById("contactForm").addEventListener("submit", function (event) {
      event.preventDefault();

      emailjs.sendForm("service_l7q3vtd", "template_4a0hmsx", this)
      .then(() => {
          alert("Message sent successfully!");
          this.reset();
      })
      .catch(() => alert("Error sending message."));
  });


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
})

