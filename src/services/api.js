export const getResipes = async () => {
    const res = await fetch("https://fsa-recipe.up.railway.app/api/recipes");
    const data = res.json();
    return data
}

export const getRecipesById = async (id) => {
    const res = await  fetch(`https://fsa-recipe.up.railway.app/api/recipes/${id}`)
    const data = res.json();
    return data
}

export const getFavorites = async (token) => {
    const res = await fetch(`https://fsa-recipe.up.railway.app/api/favorites`, {
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    return res.json();
}

export const addFavorites = async (token, meal) => {
    const res = await fetch(`https://fsa-recipe.up.railway.app/api/favorites`, {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body :JSON.stringify(meal),
    })
    return res.json();

}

export const deleteFavorite = async(token, id) => {
    const res = await fetch(`https://fsa-recipe.up.railway.app/api/favorites/${id}`,{
        method : "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res.json();
}