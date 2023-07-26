// app.js
const searchInput = document.getElementById('searchInput');
const mealResultsDiv = document.getElementById('mealResults');
favoriteMeals = [];

// Function to fetch meals from TheMeal API based on search input
async function fetchMeals(query) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const data = await response.json();
  return data.meals;
}

// Function to render search results on the Home Page
var meals__global= [];
function renderSearchResults(meals) {
  meals__global = meals;
  mealResultsDiv.innerHTML = '';
  meals.forEach(meal => {
    const mealCard = document.createElement('div');
    mealCard.classList.add('meal-card');
    mealCard.innerHTML = `
      <img src="${meal.strMealThumb}" width="200" height="200" alt="${meal.strMeal}">
      <h3>${meal.strMeal}</h3>
      <div style = 'display : flex; '>
      <button class="detail-btn" id="${meal.idMeal}" onclick="showMealDetails('${meal.idMeal}')">Details</button>
      
        <span class="fav-icon" id ="fav${meal.idMeal}" onclick="addToFavorites('${meal.idMeal}')"><i class="fa-regular fa-heart fa-2x"></i></span>
      </div>

      `;

    mealResultsDiv.appendChild(mealCard);
  });
  // if already store in favorite then change favorite button
  addRemove_button();
}

function addRemove_button(){
  meals__global.forEach(meal => {
    if(favoriteMeals.some(meal1 => meal1.idMeal === meal.idMeal)){
      const favelem = document.getElementById('fav'+meal.idMeal);
      console.log(favelem);
      favelem.lastChild.classList.remove('fa-regular');
      favelem.lastChild.classList.add('fa-solid')
    }
  });
}

async function renderAllMeals() {
  const meals = await fetchMeals('');
  setHeaderText( 'All Meals');
  renderSearchResults(meals);
}


// Event listener for initial load of the app
document.addEventListener('DOMContentLoaded', renderAllMeals);
function setHeaderText(text) {
  const header = document.getElementById('header');
  header.textContent = text;
}

// Event listener for search input
searchInput.addEventListener('input', async (e) => {
  const query = e.target.value.trim();
  setHeaderText(query.length === 0 ? 'All Meals' : 'Search Results');
    const meals = await fetchMeals(query);
    renderSearchResults(meals);
});

function goToFavorites() {
  window.location.href = 'favorite/favorites.html';
}

// Function to handle adding meals to favorites
function addToFavorites(mealId) {
    const mealToAdd = meals__global.find(meal => meal.idMeal === mealId);
    if (mealToAdd && !favoriteMeals.some(meal => meal.idMeal === mealId)) {
      favoriteMeals.push(mealToAdd);
      saveFavoritesToLocalStorage();
      const favelem = document.getElementById('fav'+mealId);
      favelem.lastChild.classList.remove('fa-regular');
      favelem.lastChild.classList.add('fa-solid')
    }
    else{
      favoriteMeals = favoriteMeals.filter(meal => meal.idMeal !== mealId);
      saveFavoritesToLocalStorage();
      const favelem = document.getElementById('fav'+mealId);
      favelem.lastChild.classList.remove('fa-solid')
      favelem.lastChild.classList.add('fa-regular')
    }
  }

  function updateremovebtnUI(mealid){
    const favelem = document.getElementById('fav'+mealid);
    favelem.lastChild.classList.remove('fa-regular');
    favelem.lastChild.classList.add('fa-solid');
  }

function saveFavoritesToLocalStorage() {
  localStorage.setItem('favoriteMeals', JSON.stringify(favoriteMeals));
}

// Initialization: Load favorite meals from localStorage if available
if (localStorage.getItem('favoriteMeals')) {
  favoriteMeals = JSON.parse(localStorage.getItem('favoriteMeals'));
  favoriteMeals.forEach(element => {
    const fav_element = document.getElementById('fav'+(element.idMeal))
  });
}
