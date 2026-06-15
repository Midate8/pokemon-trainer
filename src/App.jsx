import "./App.css";
import LoginPage from "./pages/LoginPage";
import TrainerPage from "./pages/TrainerPage";
import CatalogPage from "./pages/CatalogPage";
import Navbar from "./components/Navbar";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/trainer" element={<TrainerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;