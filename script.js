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
  const form = document.getElementById("contactForm")
  const submitButton = document.getElementById("submitButton")

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault()
      submitButton.disabled = true
      submitButton.textContent = "Sending..."

      const formData = new FormData(form)
      const data = Object.fromEntries(formData.entries())

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
          }),
        })

        if (response.ok) {
          alert("Message sent successfully!")
          form.reset()
        } else {
          throw new Error("Failed to send message")
        }
      } catch (error) {
        console.error("Error:", error)
        alert("Failed to send message. Please try again later.")
      } finally {
        submitButton.disabled = false
        submitButton.textContent = "Send Message"
      }
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
})

