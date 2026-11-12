document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // Dark / Light Mode
  // =========================

  const themeButton = document.querySelector("#theme-toggle");
  const root = document.documentElement;

  const savedTheme = localStorage.getItem("theme");

  const systemTheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches ? "dark" : "light";

  function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem("theme", theme);

    if (themeButton) {
      themeButton.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );

      themeButton.textContent = theme === "dark" ? "☀" : "☾";
    }
  }

  setTheme(savedTheme || systemTheme);

  themeButton?.addEventListener("click", () => {
    const currentTheme = root.dataset.theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });

  // =========================
  // Active Navigation Link
  // =========================

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const currentId = entry.target.id;

        navLinks.forEach((link) => {
          const isCurrent = link.getAttribute("href") === `#${currentId}`;

          link.classList.toggle("is-active", isCurrent);
        });
      });
    },
    {
      // Detect the section around the middle of the screen
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => {
    navObserver.observe(section);
  });


  // =========================
  // Mobile Navigation
  // =========================

  const menuButton = document.querySelector("#menu-toggle");
  const navbar = document.querySelector(".navbar");

  menuButton?.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("is-open");

    menuButton.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", isOpen);
  });

  navbar?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navbar.classList.remove("is-open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });


  // =========================
  // Scroll Reveal
  // =========================

  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(element => {
    observer.observe(element);
  });


  // =========================
  // Scroll Progress
  // =========================

  const scrollTrack = document.querySelector(".scroll-track");

  function updateScrollProgress() {
    if (!scrollTrack) return;

    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollableHeight > 0
      ? window.scrollY / scrollableHeight
      : 0;

    scrollTrack.style.transform = `scaleX(${progress})`;
  }

  window.addEventListener("scroll", updateScrollProgress, {
    passive: true
  });

  updateScrollProgress();


  // =========================
  // Accordion
  // =========================

  const accordionItems = document.querySelectorAll(".timeline-item");

  accordionItems.forEach(item => {
    const trigger = item.querySelector(".accordion-trigger");

    trigger?.addEventListener("click", () => {
      const isOpen = item.classList.toggle("is-open");

      trigger.setAttribute("aria-expanded", isOpen);
    });
  });


  // =========================
  // Contact Form Validation
  // =========================

  const form = document.querySelector("#contact-form");

  form?.addEventListener("submit", event => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Connect your form service or backend here.
    alert("Your message is ready to be sent.");
  });

});