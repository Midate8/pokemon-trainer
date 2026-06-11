import './Navbar.css'
import { NavLink, useNavigate } from "react-router"
import { useAuth } from '../context/authContext'


function Navbar() {

    // AuthContext
    const { username, logout, isLoggedIn } = useAuth()

    // Navigation
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate("/login")
    }


    return (
        <nav>
            <ul>
                <li><NavLink to="/">Catalog</NavLink></li>
                <li><NavLink to="/Trainer">Trainer</NavLink></li>
                {isLoggedIn ? (
                    <>
                        <span>{username}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <li><NavLink to="/Login">Login</NavLink></li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar