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
    <header className="border-b border-gray-200 bg-white">
      <div className="flex justify-end items-center container mx-auto px-4 gap-1 text-[9px] md:text-[10px]">
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <img src={logoFaceBook} alt="Facebook" width={16} />
        </a>
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <img src={logoInstagram} alt="Instagram" width={16} />
        </a>
        <span className="uppercase">
          Avenida Florêncio Terra, 1530 - Centro - Itápolis/SP
        </span>
      </div>
      <nav className="flex justify-center md:justify-between items-center container mx-auto px-4 py-3">
        <Link to="/" className="w-28 sm:w-52">
          <img src={logoSite} alt="Logo" className="max-w-full" />
        </Link>
        <ul className="sm:flex flex-1 justify-end gap-3 mx-auto px-4 uppercase sm:text-sm hidden">
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
