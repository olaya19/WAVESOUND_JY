import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Home />} />

        {/* Iniciar sesión */}
        <Route path="/login" element={<Login />} />

        {/* Registrarse */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
