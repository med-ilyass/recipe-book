import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    useEffect(() => {
        if(token){
            fetch(`https://fsa-recipe.up.railway.app/api/auth/me`, {
                headers:{
                    Authorization:`bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => setUser(data));
        }
    },[token]);

    const login = (token) => {
        localStorage.setItem('tokem', token);
        setToken(token);
    }

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null)
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{ token, user, login, logout }}>
  {children}
</AuthContext.Provider>
    )
}