import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./ESTILOS/tipografias.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Importa el PlayerProvider
import { PlayerProvider } from "./context/PlayerContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PlayerProvider>
      <App />
    </PlayerProvider>
  </StrictMode>
);
