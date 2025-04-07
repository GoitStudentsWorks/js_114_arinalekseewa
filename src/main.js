import './js/header.js';

import './js/projects.js';
import './js/faq.js';
import './js/covers.js';
import './js/reviews.js';
import './js/work-together.js';

const scrollTopBtn = document.querySelector('.scroll-top-btn');
const aboutMeSection = document.querySelector('#about-me-2'); // або .about-me

// Показуємо кнопку при скролі на секцію About Me або після неї
window.addEventListener('scroll', () => {
  const rect = aboutMeSection.getBoundingClientRect();
  
  // Якщо секція About Me в полі зору або після неї
  if (rect.top <= window.innerHeight && rect.bottom >= 0) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

// Плавний скрол на початок сторінки
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
/* 
import './js/about-me.js';




 */