// Input box
const inputTodo = document.querySelector(".inputTodo");
const editTodo = document.querySelector(".editTodo");

// Button
const addTodo = document.querySelector(".addTodo");
const editModalBtn = document.querySelector(".editModalBtn");

// Display Todo List in this Section
const todoListContainer = document.querySelector(".todolist");

// Success Modal
const messageModal = document.querySelector(".messageModal");

let newInputValue;

const changeToCapitalLetter = (inputTodoText) => {
  const todoValue = inputTodoText;
  const todoValueCopy = todoValue.slice(1);
  newInputValue = todoValue[0].toUpperCase() + todoValueCopy;
};

const messageModalTimer = (message, color) => {
  messageModal.innerHTML = `Great! You ${message} it successfully`;
  messageModal.style.backgroundColor = color;
  setTimeout(() => {
    messageModal.classList.remove("showMessageModal");
  }, 2000);
};

const displayTodoList = () => {
  addTodo.addEventListener("click", (e) => {
    templateDisplay(e);
    messageModalTimer("added", "#38b67b");
    holder(messageModal, "classList", "showMessageModal");
    storeData();
  });

  document.body.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      templateDisplay(e);
      messageModalTimer("added", "#a9ebab");
      holder(messageModal, "classList", "showMessageModal");
      storeData();
    }
  });
};
displayTodoList();

// Template
const templateDisplay = (e) => {
  e.preventDefault();
  changeToCapitalLetter(inputTodo.value);

  // Get time to display in todo list container
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-us", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const template = `<div class="list">
              <input type="checkbox" class="doneTodo">
              <div class="todoText">
                <span>${today.format(date)}</span>
                <h2 class="todoInput">${newInputValue}</h2>
                <input type="text" placeholder="Edit Todo" class="editInputTodo"/>
              </div>
              <div class="todoBtn">
                <button class="btn edit">&#x270E</button>
                <button class="btn submit">&#128190</button>
                <button class="btn delete">\u00d7</button>
              </div>
            </div>`;
  todoListContainer.insertAdjacentHTML("afterbegin", template);
  inputTodo.value = "";
  todoElementTraversing();
};

// Edit, Delete, Mark as Done
const todoElementTraversing = () => {
  const divList = todoListContainer.querySelectorAll(".list");
  divList.forEach((el) => {
    const deleteBtn = el.lastElementChild.querySelector(".delete");
    const editBtn = el.lastElementChild.querySelector(".edit");
    deleteBtn.addEventListener("click", () => {
      const parentElementList = deleteBtn.closest(".list");
      parentElementList.style.transform = "translateX(500px)";
      parentElementList.style.transition = "transform .5s";
      setTimeout(() => {
        parentElementList.remove();
        storeData();
      }, 300);

      // parentElementList.remove();
      messageModalTimer("delete", "#ee7682");
      holder(messageModal, "classList", "showMessageModal");
    });

    // Check checbox if one of your todo list is finished
    const checkTodoBtn = el.querySelector(".doneTodo");
    const todoCheckInput =
      el.firstElementChild.nextElementSibling.querySelector(".todoInput");

    checkTodoBtn.addEventListener("click", () => {
      if (checkTodoBtn.checked) {
        checkTodoBtn.setAttribute("checked", "checked");
        holder(todoCheckInput, "textDecoration", "line-through #23272f");
        holder(todoCheckInput, "textDecorationThickness", ".2rem");
        holder(todoCheckInput, "color", "#23272f");
        holder(editBtn, "disabled", true);
        editBtn.disabled = true;
      } else {
        checkTodoBtn.removeAttribute("checked");
        holder(todoCheckInput, "textDecoration", "none");
        holder(todoCheckInput, "color", "#000");
        holder(editBtn, "disabled", false);
        editBtn.disabled = false;
      }
      storeData();
    });

    // Edit specific Todo List
    const changeInputTodo =
      el.firstElementChild.nextElementSibling.querySelector(".todoInput");
    const inputNewTodo =
      el.firstElementChild.nextElementSibling.querySelector(".editInputTodo");
    const submitBtn = el.lastElementChild.querySelector(".submit");
    const checkBoxEl = el.firstElementChild;

    editBtn.addEventListener("click", () => {
      holder(changeInputTodo, "display", "none");
      holder(inputNewTodo, "display", "block");
      holder(editBtn, "display", "none");
      holder(submitBtn, "display", "block");
      holder(checkBoxEl, "display", "none");
      inputNewTodo.value = changeInputTodo.innerText;
    });

    document.body.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        messageModalTimer("update", "#4caf50");
        holder(messageModal, "classList", "showMessageModal");
        holder(changeInputTodo, "display", "block");
        holder(inputNewTodo, "display", "none");
        holder(editBtn, "display", "block");
        holder(submitBtn, "display", "none");
        holder(checkBoxEl, "display", "block");
        changeToCapitalLetter(inputNewTodo.value);
        changeInputTodo.innerText = newInputValue;
        storeData();
      }
    });

    submitBtn.addEventListener("click", () => {
      messageModalTimer("update", "#4caf50");
      holder(messageModal, "classList", "showMessageModal");
      holder(changeInputTodo, "display", "block");
      holder(inputNewTodo, "display", "none");
      holder(editBtn, "display", "block");
      holder(submitBtn, "display", "none");
      holder(checkBoxEl, "display", "block");
      changeToCapitalLetter(inputNewTodo.value);
      changeInputTodo.innerText = newInputValue;
      storeData();
    });
  });
};

const holder = (el, property, value) => {
  if (property === "display") {
    el.style.display = value;
  } else if (property === "textDecoration") {
    el.style.textDecoration = value;
  } else if (property === "textDecorationThickness") {
    el.style.textDecorationThickness = value;
  } else if (property === "color") {
    el.style.color = value;
  } else if (property === "disabled") {
    el.disabled = value;
  } else if (property === "classList") {
    el.classList.add(value);
  }
};

const storeData = () => {
  localStorage.setItem("data", todoListContainer.innerHTML);
};

const displayTodos = () => {
  const data = localStorage.getItem("data");
  data === null
    ? todoListContainer.insertAdjacentHTML("afterbegin", "")
    : todoListContainer.insertAdjacentHTML("afterbegin", data);

  todoElementTraversing();
};
displayTodos();
