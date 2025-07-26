export default function Menu(props){
    return (
        <div className="menu">
            <input 
                id="home" name="tabs" type="radio" value="home" 
                onChange={() => props.setTab('home')}
                checked={props.selectedTab === 'home'}
            />
            <label htmlFor="home">Home</label>
            <input 
                id="savedRecipes" name="tabs" type="radio" value="savedRecipes" 
                onChange={() => props.setTab('savedRecipes')}
                checked={props.selectedTab === 'savedRecipes'}
            />
            <label htmlFor="savedRecipes">Saved Recipes</label>
        </div>
    )
}