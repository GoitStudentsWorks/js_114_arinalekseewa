import axios from 'axios';
import Swal from 'sweetalert2';

const form = document.querySelector('.js-form');

const as = document.querySelector('.connect__background').currentSrc;
console.log(as);

const elements = {
  emailInput: form.querySelector('.js-email'),
  commentInput: form.querySelector('.js-comment'),
  emailError: form.querySelector('.js-email-error'),
  commentError: form.querySelector('.js-comment-error'),
};

form.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault();
  clearValidationErrors();

  const formData = new FormData(form);
  const email = formData.get('email')?.trim();
  const comment = formData.get('comment')?.trim();

  if (!validateForm(email, comment)) return;

  try {
    showModalLoading();

    const { data } = await axios.post(
      'https://portfolio-js.b.goit.study/api/requests',
      { email, comment }
    );

    Swal.close();
    showModalSuccess(data.title, data.message);
    form.reset();
  } catch (error) {
    Swal.close();
    console.error('Form submission error:', error);

    if (!navigator.onLine) {
      showModalNoConnection();
      return;
    }

    const message =
      error.response?.data?.message ||
      'Something went wrong. Please try again later.';

    showModalError(message);
  }
}

function validateForm(email, comment) {
  let isValid = true;
  const { emailInput, commentInput, emailError, commentError } = elements;

  const emailPattern =
    /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+(com|net|org|ua|gov|edu)$/;

  if (!email) {
    showValidationError(emailError, emailInput, 'Email is required.');
    isValid = false;
  } else if (!emailPattern.test(email)) {
    showValidationError(
      emailError,
      emailInput,
      'Please enter a valid email address.'
    );
    isValid = false;
  }

  if (!comment) {
    showValidationError(commentError, commentInput, 'Comment is required.');
    isValid = false;
  }

  return isValid;
}

function showValidationError(errorElement, inputElement, message) {
  errorElement.textContent = message;
  inputElement.classList.add('connect__input--invalid');
}

function clearValidationErrors() {
  const { emailInput, commentInput, emailError, commentError } = elements;

  emailError.textContent = '';
  commentError.textContent = '';
  emailInput.classList.remove('connect__input--invalid');
  commentInput.classList.remove('connect__input--invalid');
}

function showModalSuccess(title, message) {
  Swal.fire({
    icon: 'success',
    title,
    text: message,
    background: '#1c1d20',
    color: 'white',
    customClass: {
      popup: 'custom-popup',
      title: 'custom-title',
      htmlContainer: 'custom-text',
      confirmButton: 'custom-button',
    },
  });
}

function showModalError(message) {
  Swal.fire({
    icon: 'error',
    title: 'Oops',
    text: message,
    background: '#1c1d20',
    color: 'white',
    customClass: {
      confirmButton: 'connect__button-modal',
    },
  });
}

function showModalLoading() {
  Swal.fire({
    title: 'Sending...',
    background: '#1c1d20',
    color: 'white',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
    customClass: {
      popup: 'custom-popup',
      title: 'custom-title',
      confirmButton: 'custom-button',
    },
  });
}

function showModalNoConnection() {
  Swal.fire({
    icon: 'warning',
    title: 'No Internet Connection',
    text: 'Please check your connection and try again.',
    background: '#1c1d20',
    color: 'white',
    customClass: {
      popup: 'custom-popup',
      title: 'custom-title',
      htmlContainer: 'custom-text',
      confirmButton: 'custom-button',
    },
  });
}
