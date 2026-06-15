import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { TrainerProvider } from "./context/TrainerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <TrainerProvider>
      <App />
    </TrainerProvider>
  </AuthProvider>
);



