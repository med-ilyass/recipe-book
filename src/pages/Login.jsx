import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";


export default function Login(){
    const { Login } = useContext(AuthContext)
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`https://fsa-recipe.up.railway.app/api/auth/login`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({username, password}),
        });
        const data = res.json();
        if(data.token){
            login(data.token)
        }else{
            alert("Invalid login");
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
            <button type="submit">Login</button>
        </form>
    );
    
}