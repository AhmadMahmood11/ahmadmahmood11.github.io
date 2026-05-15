const body = document.body;
const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".main-nav a");
const dot = document.querySelector(".cursor-dot");

if (toggle) {
  toggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("menu-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  });
});

if (dot && window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("mousemove", (event) => {
    dot.style.opacity = "1";
    dot.style.left = `${event.clientX}px`;
    dot.style.top = `${event.clientY}px`;
  });
}

const revealTargets = document.querySelectorAll(
  ".section-heading, .about-large, .about-columns > div, .timeline-item, .services-grid article, .project-card, .list-row, .purpose-text, .review-card, .contact-grid > div"
);

revealTargets.forEach((item) => item.setAttribute("data-reveal", ""));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((item) => observer.observe(item));

const cards = Array.from(document.querySelectorAll(".review-card"));
const next = document.querySelector("[data-next]");
const prev = document.querySelector("[data-prev]");
let active = 0;

function showReview(index) {
  if (!cards.length) return;
  cards[active].classList.remove("is-active");
  active = (index + cards.length) % cards.length;
  cards[active].classList.add("is-active");
}

if (next) {
  next.addEventListener("click", () => showReview(active + 1));
}

if (prev) {
  prev.addEventListener("click", () => showReview(active - 1));
}

setInterval(() => {
  showReview(active + 1);
}, 6000);
