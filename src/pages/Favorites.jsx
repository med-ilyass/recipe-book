// pages/Favorites.jsx
import { useEffect, useState, useContext } from "react"
import { AuthContext } from "../context/AuthContext"

export default function Favorites() {
  const { token, user } = useContext(AuthContext)
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchFavorites = async () => {
    const res = await fetch("https://fsa-recipe.up.railway.app/api/favorites", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()
    setFavorites(data.data || [])
    setLoading(false)
  }

  useEffect(() => {
    if (token) {
      fetchFavorites()
    }
  }, [token])

  const removeFavorite = async (favId) => {
    const confirm = window.confirm("Are you sure you want to remove this favorite?")
    if (!confirm) return

    await fetch(`https://fsa-recipe.up.railway.app/api/favorites/${favId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // Refresh list
    setFavorites(prev => prev.filter(fav => fav.id !== favId))
  }

  if (!user) return <p>Please log in to view your favorites.</p>
  if (loading) return <p>Loading your favorites...</p>
  if (favorites.length === 0) return <p>You don’t have any favorites yet.</p>

  return (
    <div>
      <h2>{user.username}'s Favorite Recipes ❤️</h2>
      <div className="recipe-grid">
        {favorites.map(fav => (
          <div key={fav.id} className="recipe-card">
            <img src={fav.imageUrl} alt={fav.name} width="200" />
            <h3>{fav.name}</h3>
            <p>{fav.strArea}</p>
            <button onClick={() => removeFavorite(fav.id)}>❌ Remove</button>
          </div>
        ))}
      </div>
    </div>
  )
}