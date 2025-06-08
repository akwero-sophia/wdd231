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

// Load plants on homepage
if (document.getElementById('plantsContainer')) {
  fetchPlants();
}

// Setup modal for plant details
setupModal();