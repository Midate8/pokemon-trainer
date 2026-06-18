import './Navbar.css'
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import welcomeLogo from "../assets/WelcomeText.png"

function Navbar() {
  const { username, user, logout } = useAuth();

  return (
    <nav>
      <ul>
        <li><img src={welcomeLogo} alt="logo" /></li>
        <li><Link to="/">Catalog</Link></li>
        <li><Link to="/trainer">Trainer</Link></li>
        {user ? (
          <li>
            <span>🐱{username} </span>
            <button onClick={logout} className="nav-btn">Logout</button>
          </li>
        ) : (
          <li><Link to="/login" className="nav-btn">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;