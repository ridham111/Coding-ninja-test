// const mealDetailDiv = document.getElementById('mealDetail');

// Function to fetch meal details from TheMeal API
async function fetchMealDetails(mealId) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  const data = await response.json();
  return data.meals[0];
}

// Function to display meal details on the Meal Detail Page
async function showMealDetails(mealId) {
  const mealDetailDiv = document.getElementById(mealId);
  const meal = await fetchMealDetails(mealId);
  mealDetailDiv.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <p>${meal.strInstructions}</p>
  `;
}
