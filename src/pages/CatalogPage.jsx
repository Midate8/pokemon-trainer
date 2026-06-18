import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { catchPokemon, displayPokemon } from "../services/pokemonService";
import PokemonCard from "../components/PokemonCard"
import "./CatalogPage.css"

// Main catalog page component  (つ✧ω✧)つ
function CatalogPage() {

    // Get login data from AuthContext 
    const { token, username } = useAuth();

    // Main states for the component (￣︶￣)
    const [pokemon, setPokemon] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // local list of caught Pokemon IDs (￣ω￣)
    const [caughtPokemon, setCaughtPokemon] = useState([]);

    //Fetch the first 151 Pokemon from the PokeAPI when the component mounts (╯✧▽✧)╯
    useEffect(() => {
        async function fetchPokemon() {
            const response = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=151"
            );
            const data = await response.json();

            if (token && username) {
                const ids = await displayPokemon(token, username);
                setCaughtPokemon(ids);
            }
            const pokemonWithDetails = await Promise.all(
                data.results.map(async (poke) => {
                    const detailsResponse = await fetch(poke.url);
                    const pokeData = await detailsResponse.json();

                    return {
                        name: poke.name,
                        id: pokeData.id,
                        types: pokeData.types.map((item) => item.type.name),
                        height: pokeData.height / 10, // Convert to meters
                        weight: pokeData.weight / 10, // Convert to kg
                        isCaught: caughtPokemon.includes(getPokemonId(poke))
                    };
                })
            );
            setPokemon(pokemonWithDetails);
        }


        fetchPokemon();
    }, []);
    // Filter Pokémon by search text, lowercase makes search work with Char, char, CHAR (⌐■_■)
    const filteredPokemon = pokemon.filter((poke) => {
        return poke.name.includes(search.toLowerCase());
    });

    // Pagination setup: 20 Pokemon per page(＃￣ω￣)
    const pokemonPerPage = 20
    const startIndex = (currentPage - 1) * pokemonPerPage;
    const endIndex = startIndex + pokemonPerPage;
    const currentPokemon = filteredPokemon.slice(startIndex, endIndex);


    // Total number of pages <(￣︶￣)> 
    const totalPages = Math.ceil(filteredPokemon.length / pokemonPerPage);

    // Get real Pokemon ID from the URL (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
    function getPokemonId(poke) {
        return Number(poke.url.split("/").filter(Boolean).pop());
    }

    //// Catch Pokemon through teacher API (ง'̀-'́)ง
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
        <div className="catalog-default">
            <div className="catalog-header">
                {/* BUTTONS */}
                <div className="page-button">
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

                <h1>Pokemon Catalog</h1>
                <input
                    type="text"
                    placeholder="Search Pokemon"
                    value={search}
                    onChange={(Event) => setSearch(Event.target.value)}
                />
            </div>
            <div className="Pokegrid">
                {currentPokemon.map((poke, index) => (
                    <PokemonCard
                        key={poke.name}
                        number={poke.id}
                        name={poke.name}
                        types={poke.types}
                        height={poke.height}
                        weight={poke.weight}
                        onCatch={handleCatch}
                        isCaught={caughtPokemon.includes(poke.id)}
                    ></PokemonCard>

                ))}</div>

        </div>
    );
}

export default CatalogPage;
