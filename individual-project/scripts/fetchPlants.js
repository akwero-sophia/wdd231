let allPlants = [];

export async function fetchPlants() {
  try {
    const response = await fetch('data/plants.json');
    if (!response.ok) throw new Error('Failed to fetch plants');
    
    allPlants = await response.json();
    displayPlants(allPlants.slice(0, 15)); // Initial show first 15
    
    setupFilters(); // Setup event listeners for search & filters
  } catch (error) {
    console.error('Error:', error);
    const container = document.getElementById('plantsContainer');
    if (container) {
      container.innerHTML = '<p>Failed to load plants. Please try again later.</p>';
    }
  }
}

function displayPlants(plants) {
  const container = document.getElementById('plantsContainer');
  if (!container) return;

  if (plants.length === 0) {
    container.innerHTML = '<p>No plants match your criteria.</p>';
    return;
  }

  container.innerHTML = plants.map(plant => `
    <div class="plant-card" data-id="${plant.id}" tabindex="0">
      <img src="images/plants/${plant.image}" alt="${plant.name}" loading="lazy" />
      <h3>${plant.name}</h3>
      <p><strong>Type:</strong> ${plant.type}</p>
      <p><strong>Sunlight:</strong> ${plant.sunlight}</p>
      <p><strong>Water:</strong> ${plant.water}</p>
      <p><strong>Tips:</strong> ${plant.tips}</p>
      <p><strong>Indoor:</strong> ${plant.indoor ? 'Yes' : 'No'}</p>
      <p><strong>Harvest Time:</strong> ${plant.harvestTime}</p>
    </div>
  `).join('');
}

function setupFilters() {
  const searchInput = document.getElementById('searchInput');
  const typeFilter = document.getElementById('typeFilter');
  const indoorFilter = document.getElementById('indoorFilter');

  function filterPlants() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value;
    const selectedIndoor = indoorFilter.value;

    let filtered = allPlants;

    if (searchTerm) {
      filtered = filtered.filter(plant =>
        plant.name.toLowerCase().includes(searchTerm)
      );
    }

    if (selectedType) {
      filtered = filtered.filter(plant => plant.type === selectedType);
    }

    if (selectedIndoor) {
      // Note: indoor is boolean, but filter value is string "true"/"false"
      filtered = filtered.filter(plant => String(plant.indoor) === selectedIndoor);
    }

    displayPlants(filtered);
  }

  searchInput.addEventListener('input', filterPlants);
  typeFilter.addEventListener('change', filterPlants);
  indoorFilter.addEventListener('change', filterPlants);
}
