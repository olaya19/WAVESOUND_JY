import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"; 
import "@fortawesome/fontawesome-free/css/all.min.css";

import Nav from "./components/Nav";      // 🔹 Navbar
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";   // 🔹 Perfil
import Upload from "./pages/Upload";     // 🔹 Falta importar Upload
import AdminPanel from "./pages/AdminPanel"; // 🔹 Panel Admin

// ✅ Componente para mostrar/ocultar Nav según la ruta
function Layout({ children }) {
  const location = useLocation();
  const hideNav = ["/Login", "/Register"].includes(location.pathname);
  return (
    <>
      {!hideNav && <Nav />}
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Página principal */}
          <Route path="/Home" element={<Home />} />

          {/* Perfil */}
          <Route path="/Profile" element={<Profile />} />

          {/* Iniciar sesión */}
          <Route path="/Login" element={<Login />} />

          {/* Registrarse */}
          <Route path="/Register" element={<Register />} />

          {/* Subir música */}
          <Route path="/Upload" element={<Upload />} />

          {/* Panel Administrador */}
          <Route path="/AdminPanel" element={<AdminPanel />} />

          {/* Redirección default */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;


