// search.js
import { getHistory } from "./storage.js";
import { toggleCompleteById, deleteTodoById } from "./todo.js";
import { applyCategoryTheme } from "./display.js";

const historyContainer = document.querySelector(".todos");

export function filterTodos(searchTerm) {
  const history = getHistory();
  const filtered = history.filter(
    (item) =>
      item.text.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm)
  );

  historyContainer.innerHTML = "";
  filtered.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("todo-item");

    const colors = ["#D09AA8", "#b4f8c8ff", "#FBE7C6", "#F9F6F3", "#FFD6A5"];
    div.style.backgroundColor = colors[index % colors.length];
    div.style.border = "1px solid #5c5c5cff";

    const span = document.createElement("span");
    span.classList.add("indexing");
    span.textContent = `${index + 1}.`;

    const p = document.createElement("p");
    p.classList.add("each-todo-content");
    p.textContent = `${item.text} (${item.category})`;

    const toggleBtn = document.createElement("button");
    toggleBtn.classList.add("toggle-btn");
    toggleBtn.innerHTML = item.completed ? "✅" : "⬜";
    toggleBtn.addEventListener("click", () => toggleCompleteById(item.id));

    const delBtn = document.createElement("button");
    delBtn.classList.add("delete-btn");
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", () => deleteTodoById(item.id));

    div.append(span, p, toggleBtn, delBtn);
    historyContainer.appendChild(div);
  });

  // After rendering the filtered results:
  if (filtered.length > 0) {
    const firstCategory = filtered[0].category;
    document.querySelector(
      ".todo-heading"
    ).textContent = `Search: ${firstCategory}`;
    applyCategoryTheme(firstCategory);
  } else {
    document.querySelector(".todo-heading").textContent = "No results";
    applyCategoryTheme("default");
  }
}
