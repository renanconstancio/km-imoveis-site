import { NavLink, Outlet } from "react-router-dom";

export default function Admin() {
  const classDefaultName = "p-5 hover:bg-gray-700";
  const activeClassName = "p-5 bg-gray-700";

  return (
    <div className="flex flex-1 h-screen bg-gray-100">
      <nav className="w-1/5 pl-5 py-5 h-screen bg-gray-800 text-white font-play flex flex-col">
        <NavLink
          to="/adm/immobiles"
          className={({ isActive }) =>
            isActive ? activeClassName : classDefaultName
          }
        >
          <i className="fa fa-home"></i> Imovéis
        </NavLink>
        <NavLink
          to="/adm/streets"
          className={({ isActive }) =>
            isActive ? activeClassName : classDefaultName
          }
        >
          <i className="fas fa-street-view"></i> Ruas
        </NavLink>
        <NavLink
          to="/adm/cities"
          className={({ isActive }) =>
            isActive ? activeClassName : classDefaultName
          }
        >
          <i className="fas fa-building"></i> Cidades
        </NavLink>
        <NavLink
          to="/adm/states"
          className={({ isActive }) =>
            isActive ? activeClassName : classDefaultName
          }
        >
          <i className="far fa-star"></i> Estados
        </NavLink>
      </nav>
      <main className="p-8 flex-1">
        <Outlet />
      </main>
    </div>
  );
}