const API_URL = "https://dig-tal-case-api-emdpbma2bte6ftgz.westeurope-01.azurewebsites.net"

export default async function loginUser(username, password) {

    // API Checks username and password
    const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    })

    if(!response.ok) throw new Error("Invalid Username or Password")

    const data = await response.json()

    return data.token
}