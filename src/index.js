// <⚠️ DONT DELETE THIS ⚠️>

const body = document.querySelector("body");
const h2 = document.querySelector("h2");
const backColor = ["red", "yellow", "green", "blue", "pink"];
body.style.backgroundColor = "#ffeaa7";
h2.style.color = "white";

function resizeColor() {
  const windowWidth = window.innerWidth;
  if (windowWidth < 1000 && windowWidth > 800) {
    h2.innerHTML = " It's Red";
    body.style.backgroundColor = backColor[0];
  } else if (windowWidth < 800 && windowWidth > 600) {
    h2.innerHTML = " It's Yellow";
    body.style.backgroundColor = backColor[1];
  } else if (windowWidth < 600 && windowWidth > 400) {
    h2.innerHTML = " It's Green";
    body.style.backgroundColor = backColor[2];
  } else if (windowWidth < 400 && windowWidth > 200) {
    h2.innerHTML = " It's Blue";
    body.style.backgroundColor = backColor[3];
  } else {
    h2.innerHTML = " It's Pink";
    body.style.backgroundColor = backColor[4];
  }
}
function init() {
  window.addEventListener("resize", resizeColor);
}
init();
