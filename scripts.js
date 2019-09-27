const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
const mealContainer = document.getElementById('meal');
const generateMealBtn = document.getElementById('generate-meal-btn');

generateMealBtn.addEventListener('click', () => {
    fetch(url)
    .then(res => res.json())
    .then(res => {
        console.log(res.meals[0])
        buildHTML(res.meals[0])
    })
    .catch(err => console.warn(err) )
});

const buildHTML = (meal) => {
    const ingredients = [];
    for(let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            //break if no ingredients left
            break;
        }
    }

    //clear meal container
    mealContainer.innerHTML = '';

    const newInnerHTML = `
        <div class="container">
            <div class="meal-header">
                <div class="meal-info">
                    <h2>${meal.strMeal}</h2>
                    ${meal.strArea ? `<p><span class="strong">Country:</span> ${meal.strArea}</p>` : ''}
                    ${meal.strCategory ? `<p><span class="strong">Category:</span> ${meal.strCategory}</p>` : ''}
                    ${meal.strTags ? `<p><span class="strong">Tags:</span> ${meal.strTags}</p>` : ``}
                </div>

                <div class="meal-image" alt="Meal Image">
                    <img src=${meal.strMealThumb} />
                </div>
            </div>
            
            <div class="ingredients">
                <h3>Ingredients</h3>
                <ul>
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('') }
                </ul>
            </div>

            <div class="instructions">
                <h3>Cooking instructions</h3>
                <p>${meal.strInstructions}</p>
            </div>

            ${meal.strYoutube ? `
                <div class="video">
                    <iframe src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"></iframe>
                </div>
            ` : ''}

            ${meal.strSource ? `
            <div class="source">
                <p><span class="italic">Source: <a href="${meal.strSource}" target="_blank">${meal.strSource}</a></span></p>
            </div>`: ''}

            <footer>
                <p>&copy Dmitry Polyakov. All rights reserved. </p>
            </footer>
        </div>
    `;

    mealContainer.innerHTML = newInnerHTML;
}