
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch("https://fsa-recipe.up.railway.app/api/recipes");
      const data = await res.json();
      setRecipes(data);
    };
    fetchRecipes();
  }, []);

  return (
    <div>
      <h2>All Recipes</h2>
      <div className="recipe-grid">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}