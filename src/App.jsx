import './App.css'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import TrainerPage from './pages/TrainerPage'
import CatalogPage from './pages/CatalogPage'
import { AuthProvider } from './context/authContext'
import { BrowserRouter, Routes, Route } from 'react-router'

function App() {

  // REMEMBER TO WRAP APP IN AUTH PROVIDER
  // Temporarily added LoginPage instead of app
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Trainer" element={<TrainerPage />} />
            <Route path="/" element={<CatalogPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
