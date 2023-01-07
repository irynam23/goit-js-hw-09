import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let choosenTime = null;
let timer = null;
const dateInput = document.querySelector('#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const startButton = document.querySelector('[data-start]');
startButton.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choosenTime = selectedDates[0].getTime();
    if (choosenTime < Date.now()) {
      startButton.disabled = true;
      Notify.failure('Please choose a date in the future');
      return;
    }
    startButton.disabled = false;
  },
};

startButton.addEventListener('click', onStartButtonClick);

flatpickr(dateInput, options);

function onStartButtonClick() {
  startButton.disabled = true;
  timer = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = choosenTime - currentTime;
    const convertedTime = convertMs(deltaTime);
    days.textContent = convertedTime.days;
    hours.textContent = convertedTime.hours;
    minutes.textContent = convertedTime.minutes;
    seconds.textContent = convertedTime.seconds;
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
