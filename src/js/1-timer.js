// Imports
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Elements
const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

// Variables
let userSelectedDate = null;
let countdownInterval = null;

// Flatpickr options
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (!selectedDate) {
      return;
    }

    console.log('Selected date:', selectedDate);

    // Check if selected date is in the future
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#EF4040',
        titleColor: '#fff',
        messageColor: '#fff',
        iconColor: '#fff',
        progressBarColor: '#fff',
        close: false,
        closeOnEscape: true,
        closeOnClick: true,
        timeout: 4000,
      });
      startButton.disabled = true;
      userSelectedDate = null;
      return;
    }

    // Valid date selected
    userSelectedDate = selectedDate;
    startButton.disabled = false;

    console.log('Valid date selected:', userSelectedDate);
  },
};

// Initialize flatpickr - ВАЖЛИВО: ініціалізувати після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
  flatpickr(dateTimePicker, options);
});

// Start button click handler
startButton.addEventListener('click', startCountdown);

function startCountdown() {
  if (!userSelectedDate) {
    console.log('No date selected');
    return;
  }

  console.log('Starting countdown to:', userSelectedDate);

  // Disable controls
  startButton.disabled = true;
  dateTimePicker.disabled = true;

  // Start countdown
  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const targetTime = userSelectedDate.getTime();
    const timeDifference = targetTime - now;

    console.log('Time difference:', timeDifference);

    if (timeDifference <= 0) {
      // Countdown finished
      clearInterval(countdownInterval);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });

      // Re-enable input for next countdown
      dateTimePicker.disabled = false;
      userSelectedDate = null;

      iziToast.info({
        title: 'Finished',
        message: 'Countdown has ended!',
        position: 'topRight',
      });

      console.log('Countdown finished');
      return;
    }

    // Calculate and display remaining time
    const timeComponents = convertMs(timeDifference);
    updateTimerDisplay(timeComponents);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

// Initial timer display
updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });

// iziToast configuration
iziToast.settings({
  timeout: 4000,
  resetOnHover: true,
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});
