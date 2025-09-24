import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Nav from "./components/Nav";      // 🔹 Navbar
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile"; // 🔹 NUEVO
import WorkRegister from "./pages/WorkRegister";

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

          {/* Redirección default */}
          <Route path="*" element={<Home />} />

          {/* Redirección Registrar Obra */}
          <Route path="*" element={<WorkRegister/>} />


        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

