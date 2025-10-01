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
                list.innerHTML = ""; 
const loadMoreBtn = document.getElementById("loadMore");
let data = [];            // масив з JSON
let currentIndex = 0;     // початковий індекс
const step = 3;           // по скільки показувати

// функція для створення однієї картки
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

// функція для показу наступних елементів
function renderItems() {
  const slice = data.slice(currentIndex, currentIndex + step);
  slice.forEach(item => {
    list.appendChild(createCard(item));
  });
  currentIndex += step;

  // якщо всі елементи показані — ховаємо кнопку
  if (currentIndex >= data.length) {
    loadMoreBtn.style.display = "none";
  }
}

// завантажуємо JSON і показуємо перші 3
fetchJSON("https://test.smarto.agency/smarto_complexes_list.json")
  .then(json => {
    if (Array.isArray(json)) {
      data = json;
      renderItems(); // перші 3
    }
  });

// клік на кнопку
loadMoreBtn.addEventListener("click", renderItems);
