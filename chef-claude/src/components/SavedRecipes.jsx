import {useState, useEffect, useRef} from "react"
import Recipe from "./Recipe"

export default function SavedRecipes(props){
    const [recipeName, setRecipeName] = useState("")
    const [getRecipe, setGetRecipe] = useState(' ')
    const recipeCount = useRef(0)               // local recipe count

    // call node.js server ---> Mongo Express ---> MongoDB
    // recipeList should be updated if "Save" is pressed
    const [recipeList, setRecipeList] = useState([])
    const recipeOptions = recipeList.map((recipe) => (
        <option key={recipe} value={recipe}>{recipe}</option>
    ))
    const allOptions = [<option key="" value="" disabled>Select a recipe to view</option>, ...recipeOptions]

    useEffect(() => {
        console.log(`props.recipeCount=${props.recipeCount}, recipeCount=${recipeCount.current}`)
        if (props.selectedTab == "savedRecipes" && props.recipeCount > recipeCount.current){
            (async () => {
                console.log("getting recipe names")
                const recipeNames = await getRecipeNames()
                setRecipeList(recipeNames)
                console.log(`recipeNames = ${recipeNames}`)
            })()
            recipeCount.current = props.recipeCount
        }
    }, [props.selectedTab])

    useEffect(() => {
        if (recipeName != ""){
            (async () => {
                const savedRecipe = await getSavedRecipe(recipeName)
                setGetRecipe(savedRecipe)
                console.log(`recipe retrieved: ${savedRecipe}`)
            })()
        }
    }, [recipeName])

    return (
        <>
            <select className="listSavedRecipes" value={recipeName} onChange={(e) => setRecipeName(e.target.value)}>
                {allOptions}
            </select>
            <Recipe generatedRecipe={getRecipe}/>
        </>
    )
}

async function getRecipeNames(){
    const response = await fetch('/getSavedRecipeNames', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
    });
    const data = await response.json()
    return data.recipeNames
}

async function getSavedRecipe(recipeName){
    console.log(`getting recipe=${recipeName}`)
    const response = await fetch('/getSavedRecipe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({
            name: recipeName
        })
    })
    const data = await response.json()
    console.log(`keys=${Object.keys(data)}`)
    return data.recipe
}