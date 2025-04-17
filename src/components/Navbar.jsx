import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";


export default function Navbar(){
    const {user, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    return(
        <nav>
            <Link to="/">Home</Link>
            {user ? (
                <>
                <Link to="/favorites">Favorite</Link>
                <span>Hello, {user?.username}</span> // ✅
                <button onClick={() => {logout(); navigate("/");}}>Logout</button>
                </>
            ) : (
                <>
                <Link to="/register">Register</Link>
                <Link to="/login">login</Link>
                </>
            )
            }
        </nav>
    )
}