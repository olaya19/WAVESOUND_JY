import "./SideLeft.css";


function SideLeft() {
  return (
    <aside className="sidebar-left">
      <div className="box">
        <h3>Artistas a seguir</h3>
        <ul>
          <li>
            <span>👤</span> Martista <button>➕</button>
          </li>
          <li>
            <span>👤</span> Lucita <button>➕</button>
          </li>
          <li>
            <span>👤</span> Luker <button>➕</button>
          </li>
        </ul>
      </div>

      <div className="box">
        <h3>Productores a seguir</h3>
        <ul>
          <li>
            <span>👤</span> Martista <button>➕</button>
          </li>
          <li>
            <span>👤</span> Lucita <button>➕</button>
          </li>
          <li>
            <span>👤</span> Luker <button>➕</button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideLeft;
