const div = document.querySelector(".todolist");
const btnAdd = document.querySelector(".addTodo");
const btnRemove = document.querySelector(".removeTodo");
const burger = document.querySelector(".burger");
const point = document.querySelector(".menu img");
console.log(point);
let i = 1;
function renderTodos() {
  const arr = JSON.parse(localStorage.getItem("todos")) || [];
  console.log(arr);
  for (const element of arr) {
    div.append(element);
  }
}
burger.addEventListener("mouseover", () => {
  Array.from(burger.querySelectorAll("hr")).forEach(
    (val) => (val.style.borderColor = "#828282ff")
  );
});
burger.addEventListener("mouseout", () => {
  Array.from(burger.querySelectorAll("hr")).forEach(
    (val) => (val.style.borderColor = "#ffffffff")
  );
});
point.addEventListener("click", () => {
  document.querySelector(".menu").style.transform = "translateX(-100%)";
});
burger.addEventListener("click", () => {
  document.querySelector(".menu").style.transform = "translateX(100%)";
});
function whatPriotity(priority) {
  const prior = +prompt("Введите приоритет от 1 до 5 включительно");
  if (prior === 1) {
    priority.style.backgroundColor = "#57FF57";
    priority.parentElement.setAttribute("pr", prior);
  } else if (prior === 2) {
    priority.style.backgroundColor = "#338033";
    priority.parentElement.setAttribute("pr", prior);
  } else if (prior === 3) {
    priority.parentElement.setAttribute("pr", prior);
    priority.style.backgroundColor = "#DADA26";
  } else if (prior === 4) {
    priority.parentElement.setAttribute("pr", prior);
    priority.style.backgroundColor = "#E69E1A";
  } else if (prior === 5) {
    priority.parentElement.setAttribute("pr", prior);
    priority.style.backgroundColor = "#D03030";
  } else {
    alert("Вводить нужно от 1 до 5!");
    whatPriotity(priority);
  }
}
function sortByPrior(task) {
  div.append(task);
  const array = Array.from(div.querySelectorAll(".task"));
  array.sort((a, b) => b.getAttribute("pr") - a.getAttribute("pr"));
  for (const element of array) {
    div.append(element);
  }
  console.log(array);
  localStorage.setItem("todos", JSON.stringify(array));
}
btnAdd.addEventListener("click", () => {
  const inputOfUser = prompt("Введите название заметки").trim();
  if (inputOfUser) {
    const priority = document.createElement("div");
    priority.className = "prior";
    const input = document.createElement("input");
    const label = document.createElement("label");
    input.type = "checkbox";
    label.textContent = `${inputOfUser}`;
    const task = document.createElement("div");
    task.className = "task";
    task.append(input);
    task.append(label);
    task.append(priority);
    input.id = `${String(i)}`;
    label.htmlFor = `${String(i++)}`;
    whatPriotity(priority);
    sortByPrior(task);
  }
});
btnRemove.addEventListener("click", () => {
  const arrayOfInputs = div.querySelectorAll("input");
  for (const element of arrayOfInputs) {
    if (element.checked) {
      div.querySelector(`label[for ="${element.id}"]`).remove();
      element.parentElement.remove();
    }
  }
  const array = Array.from(div.querySelectorAll(".task"));
  localStorage.setItem("todos", JSON.stringify(array));
  console.log(JSON.stringify(array));
});
renderTodos();
