import {useState} from "react"
import Recipe from "./Recipe"

export default function SavedRecipes(){
    const [getRecipe, setGetRecipe] = useState("")

    // call node.js server ---> Mongo Express ---> MongoDB
    // recipeList should be updated if "Save" is pressed
    const recipeList = []
    const recipeOptions = recipeList.map((recipe) => (
        <option key={recipe} value={recipe}>{recipe}</option>
    ))
    const allOptions = [<option key="" value="" disabled>Select a recipe to view</option>, ...recipeOptions]

    return (
        <>
            <select className="listSavedRecipes" value={getRecipe} onChange={(e) => {setGetRecipe(e.target.value)}}>
                {allOptions}
            </select>
            <Recipe generatedRecipe="#### Recipe"/>
        </>
    )
}