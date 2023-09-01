import {
  faBars,
  faBug,
  faSignOut,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { greetingMessage } from "../../utils/functions";

export function NavDropDown() {
  const { auth, logout } = useAuth();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {open && (
        <div
          className="bg-black/50 fixed inset-0 z-10"
          onClick={() => setOpen(false)}
        ></div>
      )}
      <section className="bg-white -mx-4 h-16 px-8 mb-5 flex justify-end items-center relative z-10">
        <span className="uppercase text-xs px-4">
          {greetingMessage(auth?.name)}
        </span>
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
    </>
  );
}
