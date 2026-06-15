import { createContext, useContext, useState } from "react";

const TrainerContext = createContext();

export function TrainerProvider({ children }) {
  const [caughtPokemon, setCaughtPokemon] = useState([
    {
      id: 25,
      name: "Pikachu",
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    }
  ]);

  function catchPokemon(pokemon) {
    setCaughtPokemon((prev) => [...prev, pokemon]);
  }

  function releasePokemon(id) {
    setCaughtPokemon((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <TrainerContext.Provider
      value={{ caughtPokemon, catchPokemon, releasePokemon }}
    >
      {children}
    </TrainerContext.Provider>
  );
}

export function useTrainer() {
  return useContext(TrainerContext);
}