const timeContainer = document.querySelector(".js-clock");
const timeClock = timeContainer.querySelector("h2");
const timeColor = ["red", "yellow"];

timeClock.style.color = timeColor[0];

function getTime() {
  // Don't delete this.
  const xmasDay = new Date("2021-12-24:00:00:00+0900");
  const date1 = xmasDay.getTime();
  const today = new Date();
  const date2 = today.getTime();
  const diffTime = date1 - date2;
  const date = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffTime - date * 1000 * 3600 * 24) / (1000 * 3600)
  );
  const minutes = Math.floor(
    (diffTime - date * 1000 * 3600 * 24 - hours * 1000 * 3600) / (1000 * 60)
  );
  const seconds = Math.floor(
    (diffTime -
      date * 1000 * 3600 * 24 -
      hours * 1000 * 3600 -
      minutes * 1000 * 60) /
      1000
  );

  if (seconds % 2 === 0) {
    timeClock.style.color = "pink";
  } else {
    timeClock.style.color = "brown";
  }
  timeClock.innerText = ` ${date < 10 ? `0${date}` : date}d ${
    hours < 10 ? `0${hours}` : hours
  }h ${minutes < 10 ? `0${minutes}` : minutes}m ${
    seconds < 10 ? `0${seconds}` : seconds
  }s `;
}

function init() {
  setInterval(getTime, 1000);
  getTime();
}
init();
