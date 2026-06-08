import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TrainerPage from "./pages/TrainerPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/trainer" element={<TrainerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
