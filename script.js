// Conquest Technologies — small progressive enhancements
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Sticky nav shadow
  const nav = document.querySelector(".nav");
  const onScroll = () => nav && nav.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    const setOpen = (open) => {
      links.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", () => setOpen(!links.classList.contains("is-open")));
    links.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  }

  // Count-up animation
  const animateCounter = (el) => {
    const target = Number(el.dataset.target) || 0;
    if (reduceMotion) { el.textContent = target; return; }
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const counters = document.querySelectorAll(".counter");
  const reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObs = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el) => revealObs.observe(el));

    const countObs = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => countObs.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
    counters.forEach((el) => (el.textContent = el.dataset.target));
  }

  // Job description toggle
  const jobToggle = document.getElementById("jobToggle");
  const jobDetails = document.getElementById("jobDetails");
  if (jobToggle && jobDetails) {
    jobToggle.addEventListener("click", () => {
      const open = jobDetails.hidden;
      jobDetails.hidden = !open;
      jobToggle.setAttribute("aria-expanded", String(open));
      jobToggle.firstChild.textContent = open ? "Hide job description " : "View full job description ";
    });
  }

  // "Apply now" pre-fills the contact subject
  const subjectField = document.getElementById("subjectField");
  document.querySelectorAll("[data-apply]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (subjectField) subjectField.value = "Application: " + btn.dataset.apply + " (Dallas, TX)";
    });
  });

  // Contact form → opens the visitor's email client (no backend needed)
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  const CONTACT_EMAIL = "pritamsingh@conquesttechnologies.in";

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll("[required]").forEach((field) => {
        const ok = field.type === "email"
          ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())
          : field.value.trim() !== "";
        field.classList.toggle("is-invalid", !ok);
        if (!ok) valid = false;
      });

      if (!valid) {
        note.textContent = "Please fill in your name, a valid email and a message.";
        note.className = "form__note is-error";
        return;
      }

      const data = new FormData(form);
      const subject = data.get("subject") || "Website enquiry from " + data.get("name");
      const body = [
        "Name: " + data.get("name"),
        "Email: " + data.get("email"),
        "Phone: " + (data.get("phone") || "-"),
        "I am a: " + data.get("type"),
        "",
        data.get("message"),
      ].join("\n");

      window.location.href = "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      note.textContent = "Thanks! Your email app should open with your message ready to send.";
      note.className = "form__note is-success";
      form.reset();
    });

    form.addEventListener("input", (e) => e.target.classList.remove("is-invalid"));
  }
})();
