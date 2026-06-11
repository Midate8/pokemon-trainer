import { useState } from "react"
import loginUser from "../services/AuthService"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function LoginPage() {

    //States
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    // AuthContext
    const { login } = useAuth()

    // Navigate
    const navigate = useNavigate()

    async function handleSubmit() {
        setError(null)
        try {
            const token = await loginUser(username, password)
            login(token, username)
            navigate("/") //Navigate to where you want after login
        }
        catch(err){
            setError(err.message)
        }

    }

    return (
        <>
            <p>Log in</p>

            {/* Username */}
            <p><span>Username: </span>
            <input type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)}></input></p>
            
            {/* Password */}
            <p><span>Password: </span><input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input></p>
            
            {/* Error */}
            {error && <p>{error}</p>}
            
            <button onClick={handleSubmit}>Enter</button>
        </>
    )
}

export default LoginPage