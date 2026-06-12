import { catchPokemon, releasePokemon, returnPokemon } from "../services/pokemonService"
import { useState } from "react"
import { useAuth } from "../context/authContext"

function CatalogPage() {

    const [pokeID, setPokeID] = useState("")
    const [error, setError] = useState("")
    const { token, username } = useAuth()

    async function handleAdd() {
        setError(null)
        try {
            const result = await catchPokemon(pokeID, token, username)
            console.log(result)
            console.log("Successfully caught a pokemon!")
        }
        catch (err) {
            setError(err.message)
        }
    }

    async function handleRemove() {
        setError(null)
        try {
            const result = await releasePokemon(pokeID, token, username)
            console.log(result)
            console.log("Successfully released a pokemon!")
        }
        catch (err) {
            setError(err.message)
        }
    }

    async function displayPokemonArray() {
        const result = await returnPokemon(token, username)
        console.log(result)
    }

    return (
        <>
            <input type="number" value={pokeID} onChange={(e) => setPokeID(e.target.value)}></input>
            <p></p><button onClick={handleAdd}>Add pokemon</button>
            <p></p><button onClick={handleRemove}>Release pokemon</button>
            <p></p><button onClick={displayPokemonArray}>Console Log</button>

            {/* Error */}
            {error && <p>{error}</p>}
        </>
    )
}

export default CatalogPage