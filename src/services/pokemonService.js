const API_URL = "https://dig-tal-case-api-emdpbma2bte6ftgz.westeurope-01.azurewebsites.net"



// Catching (storing) pokemon
export async function catchPokemon(pokemonId, token, username) {

    const response = await fetch(`${API_URL}/users/${username}/pokemon`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({pokemonId}) //ID is inputted as a raw number here
    })

    if(!response.ok) throw new Error("Could not catch Pokémon")

    const data = await response.json()

    return data
}


// Releasing pokemon
export async function releasePokemon(pokemonId, token, username) {

    const response = await fetch(`${API_URL}/users/${username}/pokemon`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({pokemonId}) //ID is inputted as a raw number here
    })

    if(!response.ok) throw new Error("Could not release Pokémon")

    const data = await response.json()

    return data
}


// Displaying Pokemon
// #TODO (?)