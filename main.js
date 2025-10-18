const div = document.querySelector(".todolist");
const btnAdd = document.querySelector(".addTodo");
const btnRemove = document.querySelector(".removeTodo");
let i = 1;
btnAdd.addEventListener("click", () => {
  const inputOfUser = prompt("Введите название заметки");
  if (inputOfUser) {
    const input = document.createElement("input");
    const label = document.createElement("label");
    input.type = "checkbox";
    label.textContent = `${inputOfUser}`;
    const task = document.createElement("div");
    task.className = "task";
    task.append(input);
    task.append(label);
    div.append(task);
    input.id = `${String(i)}`;
    label.htmlFor = `${String(i++)}`;
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
});
