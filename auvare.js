const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

const toggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.nav-mobile');
toggle.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', () => mobileNav.classList.remove('open'));
});

const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  observer.observe(el);
});

function setWatchHands() {
  const now = new Date();
  const h = now.getHours() % 12;
  const m = now.getMinutes();
  const s = now.getSeconds();
  const hourDeg  = (h * 30) + (m * 0.5);
  const minDeg   = (m * 6) + (s * 0.1);

  [1, 2, 3].forEach(n => {
    const hEl = document.getElementById(`h${n}`);
    const mEl = document.getElementById(`m${n}`);
    if (hEl) hEl.style.transform = `rotate(${hourDeg}deg)`;
    if (mEl) mEl.style.transform = `rotate(${minDeg}deg)`;
  });
}
setWatchHands();
setInterval(setWatchHands, 10000);

const form = document.querySelector('.contact-form-wrap');
const submitBtn = document.getElementById('submitBtn');
const successMsg = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.textContent = 'Pošiljanje...';

    const formData = new FormData(form);

    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      submitBtn.textContent = 'Poslano';
      submitBtn.style.opacity = '0.5';
      submitBtn.style.pointerEvents = 'none';
      successMsg.classList.add('visible');
      form.reset();
    } else {
      submitBtn.textContent = 'Napaka';
    }
  });
}