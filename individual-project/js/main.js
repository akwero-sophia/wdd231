import { fetchPlants } from './fetchData.js';
import './modal.js';

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const plantList = document.getElementById("plantList");
const filterSelect = document.getElementById("filterSelect");

// Toggle responsive nav
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Load and render plants
fetchPlants().then(plants => {
  renderPlants(plants);

  // Save full list to localStorage
  localStorage.setItem("allPlants", JSON.stringify(plants));

  // Filter select
  if (filterSelect) {
    filterSelect.addEventListener("change", () => {
      const type = filterSelect.value;
      localStorage.setItem("lastFilter", type);

      const filtered = type === "all"
        ? plants
        : plants.filter(p => p.type.toLowerCase() === type);

      renderPlants(filtered);
    });

    // Load previous filter if available
    const lastFilter = localStorage.getItem("lastFilter");
    if (lastFilter) {
      filterSelect.value = lastFilter;
      const filtered = lastFilter === "all"
        ? plants
        : plants.filter(p => p.type.toLowerCase() === lastFilter);
      renderPlants(filtered);
    }
  }
});

// Render card UI
function renderPlants(plants) {
  if (!plantList) return;
  plantList.innerHTML = ""; // clear existing
  plants.slice(0, 15).forEach(plant => {
    const card = document.createElement("div");
    card.className = "plant-card";
    card.innerHTML = `
      <h3>${plant.name}</h3>
      <p><strong>Sunlight:</strong> ${plant.sunlight}</p>
      <p><strong>Water:</strong> ${plant.water}</p>
      <p><strong>Type:</strong> ${plant.type}</p>
      <p><strong>Benefit:</strong> ${plant.benefit}</p>
    `;
    plantList.appendChild(card);
  });
}
