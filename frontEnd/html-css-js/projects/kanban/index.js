let count = 1;
const btnCreate = document.querySelector("#create");
btnCreate.addEventListener("click", addTask);
const inputText = document.querySelector("#tarefa");

const toDoContainer = document.querySelector("#toDo");
const kanbanItens = document.querySelectorAll(".list");
kanbanItens.forEach((item) => {
  item.addEventListener("dragover", dragCan);
  item.addEventListener("drop", dragEnd);
});

function addTask(e) {
  e.preventDefault();
  let text = inputText.value.trim();
  if (!text) return;
  let li = createLI(text);
  let ul = toDoContainer.querySelector(".list");
  ul.append(li);
  console.log(text, li, ul);
  inputText.value = "";
  return;
}

function createLI(text) {
  let li = document.createElement("li");
  li.draggable = "true";
  li.addEventListener("dragstart", dragInit);
  li.id = `tarefa-${count}`;
  count++;
  li.textContent = text;
  return li;
}

function dragInit(e) {
  e.dataTransfer.setData("text", e.target.id);
  e.target.draggable = "true";
}

function dragEnd(e) {
  e.preventDefault();
  let data = e.dataTransfer.getData("text");

  let elementoArrastado = document.getElementById(data);

  if (e.target.classList.contains("list")) {
    e.target.appendChild(elementoArrastado);
  } else {
    let ul = e.target.closest(".list");
    if (ul) ul.appendChild(elementoArrastado);
  }
}

function dragCan(e) {
  e.preventDefault(); // Impede o comportamento padrão
}
