import { fetchPlants } from './fetchPlants.js';
import { setupModal } from './modal.js';

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('show');
});

// References to filters and container
const plantsContainer = document.getElementById('plantsContainer');
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const indoorFilter = document.getElementById('indoorFilter');

let allPlants = [];

// Load plants and set up filter listeners
if (plantsContainer) {
  fetchPlants()
    .then(plants => {
      allPlants = plants;
      displayFilteredPlants();

      if (searchInput) searchInput.addEventListener('input', displayFilteredPlants);
      if (typeFilter) typeFilter.addEventListener('change', displayFilteredPlants);
      if (indoorFilter) indoorFilter.addEventListener('change', displayFilteredPlants);
    })
    .catch(() => {
      plantsContainer.innerHTML = '<p>Failed to load plants. Please try again later.</p>';
    });
}

// Filter and display plants
function displayFilteredPlants() {
  let filtered = allPlants;

  const searchTerm = searchInput?.value.toLowerCase() || '';
  const typeValue = typeFilter?.value || '';
  const indoorValue = indoorFilter?.value;

  if (searchTerm) {
    filtered = filtered.filter(plant =>
      plant.name.toLowerCase().includes(searchTerm)
    );
  }

  if (typeValue) {
    filtered = filtered.filter(plant => plant.type === typeValue);
  }

  if (indoorValue === 'true' || indoorValue === 'false') {
    filtered = filtered.filter(plant => String(plant.indoor) === indoorValue);
  }

  plantsContainer.innerHTML = filtered.map(plant => `
    <div class="plant-card" data-id="${plant.id}">
      <img src="images/plants/${plant.image}" alt="${plant.name}" loading="lazy" />
      <h3>${plant.name}</h3>
      <p>Type: ${plant.type}</p>
      <p>Sunlight: ${plant.sunlight}</p>
      <p>Water: ${plant.water}</p>
    </div>
  `).join('');
}

// Setup modal
setupModal();

// Save last visit (no console output)
const lastVisit = localStorage.getItem('lastVisit');
localStorage.setItem('lastVisit', new Date().toLocaleString());
