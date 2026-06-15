import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { username, user, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Catalog</Link> |{" "}
      <Link to="/trainer">Trainer</Link> |{" "}
      {user ? (
        <>
        <span>{username}</span>
        <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}

export default Navbar;