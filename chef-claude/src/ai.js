export default async function GetRecipeFromGPT2(ingredientsList) {
    console.log("GPT2 API call triggered");
    const ingredientsString = ingredientsList.join(", ")
    // Issue
    //     fetch('http://backend:8000/getRecipe')  ---> Browser can NOT resolve backend
    // Solve via proxy
    //      1. The browser talks to frontend container by localhost:3000
    //      2. The frontend container’s nginx handles /getRecipe request and proxies it to http://backend:8000/getRecipe
    //              - Because nginx and backend are in the same Docker network (via Docker compose), nginx resolves backend.
    const response = await fetch('/getRecipe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ 
            prompt: `I have this list of ingredients: ${ingredientsString}. 
            Please give me a recipe using these ingredients.`
        }),
    });
    const data = await response.json();
    return data.response
}

export async function getRecipeFromMistral(ingredientsArr) {
    console.log("Mistral API call triggered");
    const ingredientsString = ingredientsArr.join(", ")

    const response = await fetch('/getMistralRecipe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ 
            prompt: `I have this list of ingredients: ${ingredientsString}. 
            Please give me a recipe using these ingredients.`
        }),
    });
    const data = await response.json();
    return data.response
}