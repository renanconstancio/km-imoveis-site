import {
  faBars,
  faBug,
  faBuilding,
  faDashboard,
  faDotCircle,
  faHome,
  faList,
  faNetworkWired,
  faSignOut,
  faStar,
  faStreetView,
  faTimes,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAlert } from "../../hooks/use-alert";
import { useAuth } from "../../hooks/use-auth";
import { Login } from "../../pages/admin-login";
import { Alert } from "../alert";

export default function Admin() {
  const classDefaultName = "p-4 hover:bg-gray-700";
  const activeClassName = "p-4 bg-gray-700";

  const [open, setOpen] = useState<boolean>(false);

  const { alert } = useAlert();
  const { auth, logout } = useAuth();

  // useEffect(() => {
  //   // window.addEventListener("click", () => {
  //   //   if (!open) setOpen(false);
  //   // });
  //   // return () => {
  //   //   window.removeEventListener("click", () => {
  //   //     if (open) setOpen(false);
  //   //   });
  //   // };
  // }, []);

  return !auth?.id ? (
    <Login />
  ) : (
    <div className="flex flex-row h-screen bg-gray-100 overflow-hidden">
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
      </nav>
      <main className="basis-4/5 p-8 overflow-y-auto">
        <section className="bg-white -m-8 p-2 px-8 mb-5 flex justify-end relative">
          {!open ? (
            <FontAwesomeIcon
              icon={faBars}
              className="text-3xl cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faTimes}
              className="text-3xl cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          )}
          <div
            className={`${
              !open ? "hidden" : ""
            } z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-[100%]`}
          >
            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
              {auth?.type === "root" && (
                <li>
                  <NavLink
                    to="/adm/logs"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <FontAwesomeIcon icon={faBug} /> Logs
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  to="/adm/users"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <FontAwesomeIcon icon={faUser} /> Usuários
                </NavLink>
              </li>
            </ul>
            <div className="py-1">
              <a
                onClick={logout}
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                <FontAwesomeIcon icon={faSignOut} /> Sair
              </a>
            </div>
          </div>
        </section>

        {alert.message && <Alert message={alert.message} title={alert.title} />}

        <Outlet />
      </main>
    </div>
  );
}
