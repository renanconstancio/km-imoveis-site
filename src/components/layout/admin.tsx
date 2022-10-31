import {
  faBuilding,
  faHome,
  faList,
  faNetworkWired,
  faSignOut,
  faStar,
  faStreetView,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Outlet } from "react-router-dom";
import { useAlert } from "../../hooks/use-alert";
import { useAuth } from "../../hooks/use-auth";
import { Login } from "../../pages/login";
import { Alert } from "../alert";

export default function Admin() {
  const classDefaultName = "p-5 hover:bg-gray-700";
  const activeClassName = "p-5 bg-gray-700";

  const { alert } = useAlert();
  const { auth, logout } = useAuth();

  return !auth?.id ? (
    <Login />
  ) : (
    <div className="flex flex-1 h-screen bg-gray-100 overflow-hidden">
      <nav className="w-1/5 pl-5 py-5 h-screen bg-gray-800 text-white font-play flex flex-col fixed inset-0">
        <NavLink
          to="/adm/immobiles"
          className={({ isActive }) =>
            isActive ? activeClassName : classDefaultName
          }
        >
          <FontAwesomeIcon icon={faHome} /> Imovéis
        </NavLink>
        <NavLink
          to="/adm/categories"
          className={({ isActive }) =>
            isActive ? activeClassName : classDefaultName
          }
        >
          <FontAwesomeIcon icon={faList} /> Categorias
        </NavLink>

        <NavLink
          to="/adm/streets"
          className={({ isActive }) =>
            isActive ? activeClassName : classDefaultName
          }
        >
          <FontAwesomeIcon icon={faStreetView} /> Ruas
        </NavLink>
        <NavLink
          to="/adm/neighborhoods"
          className={({ isActive }) =>
            isActive ? activeClassName : classDefaultName
          }
        >
          <FontAwesomeIcon icon={faNetworkWired} /> Bairros
        </NavLink>
        <NavLink
          to="/adm/cities"
          className={({ isActive }) =>
            isActive ? activeClassName : classDefaultName
          }
        >
          <FontAwesomeIcon icon={faBuilding} /> Cidades
        </NavLink>
        <NavLink
          to="/adm/states"
          className={({ isActive }) =>
            isActive ? activeClassName : classDefaultName
          }
        >
          <FontAwesomeIcon icon={faStar} /> Estados
        </NavLink>
        <span className="cursor-pointer" onClick={logout}>
          <FontAwesomeIcon icon={faSignOut} /> Sair
        </span>
      </nav>
      <main className="p-8 w-4/5 overflow-y-auto ml-[20%]">
        {alert.message && <Alert message={alert.message} title={alert.title} />}
        <Outlet />
      </main>
    </div>
  );
}
