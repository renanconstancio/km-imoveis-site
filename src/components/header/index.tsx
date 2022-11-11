import {
  faEnvelope,
  faHome,
  faInfo,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import logoSite from "../../assets/logo.svg";
import { toNumber } from "../../utils/functions";

export function Header() {
  return (
    <header className="border-b border-gray-200 py-4 bg-white">
      <nav className="flex justify-between items-center container mx-auto px-4">
        <Link to="/" className="w-24 sm:w-44">
          <img src={logoSite} alt="Logo" className="max-w-full" />
        </Link>
        <ul className="flex flex-1 justify-end gap-2 mx-auto px-4 uppercase text-sm">
          <li>
            <Link
              to="/"
              className="p-2 sm:p-3 bg-slate-100 rounded-lg hidden md:inline"
            >
              <FontAwesomeIcon icon={faHome} /> Inicio
            </Link>
          </li>
          <li>
            <Link to="/search" className="p-2 sm:p-3 bg-slate-100 rounded-lg">
              <FontAwesomeIcon icon={faSearch} /> Imovéis
            </Link>
          </li>{" "}
          <li>
            <Link
              to="/"
              className="p-2 sm:p-3 bg-slate-100 rounded-lg hidden md:inline"
            >
              <FontAwesomeIcon icon={faInfo} /> Quem Somos
            </Link>
          </li>
          <li>
            <a
              href={`https://api.whatsapp.com/send?phone=${toNumber(
                `55${import.meta.env.VITE_PHONE}`,
              )}&text=Olá, gostaria de saber mais infomações sobre casa para locação`}
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:p-3 bg-slate-100 rounded-lg"
            >
              <FontAwesomeIcon icon={faEnvelope} /> Contato
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
