const modal = document.getElementById("modal");
const openBtn = document.getElementById("infoBtn");
const closeBtn = document.getElementById("closeModal");

if (openBtn && closeBtn && modal) {
  openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}
