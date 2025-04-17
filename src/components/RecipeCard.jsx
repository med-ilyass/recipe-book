// components/RecipeCard.jsx
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} width="200" />
      <h3>{recipe.strMeal}</h3>
      <p>{recipe.strArea}</p>
      <Link to={`/recipes/${recipe.idMeal}`}>View Details</Link>
    </div>
  );
}