import {
  faEnvelope,
  faHome,
  faInfo,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import logoSite from "../../assets/logo.svg";
import logoFaceBook from "../../assets/facebook.svg";
import logoInstagram from "../../assets/instagram.svg";
import { toNumber } from "../../utils/functions";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 sm:relative z-[1001] border-b border-gray-200 bg-white">
      <nav className="flex justify-center items-center container mx-auto px-4 py-1 sm:py-3 md:justify-between">
        <Link to="/" className="w-20 sm:w-52">
          <img src={logoSite} alt="Logo" className="max-w-full" />
        </Link>
        <ul className="hidden sm:text-sm sm:flex flex-1 px-4 justify-end gap-3 mx-auto uppercase">
          <li>
            <Link
              to="/"
              className="p-2 sm:p-4 bg-slate-100 rounded-lg hidden md:inline"
            >
              <FontAwesomeIcon icon={faHome} /> Inicio
            </Link>
          </li>
          <li>
            <Link to="/search" className="p-2 sm:p-4 bg-slate-100 rounded-lg">
              <FontAwesomeIcon icon={faSearch} /> Imovéis
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="p-2 sm:p-4 bg-slate-100 rounded-lg hidden md:inline"
            >
              <FontAwesomeIcon icon={faInfo} /> Quem Somos
            </Link>
          </li>
          <li>
            <a
              href={`https://api.whatsapp.com/send?phone=${toNumber(
                `55${import.meta.env.VITE_PHONE}`,
              )}&text=`}
              target="_blank"
              rel="noreferrer"
              className="p-2 sm:p-4 bg-slate-100 rounded-lg"
            >
              <FontAwesomeIcon icon={faEnvelope} /> Contato
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
