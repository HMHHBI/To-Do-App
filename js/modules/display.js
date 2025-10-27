import { getHistory } from "./storage.js";
import { toggleCompleteById, deleteTodoById, editTodoById } from "./todo.js";

const historyContainer = document.querySelector(".todos");

export function displayHistory(category = "All") {
  let history = getHistory();
  historyContainer.innerHTML = "";

  // Filter by category
  if (category !== "All") {
    history = history.filter((item) => item.category === category);
  }

  // Sort newest first
  history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Render each todo
  history.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("todo-item");

    const colors = ["#D09AA8", "#b4f8c8ff", "#FBE7C6", "#F9F6F3", "#FFD6A5"];
    div.style.backgroundColor = colors[index % colors.length];

    const span = document.createElement("span");
    span.classList.add("indexing");
    span.textContent = `${index + 1}.`;

    const p = document.createElement("p");
    p.classList.add("each-todo-content");
    p.textContent = `${item.text} (${item.category})`;

    // ✅ Toggle complete
    const toggleBtn = document.createElement("button");
    toggleBtn.classList.add("toggle-btn");
    toggleBtn.innerHTML = item.completed ? "✅" : "⬜";
    toggleBtn.addEventListener("click", () => toggleCompleteById(item.id));

    // ✅ Edit button (fill input, not prompt)
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerHTML = "✏️";
    editBtn.addEventListener("click", () => {
      document.dispatchEvent(
        new CustomEvent("startEdit", {
          detail: { id: item.id, text: item.text },
        })
      );
    });

    // ✅ Delete todo
    const delBtn = document.createElement("button");
    delBtn.classList.add("delete-btn");
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", () => deleteTodoById(item.id));

    div.append(span, p, toggleBtn, editBtn, delBtn);
    historyContainer.appendChild(div);
  });

  applyCategoryTheme(category);
}

// ✅ Category-based theme
export function applyCategoryTheme(category) {
  const todoSection = document.querySelector(".todo");
  const themes = {
    "House Chores": "#FBE7C6",
    "Child Related": "#B4F8C8",
    "Daily Religious Time": "#97f1e5ff",
    "Working Men's/Women's": "#FFD6A5",
    Meetings: "#A0E7E5",
    "Health Appointments (If any)": "#d6b48bff",
    default: "#f0e3d6ff",
  };

  todoSection.style.background = themes[category] || themes.default;
}

// ✅ Auto-refresh on todosUpdated
document.addEventListener("todosUpdated", () => {
  const heading = document.querySelector(".todo-heading").textContent.trim();
  const category = heading && heading !== "Your Todos" ? heading : "All";
  displayHistory(category);
});
