// js/main.js
import { saveToHistory, editTodoById } from "./modules/todo.js";
import { displayHistory } from "./modules/display.js";
import { clearHistory } from "./modules/storage.js";
import { filterTodos } from "./modules/search.js";

const input = document.querySelector(".display");
const addBtn = document.querySelector(".add-btn");
const clearHistoryBtn = document.querySelector(".clear-history");
const searchInput = document.getElementById("search-input");
const categorySelect = document.querySelector(".category-select");
const customCategoryInput = document.querySelector(".custom-category-input");
const navLinks = document.querySelector(".nav-links");

let editModeId = null; // track which todo is being edited

// ✅ Add or Edit todo
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  if (editModeId) {
    // Update existing todo
    editTodoById(editModeId, text);
    editModeId = null;
    addBtn.textContent = "Add Todo";
  } else {
    // Save new todo
    saveToHistory(text, categorySelect, customCategoryInput);
  }

  input.value = "";
});

// Clear all todos
clearHistoryBtn.addEventListener("click", () => {
  clearHistory();
  displayHistory();
});

// Search filtering
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  filterTodos(searchTerm);
});

// ✅ Rebuild saved categories on load
const CATEGORIES_KEY = "todo-categories";
const savedCategories = JSON.parse(localStorage.getItem(CATEGORIES_KEY)) || [];

savedCategories.forEach((cat) => addCategoryToNav(cat));

// ✅ Add a category link dynamically (used both on load & new add)
export function addCategoryToNav(category) {
  const exists = Array.from(navLinks.querySelectorAll("a")).some(
    (a) => a.textContent.trim() === category
  );
  if (exists) return;

  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = "#";
  a.textContent = category;
  a.addEventListener("click", (e) => {
    e.preventDefault();
    displayHistory(category);
    document.querySelector(".todo-heading").textContent = category;
  });
  li.appendChild(a);
  navLinks.appendChild(li);
}

// ✅ Listen for “startEdit” event from display.js
document.addEventListener("startEdit", (e) => {
  input.value = e.detail.text;
  editModeId = e.detail.id;
  addBtn.textContent = "Update Todo";
});

// Initial render
displayHistory();
