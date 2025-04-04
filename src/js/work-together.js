import axios from 'axios';

const form = document.querySelector('.js-form');
const modal = document.querySelector('.js-modal');
const modalContent = document.querySelector('.js-modal-content');
const button = document.querySelector('.js-button-modal-close');

form.addEventListener('submit', handleFormSubmit);
button.addEventListener('click', hideModal);
modal.addEventListener('click', closeModalOnBackdrop);
document.addEventListener('keydown', handleEscapeKey);

async function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(form);

  const data = {
    email: formData.get('email').trim(),
    comment: formData.get('comment'.trim()),
  };

  if (!data.email || !data.comment) {
    alert('Будь ласка, заповніть всі поля форми.');
    return;
  }

  try {
    if (Object.keys(data).length > 0) {
      await axios.post('https://portfolio-js.b.goit.study/api/requests', data);

      showModal();
      form.reset();
    }
  } catch (error) {
    console.error('Помилка надсилання форми:', error);
    alert('Сталася помилка при надсиланні. Спробуйте ще раз.');
  }
}

function showModal() {
  modal.classList.add('modal-is-open');
  modalContent.classList.add('modal-content-is-open');

  setTimeout(() => {
    hideModal();
  }, 3000);
}

function hideModal() {
  modal.classList.remove('modal-is-open');
  modalContent.classList.remove('modal-content-is-open');
}

function closeModalOnBackdrop(event) {
  if (event.target === modal) {
    hideModal();
  }
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    hideModal();
  }
}
