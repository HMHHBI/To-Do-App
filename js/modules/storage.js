// storage.js
const STORAGE_KEY = "todo-history";

export function getHistory() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveHistory(history) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
