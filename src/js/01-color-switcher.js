function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

const startButton = document.querySelector("button[data-start]");
const stopButton = document.querySelector("button[data-stop]");
let interval = null;

function changeColor () {
    document.body.style.backgroundColor = getRandomHexColor();
}

startButton.addEventListener("click", () => {
    interval = setInterval(changeColor, 1000);
    startButton.setAttribute("disabled", "");
    stopButton.removeAttribute("disabled");
});

stopButton.addEventListener("click", () => {
    clearInterval(interval);
    startButton.removeAttribute("disabled");
    stopButton.setAttribute("disabled", "");
});