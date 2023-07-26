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
  <div style="display:flex;">
  <h2>${meal.strMeal}</h2>
  // <span class = "close" onclick="closeMealDetails('${mealId}',$event)">close</span>
  </div>
  <p>${meal.strInstructions}</p>
  `;
  console.log(mealDetailDiv);
  mealDetailDiv.parentElement.parentNode.removeChild(mealDetailDiv.parentElement.parentNode.getElementsByTagName('h3')[0]);
  mealDetailDiv.parentElement.parentElement.style.display='-webkit-inline-box';
}

function closeMealDetails(mealId,event) {
  // Prevent the default action of the event (e.g., prevent form submission or link navigation)
  event.preventDefault();

  // Stop the event from propagating to parent elements
  event.stopPropagation();
  const mealDetailDiv = document.getElementById(mealId);  
  // mealDetailDiv.innerHTML = `
  <button class="detail-btn" id="${mealId}" onclick="showMealDetails('${mealId}')">Details</button>
  // `; 
  
}
