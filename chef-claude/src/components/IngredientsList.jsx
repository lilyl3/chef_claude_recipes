export default function IngredientsList(prop){
    const ingredientsListItems = prop.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))
    return (
        prop.ingredients.length > 0 ? 
        <section>
            <div className="ingredients-list">
                <h2>Ingredients on Hand:</h2>
                <ul>
                    {ingredientsListItems}
                </ul>
            </div>
            {prop.ingredients.length > 3 && <div className="get-recipe-container">
                <div>
                    <h3>Ready for a recipe?</h3>
                    <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button onClick={prop.getRecipe}>Get a recipe</button>
            </div>}
        </section> : {}
    )
}