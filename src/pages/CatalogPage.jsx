import { useEffect, useState } from "react";
import PokemonCard from "C:/Users/midat/OneDrive/Desktop/Pokemon Projects/pokemon-trainer/src/components/PokemonCard"

//Create pokemon list (つ✧ω✧)つ
function CatalogPage(){
    const [pokemon, setPokemon] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        async function fetchPokemon(){
            const response = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=151"
            );
            const data = await response.json();
            
            setPokemon(data.results);
        }
        //Start function ＼(〇_ｏ)／ 
        fetchPokemon();
    },[]);
// Create a new list with only Pokemon names (←_←) 
    const filteredPokemon = pokemon.filter((poke) => {
        return poke.name.includes(search);
});
//Number of Pokemon per page  (＃￣ω￣)
    const pokemonPerPage = 20
    const startIndex = (currentPage - 1) * pokemonPerPage;
    const endIndex = startIndex + pokemonPerPage;
    const currentPokemon = filteredPokemon.slice(startIndex, endIndex);
//Total number of pages <(￣︶￣)> 
    const totalPages = Math.ceil(filteredPokemon.length/pokemonPerPage);
return(
    <div>
        <h1>Pokemon Catalog</h1>
        <input
        type="text"
        placeholder="Search Pokemon"
        value={search}
        onChange={(Event) => setSearch(Event.target.value)}
        />
        {currentPokemon.map((poke, index)=>(
            <PokemonCard
            key={poke.name}
            number={startIndex + index +1}
            name={poke.name}
            />
        ))}
<button onClick={()=> setCurrentPage(currentPage - 1)}>
    Previous
</button>

<span> Page {currentPage} of {totalPages} </span>

<button onClick={()=> setCurrentPage(currentPage + 1)}>
    Next
</button>
</div>
);
}

export default CatalogPage;