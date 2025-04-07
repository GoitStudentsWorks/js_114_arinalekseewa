import Accordion from 'accordion-js';

new Accordion('.faq-list', {
  duration: 400,
  showMultiple: true,
  onToggle: function (event) {
    const button = event.target.closest('.questions');
    if (button) {
      button.classList.toggle('is-active');
    }
  },
});




