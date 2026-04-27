const slider = document.querySelector('#heroSlider');
const slides = Array.from(slider.querySelectorAll('.slide'));
const dots = Array.from(slider.querySelectorAll('.slider-dot'));
let activeIndex = 0;
let sliderInterval = null;

function setActiveSlide(index) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === index);
  });
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });
  activeIndex = index;
}

function nextSlide() {
  const nextIndex = (activeIndex + 1) % slides.length;
  setActiveSlide(nextIndex);
}

function startSlider() {
  if (sliderInterval) {
    clearInterval(sliderInterval);
  }
  sliderInterval = setInterval(nextSlide, 5000);
}

function stopSlider() {
  clearInterval(sliderInterval);
}

function toggleCardAnimation(event) {
  const card = event.currentTarget;
  card.classList.toggle('active-card');
}

function updateBudgetValue(event) {
  const output = document.getElementById('budgetValue');
  if (output) {
    output.textContent = `${event.target.value}%`;
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.querySelector('#name').value;
  const service = form.querySelector('#service').value;
  alert(`Thanks, ${name}! We received your request for ${service.replace('-', ' ')}.`);
  form.reset();
  updateBudgetValue({ target: { value: 50 } });
}

function initSliderControls() {
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.index);
      setActiveSlide(index);
      stopSlider();
      startSlider();
    });
  });
}

function initInteractiveCards() {
  const cards = document.querySelectorAll('.feature-card');
  cards.forEach((card) => {
    card.addEventListener('click', toggleCardAnimation);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleCardAnimation(event);
      }
    });
  });
}

function initForm() {
  const form = document.getElementById('contactForm');
  const budget = document.getElementById('budget');
  if (budget) {
    budget.addEventListener('input', updateBudgetValue);
  }
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
}

function init() {
  initSliderControls();
  initInteractiveCards();
  initForm();
  startSlider();
}

window.addEventListener('DOMContentLoaded', init);
