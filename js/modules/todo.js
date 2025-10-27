// js/modules/todo.js
import { getHistory, saveHistory } from "./storage.js";
import { addCategoryToNav } from "../main.js"; // ✅ import function from main.js

function emitUpdate() {
  document.dispatchEvent(new CustomEvent("todosUpdated"));
}

export function saveToHistory(text, categorySelect, customCategoryInput) {
  const history = getHistory();

  const selectedCategory =
    categorySelect && categorySelect.value === "Custom"
      ? customCategoryInput?.value.trim() || "Uncategorized"
      : categorySelect?.value || "Uncategorized";

  const todo = {
    id: Date.now().toString(), // stable unique id
    text,
    category: selectedCategory,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  history.push(todo);
  saveHistory(history);

  // persist category (existing code)
  const CATEGORIES_KEY = "todo-categories";
  let categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY)) || [];
  if (!categories.includes(selectedCategory)) {
    categories.push(selectedCategory);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    // addCategoryToNav will be triggered on page rebuild; optional immediate add could be done elsewhere

    // ✅ Add new category to nav immediately
    addCategoryToNav(selectedCategory);
  }

  emitUpdate();
}

// toggle using id
export function toggleCompleteById(id) {
  const history = getHistory();
  const idx = history.findIndex((t) => t.id === id);
  if (idx === -1) return;
  history[idx].completed = !history[idx].completed;
  saveHistory(history);
  emitUpdate();
}

// delete using id
export function deleteTodoById(id) {
  const history = getHistory();
  const idx = history.findIndex((t) => t.id === id);
  if (idx === -1) return;
  history.splice(idx, 1);
  saveHistory(history);
  emitUpdate();
}

// edit using id
export function editTodoById(id, newText) {
  const history = getHistory();
  const idx = history.findIndex((t) => t.id === id);
  if (idx === -1) return;
  history[idx].text = newText;
  saveHistory(history);
  emitUpdate();
}
