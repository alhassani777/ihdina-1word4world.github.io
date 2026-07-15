
const slides = [...document.querySelectorAll('.slide')];
const dotsWrap = document.getElementById('sliderDots');
const currentSlide = document.getElementById('currentSlide');
const totalSlides = document.getElementById('totalSlides');
let current = 0;
let timer;

slides.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'slider-dot' + (i === 0 ? ' active' : '');
  d.setAttribute('aria-label', `الانتقال إلى الشريحة ${i+1}`);
  d.addEventListener('click', () => { goTo(i); restart(); });
  dotsWrap.appendChild(d);
});
const dots = [...document.querySelectorAll('.slider-dot')];
totalSlides.textContent = slides.length;

function goTo(i){
  current = (i + slides.length) % slides.length;
  slides.forEach((s, idx) => s.classList.toggle('active', idx === current));
  dots.forEach((d, idx) => d.classList.toggle('active', idx === current));
  currentSlide.textContent = current + 1;
}
function next(){ goTo(current + 1); }
function prev(){ goTo(current - 1); }
function start(){ stop(); timer = setInterval(next, 5000); }
function stop(){ if(timer) clearInterval(timer); }
function restart(){ start(); }

document.getElementById('nextSlide').addEventListener('click', () => { next(); restart(); });
document.getElementById('prevSlide').addEventListener('click', () => { prev(); restart(); });

const slider = document.querySelector('.hero-slider');
slider.addEventListener('mouseenter', stop);
slider.addEventListener('mouseleave', start);
slider.addEventListener('touchstart', stop, {passive:true});
slider.addEventListener('touchend', start, {passive:true});

const modal = document.getElementById('languageModal');
if (modal) {
  const languageButton = document.getElementById('languageButton');
  const closeLanguageModal = document.getElementById('closeLanguageModal');
  if (languageButton) languageButton.addEventListener('click', () => modal.classList.add('open'));
  if (closeLanguageModal) closeLanguageModal.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', e => { if(e.target === modal) modal.classList.remove('open'); });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.getElementById('menuButton').addEventListener('click', () => {
  document.getElementById('mobileLinks').classList.toggle('open');
});

start();
