// js/menu-toggle.js
import { displayHistory } from "./modules/display.js";

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  toggle.classList.toggle("active");
});

const categorySelect = document.querySelector(".category-select");
const customCategoryInput = document.querySelector(".custom-category-input");

categorySelect.addEventListener("change", () => {
  if (categorySelect.value === "Custom") {
    customCategoryInput.style.display = "block";
  } else {
    customCategoryInput.style.display = "none";
  }
});

document.querySelectorAll(".nav-links li a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const category = link.textContent.trim();
    displayHistory(category);
    document.querySelector(".todo-heading").textContent = category;
  });
});