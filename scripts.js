document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const header = document.querySelector(".site-header");
  const toggle = document.getElementById("theme-toggle");
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobile-menu");

  /* ===============================
     THEME PERSISTENCE + TOGGLE
     =============================== */

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    html.setAttribute("data-theme", savedTheme);
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = html.getAttribute("data-theme") || "light";
      const next = current === "light" ? "dark" : "light";
      html.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  /* ===============================
     HEADER SCROLL STATE
     =============================== */

  if (header) {
    const updateHeader = () => {
      if (window.scrollY > 0) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", updateHeader);
    updateHeader();
  }

  /* ===============================
     PAGE FADE-IN
     =============================== */

  html.classList.add("page-loaded");

  // Restore visibility on history navigation
  window.addEventListener("pageshow", () => {
    html.classList.add("page-loaded");
  });

  /* ===============================
     COMING SOON MODAL
     =============================== */

  const modal = document.getElementById("coming-soon-modal");
  const modalClose = document.getElementById("modal-close");

  if (modal && modalClose) {
    modalClose.addEventListener("click", () => {
      modal.hidden = true;
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.hidden = true;
    });
  }

  document.querySelectorAll(".coming-soon").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (modal) modal.hidden = false;
    });
  });

  /* ===============================
     PAGE TRANSITIONS
     =============================== */

  document.querySelectorAll("a[href]").forEach((link) => {
    // Skip modal-bound links
    if (link.classList.contains("coming-soon")) return;

    const href = link.getAttribute("href");

    // Ignore empty or placeholder links
    if (!href || href === "#" || href === "") return;

    const url = new URL(link.href, location.href);

    // Skip same-page anchors
    if (url.pathname === location.pathname && url.hash) return;

    // Skip external links
    if (url.origin !== location.origin) return;

    link.addEventListener("click", (e) => {
      e.preventDefault();
      html.classList.remove("page-loaded");

      setTimeout(() => {
        window.location.href = link.href;
      }, 200);
    });
  });

  /* ===============================
     BURGER MENU TOGGLE
     =============================== */

  if (burger && mobileMenu && header) {
    burger.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      header.classList.toggle("menu-open");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        header.classList.remove("menu-open");
      });
    });
  }
});
