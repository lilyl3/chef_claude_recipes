const express = require('express');
const app = express();
const port = 4000;
app.use(express.json());

const { MongoClient } = require('mongodb');
const uri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongo:27017`;
const client = new MongoClient(uri);
let savedRecipes;

(async () => {
    try {
        await client.connect();
        const db = client.db("chefClaude");
        savedRecipes = db.collection("savedRecipes");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
})();

async function saveRecipe(recipe){
    await savedRecipes.insertOne(recipe);
}

async function getRecipeNames(){
    const recipes = await savedRecipes.find(
        {},
        {projection: {name:1}}
    ).toArray()
    const recipeNames = recipes.map((recipe) => (recipe.name))
    return recipeNames;
}

async function getRecipe(recipeName){
    const recipe = await savedRecipes.findOne(
        { name: recipeName },                   // filter
        { projection: { recipe: 1, _id: 0 } }   // projection
    );
    return recipe ? recipe.recipe : null;
}

app.post('/saveRecipe', async (req, res) => {
    try {
        await saveRecipe(req.body);
        res.status(201).send(`Recipe saved!`);
    } catch (err) {
        res.status(500).send("Failed to save recipe.");
    }
})

app.post('/getSavedRecipe', async (req, res) => {
    try {
        const recipe = await getRecipe(req.body.name);
        if (!recipe){
            res.status(404).json({ error: "Recipe not found" });
        }
        res.status(200).json({recipe: recipe});
    } catch (err) {
        res.status(500).json({recipe: {}, error: err.message});
    }
})

app.post('/getSavedRecipeNames', async (req, res) => {
    try {
        const recipeNames = await getRecipeNames();
        res.status(200).json({ recipeNames: recipeNames});
    } catch (err) {
        res.status(500).json({ recipeNames: [], error: err.message});
    }
})

app.listen(port, () => {
  console.log(`node.js listening on ${port}`)
})

process.on('SIGTERM', async () => {
    try {
      await client.close();
      console.log('MongoDB client closed');
      process.exit(0);
    } catch (err) {
      console.error('Error during MongoDB client close', err);
      process.exit(1);
    }
  });