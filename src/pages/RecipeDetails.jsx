import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function RecipeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const { token, user } = useContext(AuthContext)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(`https://fsa-recipe.up.railway.app/api/recipes/${id}`)
      const data = await res.json()
      setRecipe(data)
    }
    fetchRecipe()
  }, [id])

  const handleAddToFavorites = async () => {
    if (!token) {
      alert("You must be logged in to favorite a recipe.");
      return;
    }
  
    const favoriteData = {
        mealId: recipe.idMeal.toString(),   // ✅ mealId (not idMeal!)
        name: recipe.strMeal,               // ✅ name (not strMeal!)
        imageUrl: recipe.strMealThumb,
        strArea: recipe.strArea
      }
  
    console.log("🔐 Token:", token);
    console.log("📦 Sending favoriteData:", favoriteData);
  
    const res = await fetch("https://fsa-recipe.up.railway.app/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(favoriteData)
      })
  
    const data = await res.json();
    console.log("🔁 Response from /favorites:", data);
  
    if (data.message === "Favorite successfully added!") {
      setAdded(true);
    } else {
      alert("Could not add to favorites.");
    }
  };

  if (!recipe) return <p>Loading...</p>

  return (
    <div>
      <button onClick={() => navigate(-1)}>🔙 Back</button>

      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} width="300" />
      <p><strong>Category:</strong> {recipe.strCategory}</p>
      <p><strong>Area:</strong> {recipe.strArea}</p>

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, i) => (
          <li key={i}>{ingredient}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <p>{recipe.strInstructions}</p>

      {recipe.strYoutube && (
        <div>
          <h3>Video Tutorial</h3>
          <a href={recipe.strYoutube} target="_blank" rel="noreferrer">
            Watch on YouTube
          </a>
        </div>
      )}

      {user && (
        <button
          onClick={handleAddToFavorites}
          disabled={added}
          style={{ marginTop: '1rem' }}
        >
          {added ? "❤️ Added to Favorites" : "🤍 Add to Favorites"}
        </button>
      )}
    </div>
  )
}