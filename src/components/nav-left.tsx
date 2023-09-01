import { NavLink } from "react-router-dom";
import {
  faBars,
  faBuilding,
  faDashboard,
  faHome,
  faList,
  faNetworkWired,
  faStar,
  faStreetView,
  faTimes,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import imgLogo from "../assets/logo.png";

export function NavLeft() {
  const [open, setOpen] = useState<boolean>(false);

  const classDefaultName =
    "p-4 bg-zinc-200 hover:bg-zinc-400 rounded-s-lg uppercase";
  const activeClassName = "p-4 bg-zinc-300 rounded-s-lg uppercase";

  return (
    <>
      <span className="fixed z-50 w-14 h-14 bg-zinc-50 flex md:hidden items-center justify-center">
        {!open ? (
          <FontAwesomeIcon
            icon={faBars}
            className="text-3xl cursor-pointer text-white"
            onClick={() => setOpen(!open)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faTimes}
            className="text-3xl cursor-pointer text-white"
            onClick={() => setOpen(!open)}
          />
        )}
      </span>

      <nav
        className={`w-full ${
          !open ? "hidden" : "flex pt-14"
        } absolute z-40 md:static md:basis-1/5 pl-5 py-3 h-screen bg-zinc-200 text-zinc-700 font-play md:flex flex-col overflow-y-auto space-y-1`}
      >
        <span className="h-16">
          <img src={imgLogo} alt="Logo" className="h-14" />
        </span>
        <NavLink to="/adm/" className={classDefaultName}>
          <FontAwesomeIcon icon={faDashboard} /> Dashboard
        </NavLink>
        <NavLink
          to="/adm/immobiles?order[reference]=desc"
          className={({ isActive }) =>
            isActive ? activeClassName : classDefaultName
          }
        >
          <FontAwesomeIcon icon={faHome} /> Imóveis
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
    </>
  );
}
