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

    const [recipe, setRecipe] = React.useState('')
    async function GetRecipe(){
        const generatedRecipe = await getRecipeFromMistral(ingredients)
        setRecipe(generatedRecipe)
    }

    const [selectedTab, setTab] = React.useState("home")
    const [recipeCount, setRecipeCount] = React.useState(0)
    async function handleSaveRecipe(){
        (async () => {
            const regex = /^(#{1,6})\s+(.*)$|\*\*(.+?)\*\*/m;
            const matchName = recipe.trim().match(regex);

            let recipeName = '';
            if (matchName) {
                const heading = matchName[2]?.trim();
                const bold = matchName[3]?.trim();
                recipeName = heading || bold || '';
            }

            console.log(`Saved recipe: ${recipeName}, ${recipe}`)
            await saveRecipe(recipeName, recipe)
        })()
        setRecipeCount((prevCount) => (prevCount + 1))
    }

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
                            <button onClick={handleSaveRecipe}>Save</button>
                        </div>
                    </>}
                </>}
                {/* SavedRecipe is unmounted when selectedTab = 'home' 
                    when re-mounted, SavedRecipe is "freshly" mounted
                    useEffect does not have the previous rendered value */}
                {selectedTab === "savedRecipes" && 
                <SavedRecipes recipe={recipe} selectedTab={selectedTab} recipeCount={recipeCount}/>}
            </main>
        </>
    )
}

async function saveRecipe(recipeName, recipe){
    const requestBody = {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({
            name: recipeName,
            recipe: recipe
        })
    }
    const response = await fetch('/saveRecipe', requestBody);
    console.log("SUCCESS: recipe saved.")
}