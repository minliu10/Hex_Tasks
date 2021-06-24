const btnLists = document.querySelector(".list-btn");
const btnAdd = document.querySelector(".btn-add");
const btnAll = document.querySelector(".abtn-all");
const btnUndone = document.querySelector(".abtn-undone");
const btnDone = document.querySelector(".abtn-done");
const listAll = document.querySelector(".list-all");
const listOthers = document.querySelector(".list-others");
const btnClearUndone = document.querySelector(".clear-undones");
const listBox = document.querySelector(".listbox");

const undonNum = document.querySelector(".undone-num");
let counter = 0;

btnAdd.addEventListener("click", function (e) {
  listBox.classList.remove("hide");
  createTodos();
});

btnAll.addEventListener("click", function (e) {
  selectedItem(btnLists, btnAll.className);
  listAll.childNodes.forEach(function (item) {
    jumpEffect(item);
    item.classList.remove("hide");
  });
});

btnUndone.addEventListener("click", function (e) {
  selectedItem(btnLists, btnUndone.className);

  listAll.childNodes.forEach(function (item) {
    if (item.classList.contains("checked")) {
      item.classList.add("hide");
    } else {
      item.classList.remove("hide");
      jumpEffect(item);
    }
  });
});

btnDone.addEventListener("click", function (e) {
  selectedItem(btnLists, btnDone.className);
  listAll.childNodes.forEach(function (item) {
    if (!item.classList.contains("checked")) {
      item.classList.add("hide");
    } else {
      item.classList.remove("hide");
      jumpEffect(item);
    }
  });
});

btnClearUndone.addEventListener("click", function (e) {
  let checkedTodos = document.querySelectorAll(".checked");
  checkedTodos.forEach(function (item) {
    item.remove();
  });
});

function createTodos() {
  let userInput = document.querySelector(".txt-input");
  let todoText = userInput.value;
  let todo = document.createElement("li");
  if (todoText === "") {
    alert("請輸入資料");
    return;
  }
  addCounter();
  todo.classList.add("todo");
  let btnCheck = document.createElement("button");
  btnCheck.classList.add("btn-check");
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todoText;
  let btnDelete = document.createElement("button");
  btnDelete.classList.add("btn-delete");
  todo.appendChild(btnCheck);
  todo.appendChild(text);
  todo.appendChild(btnDelete);

  listAll.appendChild(todo);

  jumpEffect(todo);

  // 清空輸入
  userInput.value = "";
  let itemBtnCheck = todo.firstChild;
  let itemBtnDelete = todo.lastChild;
  itemBtnCheck.addEventListener("click", btnCheckAction);
  itemBtnDelete.addEventListener("click", btnDeleteAction);
}

function addCounter() {
  counter++;
  undonNum.textContent = counter;
}

function minusCounter() {
  counter--;
  undonNum.textContent = counter;
}

function btnCheckAction(e) {
  // console.log("target", e.target);
  let todoItem = e.target.parentElement;
  todoItem.classList.toggle("checked");

  if (todoItem.classList.contains("checked")) {
    e.target.innerHTML = `<i 
            style="font-size: 10px; color: #ffd370;"
            class="fas fa-check"
          ></i>`;
    minusCounter();
  } else {
    e.target.innerHTML = "";
    addCounter();
  }
}

function btnDeleteAction(e) {
  let todoItem = e.target.parentElement;
  //如果刪到的不是已經被勾選的, 才去減個數
  console.log("todo", todoItem);
  if (!todoItem.classList.contains("checked")) {
    minusCounter();
  }
  todoItem.style.animation = "scaleDown 0.3s forwards";

  todoItem.addEventListener("animationend", function (e) {
    todoItem.remove();
  });
}

function jumpEffect(item) {
  item.style.animation = "scaleUp 0.3s forwards";
  item.addEventListener("animationend", function (e) {
    item.style.animation = "";
  });
}

function selectedItem(btnLists, className) {
  let children = Array.from(btnLists.children);
  children.forEach(function (item) {
    console.log("btnLists", btnLists);
    console.log("ITEM", item);
    if (item.firstChild.classList.contains(className)) {
      item.classList.add("selected");
    } else {
      item.classList.remove("selected");
    }
  });
}
