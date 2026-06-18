import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState, useEffect } from "react";
import "./trainerpage.css";
import { releasePokemon, displayPokemon } from "../services/pokemonService";

export default function TrainerPage() {
  const { token, username, user, logout } = useAuth();
  const [caughtPokemon, setCaughtPokemon] = useState([])
  const navigate = useNavigate();

  const [message, setMessage] = useState("");


  async function loadDisplay() {
    try {
      const ids = await displayPokemon(token, username)
      const details = await Promise.all(
        ids.map(async (id) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          const data = await response.json()
          return {
            id: data.id,
            name: data.name,
            image: data.sprites.front_default
          }
        })
      )
      setCaughtPokemon(details)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadDisplay()
  }, [])


  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="trainer-page">
      <header className="trainer-header">
        <h2>{user.username}'s Pokédex</h2>

        <button
          className="trainer-logout-btn"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Log out
        </button>
      </header>

      {message && (
        <p className="trainer-message">{message}</p>
      )}

      {caughtPokemon.length === 0 ? (
        <p className="trainer-empty">You haven't caught any Pokémon yet.</p>
      ) : (
        <section className="trainer-grid">
          {caughtPokemon.map((pokemon) => (
            <article key={pokemon.id} className="trainer-card">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="trainer-card-image"
              />

              <h2 className="trainer-card-name">{pokemon.name}</h2>

              <button
                className="trainer-release-btn"
                onClick={async () => {
                  await releasePokemon(pokemon.id, token, username);
                  setCaughtPokemon(prev => prev.filter(p => p.id !== pokemon.id));
                  setMessage(`You released ${pokemon.name}`);
                }}
              >
                Release
              </button>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

