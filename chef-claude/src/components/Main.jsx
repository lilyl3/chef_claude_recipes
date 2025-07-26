import React from "react"
import Recipe from "./Recipe"
import IngredientsList from "./IngredientsList"
import Menu from "./Menu.jsx"
import SavedRecipes from "./SavedRecipes.jsx"
import getRecipeFromMistral, {getRecipeFromGPT2} from "../ai.js"

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

    const [selectedTab, setTab] = React.useState("home")
    return (
        <>
            <Menu selectedTab={selectedTab} setTab={setTab}/>
            <main className="main">
                {selectedTab === "home" && <>
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
                    {recipe && 
                    <>
                        <Recipe generatedRecipe={recipe}/>
                        <div className="likeRecipe">
                            <label>Like Recipe?</label>
                            <button>Save</button>
                        </div>
                    </>}
                </>}
                {selectedTab === "savedRecipes" && <SavedRecipes/>}
            </main>
        </>
    )
}