function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector('body');

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let isActive = false;
let intervalId = null;

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);
stopBtn.setAttribute('disabled', true);

function onStartClick() {
  isActive = true;
  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');
  setBodyColor();
  intervalId = setInterval(() => {
    setBodyColor();
  }, 1000);
}

function setBodyColor() {
  const color = getRandomHexColor();
  body.style.backgroundColor = color;
}

function onStopClick() {
  isActive = false;
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', true);
  clearInterval(intervalId);
}
