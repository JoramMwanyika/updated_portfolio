// Main JavaScript file for Joram's Portfolio

document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  })

  // Initialize EmailJS
  emailjs.init("C97oLWXQYg2Bm-1IP")

  // DOM Elements
  const navbar = document.getElementById("navbar")
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")
  const backToTopButton = document.getElementById("backToTop")
  const themeToggle = document.getElementById("theme-toggle")
  const skillProgressBars = document.querySelectorAll(".skill-progress")
  const contactForm = document.getElementById("contactForm")
  const formStatus = document.getElementById("formStatus")
  const projectTabs = document.querySelectorAll(".project-tab")
  const projectCards = document.querySelectorAll(".project-card")

  // Typing effect for hero section
  const typingText = document.getElementById("typing-text")
  const words = ["Automation Specialist", "Web Developer", "Problem Solver"]
  let wordIndex = 0
  let charIndex = 0
  let isDeleting = false
  let isWaiting = false

  function typeEffect() {
    const currentWord = words[wordIndex]

    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1)
      charIndex--
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1)
      charIndex++
    }

    typingText.classList.add("typing")

    let typeSpeed = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentWord.length) {
      isWaiting = true
      typeSpeed = 1500 // Wait before starting to delete
      isDeleting = true
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      isWaiting = false
      wordIndex = (wordIndex + 1) % words.length
    }

    setTimeout(typeEffect, typeSpeed)
  }

  // Start the typing effect
  if (typingText) {
    typeEffect()
  }

  // Handle scroll events
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY

    // Navbar styling on scroll
    if (scrollPosition > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Back to top button visibility
    if (scrollPosition > 300) {
      backToTopButton.classList.add("active")
    } else {
      backToTopButton.classList.remove("active")
    }

    // Animate skill progress bars when in viewport
    const skillsSection = document.querySelector(".skills-section")
    if (skillsSection) {
      const sectionTop = skillsSection.offsetTop
      const sectionHeight = skillsSection.offsetHeight

      if (scrollPosition > sectionTop - 500 && scrollPosition < sectionTop + sectionHeight) {
        skillProgressBars.forEach((bar) => {
          const progress = bar.getAttribute("data-progress")
          bar.style.setProperty("--progress-width", progress + "%")
          bar.parentElement.parentElement.classList.add("animate-progress")
        })
      }
    }
  })

  // Mobile menu toggle
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("active")
      document.body.classList.toggle("menu-open")

      // Toggle hamburger animation
      this.classList.toggle("active")

      if (this.classList.contains("active")) {
        this.querySelector("span:nth-child(1)").style.transform = "translateY(8px) rotate(45deg)"
        this.querySelector("span:nth-child(2)").style.opacity = "0"
        this.querySelector("span:nth-child(3)").style.transform = "translateY(-8px) rotate(-45deg)"
      } else {
        this.querySelector("span:nth-child(1)").style.transform = "none"
        this.querySelector("span:nth-child(2)").style.opacity = "1"
        this.querySelector("span:nth-child(3)").style.transform = "none"
      }
    })

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        document.body.classList.remove("menu-open")
        mobileMenuButton.classList.remove("active")
        mobileMenuButton.querySelector("span:nth-child(1)").style.transform = "none"
        mobileMenuButton.querySelector("span:nth-child(2)").style.opacity = "1"
        mobileMenuButton.querySelector("span:nth-child(3)").style.transform = "none"
      })
    })
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerOffset = 80
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Back to top button functionality
  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Theme toggle functionality
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode")

      // Save theme preference to localStorage
      if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light")
      } else {
        localStorage.setItem("theme", "dark")
      }
    })

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light") {
      document.body.classList.add("light-mode")
    }
  }

  // Project tabs functionality
  if (projectTabs.length > 0 && projectCards.length > 0) {
    projectTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-project")

        // Update active tab
        projectTabs.forEach((t) => t.classList.remove("active"))
        tab.classList.add("active")

        // Show selected project
        projectCards.forEach((card) => {
          card.classList.remove("active")
          if (card.id === target) {
            setTimeout(() => {
              card.classList.add("active")
            }, 300)
          }
        })
      })
    })
  }

  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const submitButton = document.getElementById("submitButton")
      submitButton.disabled = true
      submitButton.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>'

      emailjs
        .sendForm("service_l7q3vtd", "template_4a0hmsx", this)
        .then(() => {
          formStatus.classList.add("success")
          formStatus.classList.remove("error")
          formStatus.textContent = "Message sent successfully!"
          formStatus.style.display = "block"

          submitButton.disabled = false
          submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>'

          // Reset form
          contactForm.reset()

          // Hide status message after 5 seconds
          setTimeout(() => {
            formStatus.style.display = "none"
          }, 5000)
        })
        .catch((error) => {
          formStatus.classList.add("error")
          formStatus.classList.remove("success")
          formStatus.textContent = "Error sending message. Please try again."
          formStatus.style.display = "block"

          submitButton.disabled = false
          submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>'

          console.error("EmailJS error:", error)
        })
    })
  }
})

