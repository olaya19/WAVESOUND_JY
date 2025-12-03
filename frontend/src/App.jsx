import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"; 
import "@fortawesome/fontawesome-free/css/all.min.css";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import AdminPanel from "./pages/AdminPanel";
import Menu from "./pages/Menu";
import DerechosAutor from "./pages/DerechosAutor"; // 🔹 Página de Derechos de Autor

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
          <Route path="/Home" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Upload" element={<Upload />} />
          <Route path="/AdminPanel" element={<AdminPanel />} />
          <Route path="/DerechosAutor" element={<DerechosAutor />} /> {/* 🔹 Nueva ruta */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;


