// Imports
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Elements
const form = document.querySelector('.form');

// Form submit handler
form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  // Get form data
  const formData = new FormData(event.target);
  const delay = parseInt(formData.get('delay'));
  const state = formData.get('state');

  // Validate delay
  if (!delay || delay < 0) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a valid delay value',
      position: 'topRight',
    });
    return;
  }

  // Validate state
  if (!state) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please select a state (Fulfilled or Rejected)',
      position: 'topRight',
    });
    return;
  }

  // Create and handle promise
  createPromise({ delay, state })
    .then(delay => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);

      iziToast.success({
        title: 'OK',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      console.log(`❌ Rejected promise in ${delay}ms`);

      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
}

function createPromise({ delay, state }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

// iziToast configuration
iziToast.settings({
  timeout: 5000,
  resetOnHover: true,
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});
