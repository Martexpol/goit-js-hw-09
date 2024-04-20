import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startButton = document.querySelector("button[data-start]");
const myInput = document.querySelector("input#datetime-picker");
const currentDate = new Date();

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      const selectedDate = new Date(selectedDates[0]);

    if (selectedDate <= currentDate) {
        startButton.setAttribute("disabled", "");
        Notify.warning("Please choose a date in the future");
        }
    else {
        startButton.removeAttribute("disabled");
    }
    },
  };

const fp = flatpickr(myInput, options);

function startCountdown() {
    const endDate = flatpickr.parseDate(myInput.value, "Y-m-d H:i");
    const countdownInterval = setInterval(updateCountdown, 1000, endDate);

    function updateCountdown(endDate) {
        const currentDate = new Date();
      const timeDifference = endDate - currentDate;

      if (timeDifference <= 0) {
        clearInterval(countdownInterval);
        updateTimer({days: 0, hours: 0, minutes: 0, seconds: 0});
        return;
      }

      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      updateTimer({ days, hours, minutes, seconds });
    }
  }

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  function updateTimer({ days, hours, minutes, seconds }) {
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
  }

  startButton.addEventListener('click', startCountdown);