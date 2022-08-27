const inputElement = document.getElementById("addNewTaskInput");
const toDoListElement = document.getElementById("toDoList");
const completedListElement = document.getElementById("completedList");
const labelToDoElement = document.getElementById("todolabel");

const moveItemToCompletedList = (event) => {
  const checkBox = event.target; // tinta evenimentului / locatia / destinatia
  const parentLi = checkBox.parentElement; // parintele elementulu in DOM (li)
  toDoListElement.removeChild(parentLi);
  completedListElement.append(parentLi);
};

const createNewToDoListElement = (value) => {
  const newItem = document.createElement("li");
  newItem.innerText = value;
  newItem.classList.add("listElement");
  newItem.classList.add("text");

  const itemCheckbox = document.createElement("input");
  itemCheckbox.type = "checkbox";
  itemCheckbox.addEventListener("click", () => {
    // Echivalent cu: addEventListener("click", moveItemToCompletedList);
    toDoListElement.removeChild(newItem);
    itemCheckbox.disabled = true;
    newItem.style.textDecoration = "line-through";

    completedListElement.append(newItem);
    updateToDoLabel();
  });

  newItem.prepend(itemCheckbox);

  return newItem;
};

const addNewToDoListElement = (newItem) => {
  toDoListElement.appendChild(newItem);
};

const handleKeyDown = (event) => {
  if (event.key === "Enter") {
    const newItem = createNewToDoListElement(inputElement.value);
    addNewToDoListElement(newItem);
    inputElement.value = ""; // Sterge textul din input dupa ce l-am salvat intr-un todo item
    updateToDoLabel();
  }
};

const updateToDoLabel = () => {
  if (toDoListElement.childElementCount === 0) {
    labelToDoElement.classList.add("toDoLabel");
  } else {
    labelToDoElement.classList.remove("toDoLabel");
  }
};

inputElement.addEventListener("keydown", handleKeyDown);
updateToDoLabel();
