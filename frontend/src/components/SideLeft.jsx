import "./SideLeft.css";

function SideLeft() {
  const goToProfile = (username) => {
    alert(`Ir al perfil de ${username}`);
    // 🚀 Aquí luego lo reemplazas con tu navegación real
    // ej: window.location.href = `/perfil/${username}`;
  };

  return (
    <aside className="sidebar-left">
      <div className="box">
        <h3>Artistas a seguir</h3>
        <ul>
          <li>
            <span className="icon-circle" onClick={() => goToProfile("Martista")}>
              <i className="fa-solid fa-user"></i>
            </span>
            Martista
            <button className="btn-circle">
              <i className="fa-solid fa-user-plus"></i>
            </button>
          </li>
          <li>
            <span className="icon-circle" onClick={() => goToProfile("Lucita")}>
              <i className="fa-solid fa-user"></i>
            </span>
            Lucita
            <button className="btn-circle">
              <i className="fa-solid fa-user-plus"></i>
            </button>
          </li>
          <li>
            <span className="icon-circle" onClick={() => goToProfile("Luker")}>
              <i className="fa-solid fa-user"></i>
            </span>
            Luker
            <button className="btn-circle">
              <i className="fa-solid fa-user-plus"></i>
            </button>
          </li>
        </ul>
      </div>

      <div className="box">
        <h3>Productores a seguir</h3>
        <ul>
          <li>
            <span className="icon-circle" onClick={() => goToProfile("Martista")}>
              <i className="fa-solid fa-user"></i>
            </span>
            Martista
            <button className="btn-circle">
              <i className="fa-solid fa-user-plus"></i>
            </button>
          </li>
          <li>
            <span className="icon-circle" onClick={() => goToProfile("Lucita")}>
              <i className="fa-solid fa-user"></i>
            </span>
            Lucita
            <button className="btn-circle">
              <i className="fa-solid fa-user-plus"></i>
            </button>
          </li>
          <li>
            <span className="icon-circle" onClick={() => goToProfile("Luker")}>
              <i className="fa-solid fa-user"></i>
            </span>
            Luker
            <button className="btn-circle">
              <i className="fa-solid fa-user-plus"></i>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideLeft;
