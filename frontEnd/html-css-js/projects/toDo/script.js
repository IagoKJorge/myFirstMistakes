const btnPlus = document.querySelector(".plus");
const nameTask = document.getElementById("nameTask");
const btnClear = document.querySelector(".clear");
const pesquisar = document.getElementById("pesquisar");
const editTask = document.querySelector(".editTask");
const addTask = document.querySelector(".addTask");
const select = document.querySelector("select");
const list = document.querySelector("ul");
let arrTasks = [];
let allLi = document.getElementsByTagName("li");
let cancelEdit = document.querySelector(".cancelEdit");

cancelEdit.addEventListener("click", function () {
  addTask.classList.remove("displayNone");
  editTask.classList.add("displayNone");
  nameTask.focus()
});

renderList();

btnClear.addEventListener("click", () => {
  pesquisar.value = "";
  pesquisar.focus();
  searchFn();
});

pesquisar.addEventListener("input", searchFn);

btnPlus.addEventListener("click", addTaskFn);

select.addEventListener("change", function (ev) {
  const valor = ev.target.value; // valor da option selecionada
  if (valor == "") {
    arrTasks.forEach((obj, idx) => {
      allLi[idx].style.display = "flex";
    });
  } else {
    arrTasks.forEach((obj, idx) => {
      if (
        (obj.completed && valor == "true") ||
        (!obj.completed && valor == "false")
      ) {
        allLi[idx].style.display = "flex";
      } else {
        allLi[idx].style.display = "none";
      }
    });
  }
});

function setStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return;
}

function addLi(obj) {
  arrTasks.push(obj);
  let idx = arrTasks.length - 1;
  // Criar <li>
  const li = document.createElement("li");
  li.classList.add("task");
  li.dataset.idx = idx;
  li.style.backgroundColor = arrTasks[idx].completed ? "#385269" : "initial";
  // Botão check
  const btnCheck = document.createElement("button");
  btnCheck.classList.add("btn", "check");
  const iconCheck = document.createElement("i");
  iconCheck.classList.add("bi", "bi-check-lg");
  btnCheck.appendChild(iconCheck);
  btnCheck.addEventListener("click", checkFn);
  // Texto da tarefa
  const p = document.createElement("p");
  p.classList.add("taskText");
  p.textContent = obj.nome;
  p.style.textDecoration = arrTasks[idx].completed ? "line-through" : "initial";

  // Div com botões de editar e fechar
  const div = document.createElement("div");

  const btnEdit = document.createElement("button");
  btnEdit.classList.add("btn", "edit");
  const iconEdit = document.createElement("i");
  iconEdit.classList.add("bi", "bi-pencil-fill");
  btnEdit.appendChild(iconEdit);
  btnEdit.addEventListener("click", editFn);

  const btnClose = document.createElement("button");
  btnClose.classList.add("btn", "close");
  const iconClose = document.createElement("i");
  iconClose.classList.add("bi", "bi-x-lg");
  btnClose.appendChild(iconClose);
  btnClose.addEventListener("click", closeFn);

  div.appendChild(btnEdit);
  div.appendChild(btnClose);

  // Montar estrutura
  li.appendChild(btnCheck);
  li.appendChild(p);
  li.appendChild(div);

  list.append(li);

  return;
}

function renderList() {
  JSON.parse(localStorage.getItem("tasks")).forEach((obj) => addLi(obj));
}

function searchFn() {
  const regex = new RegExp(pesquisar.value, "i"); // 'i' = case-insensitive
  arrTasks.forEach((obj, idx) => {
    if (!regex.test(obj.nome)) {
      allLi[idx].style.display = "none";
    } else {
      allLi[idx].style.display = "flex";
    }
  });
}

function addTaskFn(ev) {
  ev.preventDefault();
  if (nameTask.value.trim().length === 0) return;
  addLi({ nome: nameTask.value.trim(), completed: false });
  setStorage(arrTasks);
  nameTask.value = "";
  nameTask.focus();
  return;
}

function checkFn(ev) {
  if (!editTask.classList.contains("displayNone")) return;
  let li = ev.target.closest("li");
  let taskText = li.querySelector(".taskText");
  let idx = li.dataset.idx;
  taskText.style.textDecoration = !arrTasks[idx].completed
    ? "line-through"
    : "initial";
  li.style.backgroundColor = !arrTasks[idx].completed ? "#385269" : "initial";

  arrTasks[idx].completed = !arrTasks[idx].completed;
  setStorage(arrTasks);
  return;
}

function closeFn(ev) {
  if (!editTask.classList.contains("displayNone")) return;
  let li = ev.target.closest("li");
  let idx = li.dataset.idx;

  arrTasks = arrTasks.splice(idx, 1);
  li.remove();
  console.log(arrTasks);
  setStorage(arrTasks);
  console.log(localStorage.getItem("tasks"));
  return;
}

function editFn(ev) {
  console.log("a");
  if (!editTask.classList.contains("displayNone")) return;

  let li = ev.target.closest("li");
  let idx = li.dataset.idx;
  if (arrTasks[idx].completed) return;

  let newNameTaskBtn = document.querySelector(".newNameTaskBtn");
  let newNameTaskInput = document.querySelector("#newNameTask");

  newNameTaskInput.value = arrTasks[idx].nome;

  addTask.classList.add("displayNone");
  editTask.classList.remove("displayNone");

  newNameTaskInput.focus();

  newNameTaskBtn.addEventListener("click", (ev) => {
    ev.preventDefault();
    newNameTaskInput.focus();
    let newText = newNameTaskInput.value.trim();
    let oldText = li.querySelector(".taskText");

    oldText.textContent = newText.length > 0 ? newText : oldText.textContent;
    arrTasks[idx].nome = oldText.textContent;

    addTask.classList.remove("displayNone");
    editTask.classList.add("displayNone");

    nameTask.focus();
    setStorage(arrTasks);
  });
}
