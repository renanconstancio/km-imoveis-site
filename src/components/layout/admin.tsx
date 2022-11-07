import {
  faBuilding,
  faHome,
  faList,
  faNetworkWired,
  faSignOut,
  faStar,
  faStreetView,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Outlet } from "react-router-dom";
import { useAlert } from "../../hooks/use-alert";
import { useAuth } from "../../hooks/use-auth";
import { Login } from "../../pages/admin-login";
import { Alert } from "../alert";

export default function Admin() {
  const classDefaultName = "p-5 hover:bg-gray-700";
  const activeClassName = "p-5 bg-gray-700";

  const { alert } = useAlert();
  const { auth, logout } = useAuth();

  return !auth?.id ? (
    <Login />
  ) : (
    <div className="flex flex-row h-screen bg-gray-100 overflow-hidden">
      <nav className="basis-1/5 pl-5 py-5 h-screen bg-gray-800 text-white font-play flex flex-col">
        <NavLink
          to="/adm/immobiles"
          className={({ isActive }) =>
            isActive ? activeClassName : classDefaultName
          }
        >
          <FontAwesomeIcon icon={faHome} /> Imovéis
        </NavLink>
        <NavLink
          to="/adm/owners"
          className={({ isActive }) =>
            isActive ? activeClassName : classDefaultName
          }
        >
          <FontAwesomeIcon icon={faUserTie} /> Proprietários
        </NavLink>
        <NavLink
          to="/adm/customers"
          className={({ isActive }) =>
            isActive ? activeClassName : classDefaultName
          }
        >
          <FontAwesomeIcon icon={faUser} /> Inquilinos
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
        <NavLink
          to="/adm/users"
          className={({ isActive }) =>
            isActive ? activeClassName : classDefaultName
          }
        >
          <FontAwesomeIcon icon={faUser} /> Usuários
        </NavLink>
        <span className="cursor-pointer" onClick={logout}>
          <FontAwesomeIcon icon={faSignOut} /> Sair
        </span>
      </nav>
      <main className="basis-4/5 p-8 overflow-y-auto">
        {alert.message && <Alert message={alert.message} title={alert.title} />}
        <Outlet />
      </main>
    </div>
  );
}
