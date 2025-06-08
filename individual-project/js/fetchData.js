export async function fetchPlants() {
  try {
    const res = await fetch('../data/plants.json');
    if (!res.ok) throw new Error("Network response failed");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}
 