// function memoize(fn) {
//   //
//   const cache = new Map();
//   return (...args) => {
//     const key = JSON.stringify(args);
//     if (cache.has(key)) {
//       return cache.get(key);
//     }
//     const result = fn(...args);
//     cache.set(key, result);
//     return result;
//   };
// }

// // Объект calculator не меняем
// const calculator = {
//   power(num, exponent = 2) {
//     return Math.pow(num, exponent);
//   },
//   fibonacci(n) {
//     if (n <= 1) return n;
//     return this.fibonacci(n - 1) + this.fibonacci(n - 2);
//   },
//   factorial(n) {
//     return n === 0 ? 1 : n * this.factorial(n - 1);
//   },
// };

// function a(data) {
//   const { methodName, args } = JSON.parse(data.toString());
//   const memoFunc = memoize(calculator[methodName]);
//   console.log(memoFunc(...args)); // рассчет
//   console.log(memoFunc(...args)); // должны получить из кэша
// }
// a(`{"methodName": "factorial", "args": [5]}`);
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

    div.append(label);
    label.append(input);
    input.id = `${String(i)}`;
    label.htmlFor = `${String(i++)}`;
    div.append(document.createElement("br"));
  }
});
btnRemove.addEventListener("click", () => {
  const arrayOfInputs = div.querySelectorAll("input");
  for (const element of arrayOfInputs) {
    if (element.checked) {
      element.parentElement.nextSibling.remove();
      element.parentElement.remove();

      // document.querySelector(`label[for ="[${element.name}]"`).remove();
    }
  }
});
