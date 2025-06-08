export function setupModal() {
  const container = document.getElementById('plantsContainer');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const card = e.target.closest('.plant-card');
    if (!card) return;

    const plantId = card.dataset.id;
    openModal(plantId);
  });
}

function openModal(plantId) {
  // In a real app, fetch detailed plant info
  const modalHTML = `
    <div class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Plant Details</h2>
        <p>ID: ${plantId}</p>
        <!-- More details here -->
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
  document.querySelector('.close').addEventListener('click', () => {
    document.querySelector('.modal').remove();
  });
}