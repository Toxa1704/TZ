async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Помилка запиту: " + response.status);
    return await response.json();
  } catch (error) {
    console.error("Не вдалося завантажити JSON:", error.message);
    return null;
  }
}

// Виклик:
fetchJSON("https://test.smarto.agency/smarto_complexes_list.json")
  .then(data => {
    console.log("Отримали JSON:", data);
  });