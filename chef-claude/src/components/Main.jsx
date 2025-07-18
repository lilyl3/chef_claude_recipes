import React from "react"
import Recipe from "./Recipe"
import IngredientsList from "./IngredientsList"
import {GetRecipeFromGPT2, getRecipeFromMistral} from "../ai.js"

export default function Main(){
    const [ingredients, setIngredients] = React.useState(["pasta", "chicken", "tomato"])

    function AddIngredient(formData){
        const ingredient = formData.get("ingredient")
        setIngredients((prevIngredients) => [
            ...prevIngredients, 
            ingredient
        ])
    }

    const [recipe, setRecipe] = React.useState(null)
    async function GetRecipe(){
        const generatedRecipe = await getRecipeFromMistral(ingredients)
        setRecipe(generatedRecipe)
    }

    return (
        <main>
            <form action={AddIngredient} className="add-ingredients-form">
                <input 
                    type="text" 
                    placeholder="e.g., oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                ></input>
                <button >Add Ingredient</button>
            </form>
            <IngredientsList ingredients={ingredients} getRecipe={GetRecipe}/>
            {recipe && <Recipe generatedRecipe={recipe}/>}
        </main>
    )
}