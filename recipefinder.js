const searchBox = document.querySelector("#searchBox");
const searchBtn = document.querySelector("#searchbtn");
const recipeContainer = document.querySelector("#recipeContainer");

const fetchRecipes = async () => {
    let ingredient = searchBox.value.trim();
    if (!ingredient) {
        alert("Please enter an ingredient");
        return;
    }

    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    
    try {
        let response = await fetch(url);
        let data = await response.json();
        displayRecipes(data.meals);
    } catch (error) {
        console.log("Error fetching recipes:", error);
        recipeContainer.innerHTML = "<p>Failed to load recipes.</p>";
    }
};

const displayRecipes = (meals) => {
    recipeContainer.innerHTML = "";
    
    if (!meals) {
        recipeContainer.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    meals.forEach(meal => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <button onclick="getRecipeDetails(${meal.idMeal})">View Recipe</button>
        `;
        recipeContainer.appendChild(recipeDiv);
    });
};

const getRecipeDetails = async (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        let meal = data.meals[0];

        alert(`Recipe: ${meal.strMeal}\n\nInstructions: ${meal.strInstructions}`);
    } catch (error) {
        console.log("Error fetching details:", error);
    }
};

searchBtn.addEventListener("click", fetchRecipes);
