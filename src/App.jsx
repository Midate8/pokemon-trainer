import { BrowserRouter, Routes, Route } from "react-router-dom";
import CatalogPage from "./pages/CatalogPage";
import TrainerPage from "./pages/TrainerPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/trainer" element={<TrainerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;