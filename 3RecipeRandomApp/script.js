const recipes = document.getElementById("recipes");
const favRecipe = document.getElementById("favorite-meal");
const btnSearch = document.getElementById("search");
const inputSearch = document.getElementById("input-search");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close-modal");
const modalInfoContainer = document.getElementById("modal-popup");
const recipeInfo = document.getElementById("recipe-info");

async function getRandomRecipe(){
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await response.json();
    const randomRecipe = data.meals[0];
    
    addRecipe(randomRecipe, true);
}

getRandomRecipe();
fetchFavRecipe();

async function getRecipeById(id){
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+id);
    const data = await response.json();
    return data.meals[0];
}

async function getRecipeBySearch(recipe){
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+recipe);
    const data = await response.json();
    return data.meals;
}

function addRecipe(recipeData, random=false){
    const recipe = document.createElement('div');
    recipe.classList.add('recipe');

    recipe.innerHTML = (`
        <div class="recipe-card">
            ${random ? `
                <span class="random"> Random Recipe </span>` : ''}
                <img src="${recipeData.strMealThumb}" alt="${recipeData.strMeal}" />
        </div>
        <div class="recipe-modal">
            <h4> ${recipeData.strMeal} </h4>
            <button class="btn-like">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `);

    const btnFav = recipe.querySelector('.recipe-modal .btn-like');
    btnFav.addEventListener('click', () => {
        if(btnFav.classList.contains('active')){
            removeRecipeFromLocalStorage(recipeData.idMeal);
            btnFav.classList.remove("active");
        }else {
            addRecipeToLocalStorage(recipeData.idMeal);
            btnFav.classList.toggle('active');
        }
        fetchFavRecipe();
    });

    recipe.addEventListener(
        "click",
        () => {
            modalInfoContainer.classList.remove("hidden");
            showPopUp(recipeData);
        }
    )
   
    recipes.appendChild(recipe);
}

function addRecipeToLocalStorage(recipeId){
    const recipeIds = getRecipeFromLocalStorage();

    localStorage.setItem("recipeIds", JSON.stringify([...recipeIds, recipeId]));
}

function getRecipeFromLocalStorage(){
    const recipeIds = JSON.parse(localStorage.getItem("recipeIds"));
    return recipeIds === null ? [] : recipeIds;
}

function removeRecipeFromLocalStorage(recipeId){
    const recipeIds = getRecipeFromLocalStorage();

    localStorage.setItem(
        "recipeIds",
        JSON.stringify(recipeIds.filter((id) => id !== recipeId))
    );
}

async function fetchFavRecipe(){
    favRecipe.innerHTML = "";

    const recipesId = getRecipeFromLocalStorage();

    if(recipesId.length === 0){
        const message = document.createElement('div');
        message.innerHTML = (`<h3> Vous n'avez pour le moment aucun repas favori. </h3>
            <p class="message"> Ajoutez-en en cliquant sur le coeur. </p>`
        );
        favRecipe.appendChild(message);
    }
    else{
        for(let i=0; i<recipesId.length; i++){
            const recipeId = recipesId[i];
            recipe = await getRecipeById(recipeId);
            addRecipeToFav(recipe);
        }
    }
}

function addRecipeToFav(recipeData){
    const recipe = document.createElement('li');

    recipe.innerHTML = (`
        <img src="${recipeData.strMealThumb}" alt="${recipeData.strMeal}" />
        <span> ${recipeData.strMeal} </span>
        <button class="clear"> <i class="fas fa-window-close"></i></button>
    `);

    const idMeal = recipe.querySelector(".clear");
    idMeal.addEventListener(
      "click",
      () => {
        removeRecipeFromLocalStorage(recipeData.idMeal);
        fetchFavRecipe();
      }  
    );

    recipe.addEventListener(
        "click",
        () => {
            modalInfoContainer.classList.remove("hidden");
            showPopUp(recipeData);
        }
    );

    favRecipe.appendChild(recipe);
}

function showPopUp(recipeData){
    const popUp = document.createElement('div');
    recipeInfo.innerHTML = "";
    
    const ingredients = [];
    for(let i=1; i<=20; i++){
        if(recipeData['strIngredient'+i]){
            ingredients.push(recipeData['strIngredient'+i]);
        }
        else{
            break;
        }
    }

    popUp.innerHTML = (`
        <h1> ${recipeData.strMeal} </h1>
        <img src="${recipeData.strMealThumb}" alt="${recipeData.strMeal}" />
        <p>
            ${recipeData.strInstructions}
        </p>
        <h2> Ingredients </h2>
        <ul> 
            ${
                ingredients.map((ingredient) =>
                    `<li> ${ingredient} </li>`
                ).join("")
            } 
        </ul>
    `);
    recipeInfo.appendChild(popUp);
}

btnSearch.addEventListener(
        "click",
        async () => {

            recipes.innerHTML = "";
            const search = inputSearch.value;
            const recipesFinded = await getRecipeBySearch(search);
            
            if(recipesFinded){
                recipesFinded.forEach(recipe => {
                    addRecipe(recipe);
                });
            } else {
                const message = document.createElement('div');
                message.innerHTML = (`<h3> Aucune recette ne correpond a votre recherche. </h3>`);
                recipes.appendChild(message);
            }
        }
    );

closeBtn.addEventListener(
    "click",
    () => {
        modalInfoContainer.classList.add("hidden");
    }
    
)