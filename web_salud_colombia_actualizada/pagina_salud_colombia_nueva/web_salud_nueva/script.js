const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const topBtn = document.getElementById('topBtn');
const year = document.getElementById('year');

menuBtn.addEventListener('click', () => navLinks.classList.toggle('active'));
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('active')));

year.textContent = new Date().getFullYear();

window.addEventListener('scroll', () => {
  topBtn.classList.toggle('show', window.scrollY > 450);
});

topBtn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

function initSlider(sliderEl) {
  const slides = [...sliderEl.querySelectorAll('.slide')];
  const dots = sliderEl.querySelector('.dots');
  const prevBtn = sliderEl.querySelector('.slider-btn.prev');
  const nextBtn = sliderEl.querySelector('.slider-btn.next');
  if (!slides.length || !dots || !prevBtn || !nextBtn) return;

  let current = 0;
  let timer;

  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (index === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Ir a la imagen ${index + 1}`);
    dot.addEventListener('click', () => { showSlide(index); restart(); });
    dots.appendChild(dot);
  });

  const dotEls = [...dots.children];

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    dotEls.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  function next(){ showSlide(current + 1); }
  function prev(){ showSlide(current - 1); }
  function restart(){ clearInterval(timer); timer = setInterval(next, 4500); }

  nextBtn.addEventListener('click', () => { next(); restart(); });
  prevBtn.addEventListener('click', () => { prev(); restart(); });

  sliderEl.addEventListener('mouseenter', () => clearInterval(timer));
  sliderEl.addEventListener('mouseleave', restart);

  showSlide(0);
  restart();
}

document.querySelectorAll('.slider').forEach(initSlider);
