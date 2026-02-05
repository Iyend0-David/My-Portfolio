/* TYPING EFFECT (aligned cursor) */
const roles = ["UI/UX Designer", "Product Designer", "Figma Specialist", "Visual Designer"];
let wIndex = 0;
let charIndex = 0;
let deleting = false;
const typedEl = document.getElementById("typed-text");

function tick() {
  if (!typedEl) return;
  const full = roles[wIndex];
  if (deleting) {
    charIndex = Math.max(0, charIndex - 1);
  } else {
    charIndex = Math.min(full.length, charIndex + 1);
  }
  typedEl.textContent = full.substring(0, charIndex);

  let delay = deleting ? 60 : 120;
  if (!deleting && charIndex === full.length) {
    delay = 1200;
    deleting = true;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    wIndex = (wIndex + 1) % roles.length;
    delay = 500;
  }
  setTimeout(tick, delay);
}
document.addEventListener("DOMContentLoaded", () => {
  tick();
});

/* SMOOTH SCROLL FOR NAV */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const href = a.getAttribute("href");
    if (href.length > 1) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({behavior: "smooth", block: "start"});
    }
  });
});

/* REVEAL ON SCROLL (IntersectionObserver) */
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('reveal--visible');
  });
},{threshold: 0.12});
reveals.forEach(r => obs.observe(r));

/* SIMPLE CUSTOM CURSOR (subtle) */
(function customCursor(){
  const cur = document.createElement('div');
  cur.style.width = '10px';
  cur.style.height = '10px';
  cur.style.borderRadius = '50%';
  cur.style.position = 'fixed';
  cur.style.pointerEvents = 'none';
  cur.style.background = 'rgba(30,144,255,0.9)';
  cur.style.transform = 'translate(-50%,-50%)';
  cur.style.zIndex = '9999';
  cur.style.mixBlendMode = 'screen';
  document.body.appendChild(cur);
  document.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px';
    cur.style.top = e.clientY + 'px';
  });
})();


