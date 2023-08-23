import { Todo } from "./classes/Todo.js";
// finding elements
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const todoLists = document.getElementById("lists");
const messageElement = document.getElementById("message");

// showMessage
const showMessage = (text, status) => {
  messageElement.textContent = text;
  messageElement.classList.add(`bg-${status}`);
  setTimeout(() => {
    messageElement.textContent = "";
    messageElement.classList.remove(`bg-${status}`);
  }, 3000);
};

//create todo
const createTodo = (newTodo) => {
  const todoElement = document.createElement("li");
  todoElement.id = newTodo.todoId;
  todoElement.classList.add("li-style");
  todoElement.innerHTML = `
  <span class="li-text-span"> ${newTodo.todoValue}  </span>
    <span> <button class="btn" id="deleteButton"> <i class="fa-solid fa-trash"></i> </button> </span>
    `;
  todoLists.appendChild(todoElement);

  const deleteButton = todoElement.querySelector("#deleteButton");
  deleteButton.addEventListener("click", deleteTodo);
};

// deleteTodos
const deleteTodo = (event) => {
  const selectedTodo = event.target.parentElement.parentElement.parentElement;
  todoLists.removeChild(selectedTodo);
  showMessage("Todo is deleted successfully.", "danger");

  let todos = getTodosFromLocalStorage();
  todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
  localStorage.setItem("mytodos", JSON.stringify(todos));
};

// getTodosFormLocalStorage
const getTodosFromLocalStorage = () => {
  return localStorage.getItem("mytodos")
    ? JSON.parse(localStorage.getItem("mytodos"))
    : [];
};

// addTodo
const addTodo = (event) => {
  event.preventDefault();
  const todoValue = todoInput.value;

  // unique id
  const todoId = Date.now().toString();

  const newTodo = new Todo(todoId, todoValue);
  createTodo(newTodo);
  showMessage("Todo is created successfully.", "success");

  // add todo to local storage
  const todos = getTodosFromLocalStorage();
  todos.push(newTodo);
  localStorage.setItem("mytodos", JSON.stringify(todos));

  todoInput.value = "";
};

// loadTodos
const loadTodos = () => {
  const todos = getTodosFromLocalStorage();
  todos.map((todo) => createTodo(todo));
};

// add Event Listener
todoForm.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodos);
