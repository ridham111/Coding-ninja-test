// app.js
const searchInput = document.getElementById('searchInput');
const mealResultsDiv = document.getElementById('mealResults');


// Function to fetch meals from TheMeal API based on search input
async function fetchMeals(query) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const data = await response.json();
  return data.meals;
}

// Function to render search results on the Home Page
// Function to render search results on the Home Page
var meals__global= [];
function renderSearchResults(meals) {
  meals__global = meals;
  console.log(meals,meals__global);
  mealResultsDiv.innerHTML = '';
  meals.forEach(meal => {
    const mealCard = document.createElement('div');
    mealCard.classList.add('meal-card');
    mealCard.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h3>${meal.strMeal}</h3>

      <button class="favorite-btn" onclick="addToFavorites('${meal.idMeal}')">Add to Favorites</button>
      <button class="detail-btn" id="${meal.idMeal}" onclick="showMealDetails('${meal.idMeal}')">Details</button>
    `;
    mealResultsDiv.appendChild(mealCard);
  });
}


// Function to handle adding meals to favorites
function addToFavorites(mealId) {
console.log(mealId,meals__global);
  const mealToAdd = meals__global.find(meal => meal.idMeal === mealId);
  if (mealToAdd && !favoriteMeals.some(meal => meal.idMeal === mealId)) {
    favoriteMeals.push(mealToAdd);
    updateFavoritesUI();
    saveFavoritesToLocalStorage();
  }
}

// Function to update the UI with favorite meals
function updateFavoritesUI() {
  favoriteMealsDiv.innerHTML = '';
  favoriteMeals.forEach(meal => {
    const favoriteCard = document.createElement('div');
    favoriteCard.classList.add('meal-card');
    favoriteCard.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h3>${meal.strMeal}</h3>
      <button class="remove-btn" onclick="removeFromFavorites('${meal.idMeal}')">Remove from Favorites</button>
    `;
    favoriteMealsDiv.appendChild(favoriteCard);
  });
}


// ... (rest of the code)

// Event listener for search input
searchInput.addEventListener('input', async (e) => {
  const query = e.target.value.trim();
  if (query.length > 0) {
    const meals = await fetchMeals(query);
    renderSearchResults(meals);
  } else {
    mealResultsDiv.innerHTML = '';
  }
});

function goToFavorites() {
  window.location.href = 'favorite/favorites.html';
}


function saveFavoritesToLocalStorage() {
  localStorage.setItem('favoriteMeals', JSON.stringify(favoriteMeals));
}