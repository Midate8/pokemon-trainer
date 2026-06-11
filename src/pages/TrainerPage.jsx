import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTrainer } from "../context/TrainerContext.jsx";
import "./trainerpage.css";

export default function TrainerPage() {
  const { user, logout } = useAuth();
  const { caughtPokemon, releasePokemon } = useTrainer();
  const navigate = useNavigate();

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

      {caughtPokemon.length === 0 ? (
        <p className="trainer-empty">
          You haven't caught any Pokémon yet.
        </p>
      ) : (
        <section className="trainer-grid">
          {caughtPokemon.map((pokemon) => (
            <article key={pokemon.id} className="trainer-card">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="trainer-card-image"
              />

              <h2 className="trainer-card-name">
                {pokemon.name}
              </h2>

              <button
                className="trainer-release-btn"
                onClick={() => releasePokemon(pokemon.id)}
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