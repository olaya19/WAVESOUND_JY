import { useState } from "react";
import "./Nav.css";

function Nav() {
  const [active, setActive] = useState("home");

  return (
    <nav className="navbar">
      <div className="logo">
        WaveSound <i className="fa-solid fa-music"></i>
      </div>

      <input className="search" type="text" placeholder="Buscar..." />

      <div className="icons">
        <i
          className={`fa-solid fa-house ${active === "home" ? "active" : ""}`}
          onClick={() => setActive("home")}
        ></i>
        <i
          className={`fa-solid fa-user ${active === "profile" ? "active" : ""}`}
          onClick={() => setActive("profile")}
        ></i>
        <i
          className={`fa-solid fa-shield ${active === "shield" ? "active" : ""}`}
          onClick={() => setActive("shield")}
        ></i>
        <i
          className={`fa-solid fa-bars ${active === "menu" ? "active" : ""}`}
          onClick={() => setActive("menu")}
        ></i>
      </div>
    </nav>
  );
}

export default Nav;
