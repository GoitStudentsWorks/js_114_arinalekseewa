import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import Swiper from 'swiper';
import { Navigation, Mousewheel, Keyboard } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', function () {
  // Accordion
  const accordion = new Accordion('.about-me-accordion', {
    duration: 400,
    showMultiple: true,
    collapse: false,
  });

  const items = document.querySelectorAll('.about-me-item');
  items.forEach((item, index) => {
    const content = item.querySelector('div:nth-of-type(2)');
    const arrow = item.querySelector('.icon-arrow');
    content.classList.add('about-me-content');

    if (index === 0) {
      item.classList.add('open');
      content.style.maxHeight = content.scrollHeight + 'px';
      arrow.style.transform = 'rotate(180deg)';
    }
  });

  document.querySelectorAll('.about-me-icon').forEach(title => {
    title.addEventListener('click', function () {
      const item = this.closest('.about-me-item');
      const content = item.querySelector('div:nth-of-type(2)');
      const arrow = item.querySelector('.icon-arrow');
      const isOpen = item.classList.toggle('open');

      content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : '0px';
      arrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    });
  });

  // Swiper
  const swiper = new Swiper('.about-me-swiper-container', {
    loop: false,
    slidesPerView: 2,
    modules: [Navigation, Mousewheel, Keyboard],
    navigation: {
      nextEl: '.swiper-button-next',
    },
    keyboard: { enabled: true, onlyInViewport: false, pageUpDown: true },
    mousewheel: true,
    roundLengths: true,
    breakpoints: {
      768: { slidesPerView: 3 },
      1440: { slidesPerView: 6 },
    },
  });

  swiper.on('slideChange', function () {
    document.querySelectorAll('.about-me-item-skils').forEach(el => el.classList.remove('active'));

    const activeIndex = swiper.activeIndex;
    const slides = swiper.slides;

    if (slides[activeIndex]) {
      slides[activeIndex].classList.add('active');
    }
  });
});
