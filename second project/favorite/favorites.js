
let favoriteMeals = [];
const favoriteMealsDiv = document.getElementById('favoriteMeals');

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

// Function to handle adding meals to favorites
function addToFavorites(mealId) {
  const mealToAdd = meals.find(meal => meal.idMeal === mealId);
  if (mealToAdd && !favoriteMeals.some(meal => meal.idMeal === mealId)) {
    favoriteMeals.push(mealToAdd);
    updateFavoritesUI();
    saveFavoritesToLocalStorage();
  }
}

// Function to remove meals from favorites
function removeFromFavorites(mealId) {
  favoriteMeals = favoriteMeals.filter(meal => meal.idMeal !== mealId);
  updateFavoritesUI();
  saveFavoritesToLocalStorage();
}

// Function to save favorite meals to localStorage
function saveFavoritesToLocalStorage() {
  localStorage.setItem('favoriteMeals', JSON.stringify(favoriteMeals));
}

// Initialization: Load favorite meals from localStorage if available
if (localStorage.getItem('favoriteMeals')) {
  favoriteMeals = JSON.parse(localStorage.getItem('favoriteMeals'));
  updateFavoritesUI();
}


function goToSearch(){
  window.location.href = '../index.html';
}
