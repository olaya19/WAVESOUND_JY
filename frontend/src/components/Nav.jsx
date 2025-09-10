import { useState } from "react";
import "./Nav.css";

function Nav() {
  const [active, setActive] = useState("home"); // valor inicial

  return (
    <nav className="navbar">
      <div className="logo">WaveSound 🎵</div>
      <input className="search" type="text" placeholder="Buscar..." />
      <div className="icons">
        <span
          className={active === "home" ? "active" : ""}
          onClick={() => setActive("home")}
        >
          🏠
        </span>
        <span
          className={active === "profile" ? "active" : ""}
          onClick={() => setActive("profile")}
        >
          👤
        </span>
        <span
          className={active === "shield" ? "active" : ""}
          onClick={() => setActive("shield")}
        >
          🛡️
        </span>
        <span
          className={active === "menu" ? "active" : ""}
          onClick={() => setActive("menu")}
        >
          ☰
        </span>
      </div>
    </nav>
  );
}

export default Nav;