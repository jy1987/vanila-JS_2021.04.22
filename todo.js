const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
const finishedList = document.querySelector(".js-finishedList");

const TODOS_LS = "todos";
const FINISHED_LS = "finishedDos";
let toDos = [];
let finishedDos = [];
let idNumbers = Date.now();

function deleteToDo(e) {
  const btn = e.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function deleteFinished(e) {
  const btn = e.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanToDos = finishedDos.filter(function (finish) {
    return finish.id !== parseInt(li.id);
  });
  finishedDos = cleanToDos;
  saveFinished();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
function saveFinished() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finishedDos));
}

function backToDo(e) {
  const btn = e.target;
  const id = btn.parentNode;
  const targetObj = finishedDos.find((todo) => todo.id == id.id);

  const backText = targetObj.text;
  const li = document.createElement("li");
  const deleteBtn = document.createElement("button");
  const moveBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = id.id;

  deleteBtn.innerText = "🚫";
  moveBtn.innerText = "✅";
  deleteBtn.addEventListener("click", deleteToDo);
  moveBtn.addEventListener("click", moveToDo);
  span.innerText = backText;
  li.appendChild(span);
  li.appendChild(deleteBtn);
  li.appendChild(moveBtn);
  li.id = newId;
  console.log(li.id);
  toDoList.appendChild(li);
  const toDoObj = {
    text: backText,
    id: parseInt(newId),
  };
  toDos.push(toDoObj);
  saveToDos();

  finishedList.removeChild(id);
  const cleanFinished = finishedDos.filter(function (toDo) {
    return toDo.id !== parseInt(id.id);
  });
  finishedDos = cleanFinished;
  saveFinished();
}

function paintFinish(text, moveId) {
  const li = document.createElement("li");
  const deleteBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = moveId;
  console.log(newId);
  deleteBtn.innerText = "🚫";
  backBtn.innerText = "⬅️";
  deleteBtn.addEventListener("click", deleteFinished);
  backBtn.addEventListener("click", backToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(deleteBtn);
  li.appendChild(backBtn);
  li.id = newId;
  finishedList.appendChild(li);

  const finishedObj = {
    text: text,
    id: moveId,
  };
  finishedDos.push(finishedObj);
  saveFinished();
  console.log(finishedDos);
}

function moveToDo(e) {
  const btn = e.target;
  const id = btn.parentNode;
  const targetObj = toDos.find((todo) => todo.id == id.id);
  const moveText = targetObj.text;
  const moveId = targetObj.id;
  paintFinish(moveText, moveId);

  toDoList.removeChild(id);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(id.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function paintToDo(text) {
  const li = document.createElement("li");
  const deleteBtn = document.createElement("button");
  const moveBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = idNumbers;

  deleteBtn.innerText = "🚫";
  moveBtn.innerText = "✅";
  deleteBtn.addEventListener("click", deleteToDo);
  moveBtn.addEventListener("click", moveToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(deleteBtn);
  li.appendChild(moveBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };

  toDos.push(toDoObj);
  saveToDos();
  idNumbers += 1;
}

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function loadFinished() {
  const loadedFinished = localStorage.getItem(FINISHED_LS);
  if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function (finish) {
      paintFinish(finish.text, finish.id);
    });
  }
}

loadFinished();
loadToDos();
toDoForm.addEventListener("submit", handleSubmit);

/* 과제 정답 .
const pendingList = document.getElementById("js-pending"),
  finishedList = document.getElementById("js-finished"),
  form = document.getElementById("js-form"),
  input = form.querySelector("input");

const PENDING = "PENDING";
const FINISHED = "FINISHED";

let pendingTasks, finishedTasks;

function getTaskObject(text) {
  return {
    id: String(Date.now()),
    text
  };
}

function savePendingTask(task) {
  pendingTasks.push(task);
}

function findInFinished(taskId) {
  return finishedTasks.find(function(task) {
    return task.id === taskId;
  });
}

function findInPending(taskId) {
  return pendingTasks.find(function(task) {
    return task.id === taskId;
  });
}

function removeFromPending(taskId) {
  pendingTasks = pendingTasks.filter(function(task) {
    return task.id !== taskId;
  });
}

function removeFromFinished(taskId) {
  finishedTasks = finishedTasks.filter(function(task) {
    return task.id !== taskId;
  });
}

function addToFinished(task) {
  finishedTasks.push(task);
}

function addToPending(task) {
  pendingTasks.push(task);
}

function deleteTask(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  removeFromFinished(li.id);
  removeFromPending(li.id);
  saveState();
}

function handleFinishClick(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInPending(li.id);
  removeFromPending(li.id);
  addToFinished(task);
  paintFinishedTask(task);
  saveState();
}

function handleBackClick(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInFinished(li.id);
  removeFromFinished(li.id);
  addToPending(task);
  paintPendingTask(task);
  saveState();
}

function buildGenericLi(task) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  span.innerText = task.text;
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", deleteTask);
  li.append(span, deleteBtn);
  li.id = task.id;
  return li;
}

function paintPendingTask(task) {
  const genericLi = buildGenericLi(task);
  const completeBtn = document.createElement("button");
  completeBtn.innerText = "✅";
  completeBtn.addEventListener("click", handleFinishClick);
  genericLi.append(completeBtn);
  pendingList.append(genericLi);
}

function paintFinishedTask(task) {
  const genericLi = buildGenericLi(task);
  const backBtn = document.createElement("button");
  backBtn.innerText = "⏪";
  backBtn.addEventListener("click", handleBackClick);
  genericLi.append(backBtn);
  finishedList.append(genericLi);
}

function saveState() {
  localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
  localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
}

function loadState() {
  pendingTasks = JSON.parse(localStorage.getItem(PENDING)) || [];
  finishedTasks = JSON.parse(localStorage.getItem(FINISHED)) || [];
}

function restoreState() {
  pendingTasks.forEach(function(task) {
    paintPendingTask(task);
  });
  finishedTasks.forEach(function(task) {
    paintFinishedTask(task);
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const taskObj = getTaskObject(input.value);
  input.value = "";
  paintPendingTask(taskObj);
  savePendingTask(taskObj);
  saveState();
}

function init() {
  form.addEventListener("submit", handleFormSubmit);
  loadState();
  restoreState();
}
init(); */
