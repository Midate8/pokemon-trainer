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
            <h2 className="p-login">Log in</h2>

            {/* Username */}
            <p className="normal-p"><div className="input-info">Username:</div>
            <input type="text" name="username" value={username} className="login-input" onChange={(e)=>setUsername(e.target.value)}></input></p>
            
            {/* Password */}
            <p className="normal-p"><div className="input-info">Password: </div><input type="password" name="password" className="login-input" value={password} onChange={(e)=>setPassword(e.target.value)}></input></p>
            
            {/* Error */}
            {error && <p className="normal-p">{error}</p>}
            
            <button onClick={handleSubmit} className="enter-button">Enter</button>
        </>
    )
}

export default LoginPage