import { NavLink } from "react-router-dom";
import {
  faBuilding,
  faDashboard,
  faHome,
  faList,
  faNetworkWired,
  faStar,
  faStreetView,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function NavLeft() {
  const classDefaultName = "p-4 hover:bg-gray-700";
  const activeClassName = "p-4 bg-gray-700";

  return (
    <nav className="basis-1/5 pl-5 py-3 h-screen bg-gray-800 text-white font-play flex flex-col overflow-y-auto">
      <NavLink to="/adm/" className={classDefaultName}>
        <FontAwesomeIcon icon={faDashboard} /> Dashboard
      </NavLink>
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
        to="/adm/tenants"
        className={({ isActive }) =>
          isActive ? activeClassName : classDefaultName
        }
      >
        <FontAwesomeIcon icon={faUser} /> Locatários
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
    </nav>
  );
}
