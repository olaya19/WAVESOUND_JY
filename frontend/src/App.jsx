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
import DerechosAutor from "./pages/DerechosAutor";
import Playlist from "./pages/Playlist";
import MisFavoritos from "./pages/MisFavoritos";
import MiniPlayer from "./components/MiniPLayer";

// Contexto global del reproductor
import { PlayerProvider } from "./context/PlayerContext";

function Layout({ children }) {
  const location = useLocation();
  const hideNav = ["/login", "/register"].includes(location.pathname.toLowerCase());

  return (
    <>
      {!hideNav && <Nav />}
      {children}
      <MiniPlayer /> {/* Reproductor global */}
    </>
  );
}

function App() {
  return (
    <Router>
      <PlayerProvider>
        <Layout>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path="/derechosautor" element={<DerechosAutor />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/mis-favoritos" element={<MisFavoritos />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </PlayerProvider>
    </Router>
  );
}

export default App;
