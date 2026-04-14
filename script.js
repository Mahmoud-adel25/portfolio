// ============================================================================
// Main Script
// - Mobile navigation toggle
// - IntersectionObserver for fade-in animations
// - Dynamic year in footer
// ============================================================================

document.addEventListener("DOMContentLoaded", function () {
  // --------------------------------------------------------------------------
  // Mobile navigation toggle
  // --------------------------------------------------------------------------
  const header = document.querySelector(".site-header");
  const navToggle = document.getElementById("navToggle");

  if (navToggle && header) {
    navToggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", isOpen);
    });

    // Close navigation when a link is clicked (on mobile)
    header.addEventListener("click", (event) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.tagName.toLowerCase() === "a" &&
        header.classList.contains("is-open")
      ) {
        header.classList.remove("is-open");
        navToggle.classList.remove("is-open");
      }
    });
  }

  // --------------------------------------------------------------------------
  // Fade-in on scroll using IntersectionObserver
  // --------------------------------------------------------------------------
  const fadeInElements = document.querySelectorAll(".fade-in");

  if ("IntersectionObserver" in window && fadeInElements.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target); // Animate only once
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    fadeInElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: if IntersectionObserver isn't supported, just show all elements
    fadeInElements.forEach((el) => el.classList.add("is-visible"));
  }

  // --------------------------------------------------------------------------
  // Dynamic year in footer
  // --------------------------------------------------------------------------
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  // --------------------------------------------------------------------------
  // Project category filters (All / ML / BI)
  // --------------------------------------------------------------------------
  const filterWrap = document.getElementById("projectFilters");
  const filterButtons = document.querySelectorAll(".project-filter-btn");
  const projectCards = document.querySelectorAll(".project-card[data-category]");

  if (filterWrap && filterButtons.length && projectCards.length) {
    filterWrap.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLButtonElement)) {
        return;
      }

      const selectedFilter = target.dataset.filter || "all";

      filterButtons.forEach((btn) => {
        btn.classList.toggle("is-active", btn === target);
      });

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        const shouldShow = selectedFilter === "all" || category === selectedFilter;
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  }

  // --------------------------------------------------------------------------
  // Contact Form Handling
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function (e) {
      // Get form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Basic validation
      if (!name || !email || !message) {
        e.preventDefault();
        formMessage.textContent = "Please fill in all fields.";
        formMessage.className = "form-message error";
        formMessage.style.display = "block";
        return false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        e.preventDefault();
        formMessage.textContent = "Please enter a valid email address.";
        formMessage.className = "form-message error";
        formMessage.style.display = "block";
        return false;
      }

      // Show success message (form will still submit via mailto)
      formMessage.textContent = "Thank you! Your message is being sent...";
      formMessage.className = "form-message success";
      formMessage.style.display = "block";

      // Scroll to message
      formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });

      // Clear form after a delay (if mailto doesn't work)
      setTimeout(() => {
        contactForm.reset();
        formMessage.style.display = "none";
      }, 3000);
    });

    // Clear message on input focus
    const formInputs = contactForm.querySelectorAll("input, textarea");
    formInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        if (formMessage.style.display === "block") {
          formMessage.style.display = "none";
        }
      });
    });
  }
});

