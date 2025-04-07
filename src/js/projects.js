import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';


document.addEventListener('DOMContentLoaded', function () {
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1, /* Тепер буде видно лише один слайд за раз */
    spaceBetween: 20,
    grabCursor: true,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    on: {
      afterInit: function () {
        updateButtons(this);
      },
      slideChange: function () {
        updateButtons(this);
      },
    },
  });

  // Події на кнопках
  prevBtn.addEventListener('click', () => swiper.slidePrev());
  nextBtn.addEventListener('click', () => swiper.slideNext());

  function updateButtons(swiperInstance) {
    prevBtn.disabled = swiperInstance.isBeginning;
    nextBtn.disabled = swiperInstance.isEnd;

    prevBtn.classList.toggle('disabled', swiperInstance.isBeginning);
    nextBtn.classList.toggle('disabled', swiperInstance.isEnd);
  }
});
