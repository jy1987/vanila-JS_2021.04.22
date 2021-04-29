const randForm = document.querySelector(".js-random");
const geneRand = randForm.querySelector(".js-random__generate");
const submitForm = document.querySelector(".js-random__submit");
const input = randForm.querySelector(".handle");
const MyInput = submitForm.querySelector("input");
const h5 = submitForm.querySelector(".result");
const p = submitForm.querySelector(".win");

const MyNum = "mynumber";
const comNum = "computerNumber";
let randFactor = Date.now();

input.addEventListener("input", getRange);

function getRange(e) {
  const target = e.target;
  const maxNum = target.value;
  localStorage.setItem(comNum, maxNum);
  geneRand.innerText = `Generate a number between 0 and ${maxNum}`;
}

function makeRand() {
  const limitNum = localStorage.getItem(comNum);
  const randInput = randFactor;
  const randNum = Math.ceil(Math.random(randInput) * limitNum);

  return randNum;
}

function saveNum(num) {
  localStorage.setItem(MyNum, num);
}

function handleSubmit(e) {
  e.preventDefault();
  const currentNum = parseInt(MyInput.value);
  saveNum(currentNum);
  const randValue = makeRand();
  console.log(currentNum);
  console.log(randValue);
  if (isNaN(currentNum)) {
    h5.innerText = "you should input any number";
  } else {
    h5.innerText = `you chose: ${currentNum}, the machine: ${randValue}`;

    if (currentNum !== randValue) {
      p.innerText = "You Lose...";
    } else if (currentNum === randValue) {
      p.innerText = "You Win !!!";
    }
  }
}
function submitNum() {
  const moveBtn = document.querySelector("button");
  moveBtn.addEventListener("click", handleSubmit);
}

function init() {
  submitNum();
}
init();

/* Game Solution 
const range = document.getElementById("js-range");
const title = document.querySelector(".js-title");
const guessForm = document.getElementById("js-guess");
const result = document.getElementById("js-result");

function handleRangeChange(e) {
  const selectedRange = title.querySelector("span");
  selectedRange.innerHTML = range.value;
}

function handleGuessSubmit(e) {
  e.preventDefault();
  const guessInput = guessForm.querySelector("input");
  if (guessInput.value === "") {
    return;
  }
  const max = range.value;
  const random = Math.ceil(Math.random() * max);
  const userGuess = parseInt(guessInput.value, 10);
  const resultSpan = result.querySelector("span");
  resultSpan.innerHTML = `
  You chose: ${userGuess},
  the machine chose: ${random}.<br />
  <strong>${userGuess === random ? "You won!" : "You lost!"}</strong>
  `;
}

guessForm.addEventListener("submit", handleGuessSubmit);
range.addEventListener("input", handleRangeChange); */
