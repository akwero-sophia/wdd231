export async function fetchPlants() {
  try {
    const response = await fetch('data/plants.json');
    if (!response.ok) throw new Error('Failed to fetch plants');
    
    const plants = await response.json();
    displayPlants(plants.slice(0, 15)); // Show first 15 plants
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('plantsContainer').innerHTML = 
      '<p>Failed to load plants. Please try again later.</p>';
  }
}

function displayPlants(plants) {
  const container = document.getElementById('plantsContainer');
  container.innerHTML = plants.map(plant => `
    <div class="plant-card" data-id="${plant.id}">
      <img src="images/plants/${plant.image}" alt="${plant.name}" loading="lazy">
      <h3>${plant.name}</h3>
      <p>Type: ${plant.type}</p>
      <p>Sunlight: ${plant.sunlight}</p>
      <p>Water: ${plant.water}</p>
    </div>
  `).join('');
}