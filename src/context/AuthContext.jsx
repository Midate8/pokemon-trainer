import { createContext, useContext, useState } from "react"

// Context
const AuthContext = createContext(null)

// Provider
export function AuthProvider({children}) {

    const [token, setToken] = useState(localStorage.getItem("token") || null)
    const [username, setUsername] = useState(localStorage.getItem("username") || null)

    function login(token, username) {
        localStorage.setItem("token", token)
        localStorage.setItem("username", username)
        setToken(token)
        setUsername(username)
    }

    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        setToken(null)
        setUsername(null)
    }

    return (
        <AuthContext.Provider value={{token, username, login, logout, isLoggedIn: !!token}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error("Please call within AuthProvider")
    return context
}