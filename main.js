const div = document.querySelector(".todolist");
const btnAdd = document.querySelector(".addTodo");
const btnRemove = document.querySelector(".removeTodo");
const burger = document.querySelector(".burger");
const point = document.querySelector(".menu img");
const buttons = document.querySelector(".buttons");
const array = Array.from(div.querySelectorAll(".task"));
const tasks = Array.from(div.querySelectorAll(".task"));
let a = 0;
function getObj() {
  a = Array.from(document.querySelectorAll(".task")).map((val) => {
    return {
      element: "div",
      className: val.className,
      pr: val.getAttribute("pr"),
      id: val.querySelector("input").getAttribute("id"),
      info: `${val.querySelector("label").textContent}`,
    };
  });
  localStorage.setItem("tasks", JSON.stringify(a));
}

array.forEach(
  (val) =>
    (val.style.marginLeft = `${
      (100 -
        (Math.max(
          document.body.scrollWidth,
          document.documentElement.scrollWidth
        ) *
          0.1) /
          2 +
        73) /
      10
    }rem`)
);

window.addEventListener("resize", () => {
  if (
    Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) >
    393
  ) {
    buttons.style.marginLeft = `${
      (100 -
        (Math.max(
          document.body.scrollWidth,
          document.documentElement.scrollWidth
        ) *
          0.1) /
          2) /
      10
    }rem`;
    const array = Array.from(div.querySelectorAll(".task"));
    array.forEach(
      (val) =>
        (val.style.marginLeft = `${
          (100 -
            (Math.max(
              document.body.scrollWidth,
              document.documentElement.scrollWidth
            ) *
              0.1) /
              2 +
            73) /
          10
        }rem`)
    );
  }
});
function makepr(priority, prior) {
  prior = Number(prior);
  if (prior === 1) {
    priority.style.backgroundColor = "#57FF57";
  } else if (prior === 2) {
    priority.style.backgroundColor = "#338033";
  } else if (prior === 3) {
    priority.style.backgroundColor = "#DADA26";
  } else if (prior === 4) {
    priority.style.backgroundColor = "#E69E1A";
  } else if (prior === 5) {
    priority.style.backgroundColor = "#D03030";
  }
}
function makeElFromObg(obj) {
  const elem = document.createElement(`div`);
  const label = document.createElement("label");
  const input = document.createElement("input");
  const prior = document.createElement("div");
  input.setAttribute("id", obj.id);
  prior.className = "prior";
  elem.className = `${obj.className}`;
  elem.setAttribute("pr", `${obj.pr}`);
  input.type = "checkbox";
  label.textContent = obj.info;
  label.setAttribute("for", obj.id);
  elem.append(input);
  elem.append(label);
  elem.append(prior);
  makepr(prior, obj.pr);
  return elem;
}
let i = 1;
function renderTodos() {
  const arr = JSON.parse(localStorage.getItem("tasks")) || [];

  for (const element of arr) {
    div.append(makeElFromObg(element));
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
  localStorage.setItem("todos", JSON.stringify(array));
  getObj();
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
  getObj();
});
renderTodos();
