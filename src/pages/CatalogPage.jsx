import { useEffect, useState } from "react";

//Create pokemon list (つ✧ω✧)つ
function CatalogPage(){
    const [pokemon, setPokemon] = useState([]);

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
return(
    <div>
        <h1>Pokemon Catalog</h1>
        {pokemon.map((poke)=>(
            <p key={poke.name}>{poke.name}</p>
        ))}
    </div>
);
}

export default CatalogPage;