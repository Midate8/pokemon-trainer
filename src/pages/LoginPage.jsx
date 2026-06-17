import { useState } from "react"
import loginUser from "../services/AuthService"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import "./LoginPage.css"

function LoginPage() {

    //States
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    // AuthContext
    const { login } = useAuth()

    // Navigate
    const navigate = useNavigate()

    // Pressing the login button
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

    // Website structure
    return (
        <>
            <br></br>
            <h1 className="p-login">Log in</h1>

            {/* Username */}
            <div className="normal-p">
            <input type="text" name="username" value={username}  placeholder="Username"  className="login-input" onChange={(e)=>setUsername(e.target.value)}></input></div>
            
            {/* Password */}
            <div className="normal-p">
            <input type="password"  placeholder="Password "  name="password" className="login-input" value={password} onChange={(e)=>setPassword(e.target.value)}></input></div>
            
            <br></br>
            <button onClick={handleSubmit} className="enter-button">Enter</button>

            {/* Error */}
            {error && <div className="normal-p">{error}</div>}
        </>
    )
}

export default LoginPage