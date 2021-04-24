const form = document.querySelector(".js-form");
const input = form.querySelector("input");

const USER_LS = "currentUser";

function loadName() {
  const currentName = localStorage.getItem(USER_LS);
  if (currentName === null) {
  } else {
  }
}
function init() {}

init();
