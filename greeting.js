const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add("showing");
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove("showing");
  greeting.classList.add("showing");
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentName = localStorage.getItem(USER_LS);
  if (currentName === null) {
    askForName();
  } else {
    paintGreeting(currentName);
  }
}
function init() {
  loadName();
}
init();
