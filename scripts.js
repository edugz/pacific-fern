document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const header = document.querySelector(".site-header");
  const toggle = document.getElementById("theme-toggle");

  /* ===============================
     THEME TOGGLE
     =============================== */
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = html.getAttribute("data-theme");
      html.setAttribute("data-theme", current === "light" ? "dark" : "light");
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

  window.addEventListener("pageshow", () => {
    html.classList.add("page-loaded");
  });

  /* ===============================
     PAGE TRANSITIONS
     =============================== */
  document.querySelectorAll("a[href]").forEach((link) => {
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
});
