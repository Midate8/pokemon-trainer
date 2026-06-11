import "./App.css";
import LoginPage from "./pages/LoginPage";
import TrainerPage from "./pages/TrainerPage";
import CatalogPage from "./pages/CatalogPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/trainer" element={<TrainerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;