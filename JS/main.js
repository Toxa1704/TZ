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

const list = document.getElementById("complex-list");
const loadMoreBtn = document.getElementById("loadMore");
list.innerHTML = "";

let data = [];            // усі дані з JSON
let filteredData = [];    // відфільтровані дані
let currentIndex = 0;     // поточний індекс
const step = 3;           // по скільки показувати

// створення однієї картки
function createCard(item) {
  const li = document.createElement("div");
  li.classList.add("complex-card");   
  li.innerHTML = `
    <div class="card-top">
      <p class="card-year">${item.year}</p>
      <div class="card-type">${item.type}</div>
    </div>
    <img class="card-img" src="${item.img}" alt="building">
    <h3 class="card-title">${item.name}</h3>
    <p class="card-location">${item.adress}</p>
    <div class="card-type-of-works">
      Види робіт:
      <div class="works-wrapper">
        ${item.tags.map(work => `<p class="card-works-name">${work}</p>`).join('')}
      </div>
    </div>
    <img class="card-down" src="/img/Down 1.png" >
  `;
  return li;
}

// рендер елементів (показує наступні step)
function renderItems() {
  const slice = filteredData.slice(currentIndex, currentIndex + step);
  slice.forEach(item => {
    console.log(item)
    list.appendChild(createCard(item));
  });
  currentIndex += step;

  // ховаємо кнопку якщо більше нема що показати
  if (currentIndex >= filteredData.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "flex";
  }
}

// зміна фільтру
function applyFilter(type) {
  list.innerHTML = ""; // очистка списку
  currentIndex = 0;
  filteredData = (type === "all") 
    ? data 
    : data.filter(item => item.type === type);

  renderItems(); // показати перші step елементів
}

// завантажуємо JSON і показуємо перші 3
fetchJSON("https://test.smarto.agency/smarto_complexes_list.json")
  .then(json => {
    if (Array.isArray(json)) {
      data = json;
      filteredData = data; // початково всі
      renderItems(); 
    }
  });

// кнопка "Показати ще"
loadMoreBtn.addEventListener("click", renderItems);

// кліки по фільтрам
document.querySelectorAll("#filter li").forEach(li => {
  li.addEventListener("click", () => {
    const type = li.getAttribute("data-type");
    console.log(type)
    applyFilter(type);
  });
});

const btnMaps = document.querySelector('.map-btn');
const map = document.querySelector('.map');

// Відкрити карту
btnMaps.addEventListener("click", (e) => {
  e.stopPropagation(); // щоб клік по кнопці не закрив одразу
  map.style.display = "block";
});

// Закрити при кліку поза map
document.addEventListener("click", (e) => {
  if (map.style.display === "block" && !map.contains(e.target) && !btnMaps.contains(e.target)) {
    map.style.display = "none";
  }
});