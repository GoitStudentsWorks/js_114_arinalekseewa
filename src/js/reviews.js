import axios from 'axios';
import iziToast from 'izitoast';
import Swiper from 'swiper/bundle';

const reviewList = document.querySelector('.reviews-list');
const swiperControlButtons = document.querySelector('.swiper-control-buttons');
const swiperSlide = document.querySelector('.swiper-slide');

axios.defaults.baseURL = 'https://portfolio-js.b.goit.study';

const fetchReviews = () => {
  return axios.get('/api/reviews').then(response => response.data);
};

function createReviewCard(reviewData) {
  return `
    <div class="reviews-card swiper-slide">
      <img src="${reviewData.avatar_url}" alt="${reviewData.author}" class="reviews-card-img" />
      <h3 class="reviews-card-author">${reviewData.author}</h3>
      <p class="reviews-card-text">${reviewData.review}</p>
    </div>
  `;
}

const renderCard = reviews => {
  const markup = reviews.map(createReviewCard).join('');
  reviewList.insertAdjacentHTML('beforeend', markup);
};

const initializeReviews = async () => {
  try {
    const data = await fetchReviews();
    renderCard(data);

    new Swiper('.reviews-swiper.swiper', {
  slidesPerView: 1,  
      speed: 300,
  freeMode: true,
  breakpoints: {
    768: {
      slidesPerView: 2,  
      spaceBetween: 16,
    },
    1440: {
      slidesPerView: 4, 
      spaceBetween: 16,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next.button-next',
    prevEl: '.swiper-button-prev.button-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  grabCursor: true,
  mousewheel: false,
});


  } catch (error) {
    iziToast.error({
      title: 'Error',
      position: 'topCenter',
      message: `Error fetching reviews: ${error}`,
    });
    reviewList.insertAdjacentHTML(
      'beforeend',
      `<p class="reviews-error-text">Not found</p>`
    );
    swiperControlButtons.classList.add('is-hidden');
  }
};

initializeReviews();