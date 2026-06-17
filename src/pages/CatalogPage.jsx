import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { catchPokemon } from "../services/pokemonService";

import PokemonCard from "../components/PokemonCard"
import { useTrainer } from "../context/TrainerContext"; // Sarika added 
//Create all function in one place  (つ✧ω✧)つ
function CatalogPage() {
    const { token, username } = useAuth();
    const [pokemon, setPokemon] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    // List of caught Pokémon IDs
    const [caughtPokemon, setCaughtPokemon] = useState([]);
    useEffect(() => {
        async function fetchPokemon() {
            const response = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=151"
            );
            const data = await response.json();

            setPokemon(data.results);
        }

        fetchPokemon();
    }, []);
    // Create a new list with only Pokemon names (←_←) 
    const filteredPokemon = pokemon.filter((poke) => {
        return poke.name.includes(search.toLowerCase());
    });
    //Number of Pokemon per page  (＃￣ω￣)
    const pokemonPerPage = 20
    const startIndex = (currentPage - 1) * pokemonPerPage;
    const endIndex = startIndex + pokemonPerPage;
    const currentPokemon = filteredPokemon.slice(startIndex, endIndex);
    //Total number of pages <(￣︶￣)> 
    const totalPages = Math.ceil(filteredPokemon.length / pokemonPerPage);

    function getPokemonId(poke) {
        return Number(poke.url.split("/").filter(Boolean).pop());
    }
    async function handleCatch(number) {
        if (!token || !username) {
            alert("Please log in to catch Pokemon.")
            return;
        }
        try {
            await catchPokemon(number, token, username);
            setCaughtPokemon([...caughtPokemon, number]);
        } catch (error) {
            console.log(error);
            alert("Could not catch Pokemon.");
        }
    }


    return (
        <div>
            <h1>Pokemon Catalog</h1>
            <input
                type="text"
                placeholder="Search Pokemon"
                value={search}
                onChange={(Event) => setSearch(Event.target.value)}
            />
            {currentPokemon.map((poke, index) => (
                <PokemonCard
                    key={poke.name}
                    number={getPokemonId(poke)}
                    name={poke.name}
                    onCatch={handleCatch}
                    isCaught={caughtPokemon.includes(getPokemonId(poke))}
                ></PokemonCard>
            ))}
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}>
                Previous
            </button>

            <span> Page {currentPage} of {totalPages} </span>

            <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}>
                Next
            </button>
        </div>
    );
}

export default CatalogPage;








