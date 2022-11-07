import { faHome, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

import iconWhatsapp from "../../assets/whatsapp.svg";

export function Header() {
  return (
    <header>
      <div className="border-b border-gray-200 py-4">
        <nav className="flex justify-between items-center container mx-auto px-4">
          <Link to="/" className="basis-64">
            <img src={logo} alt="Logo" />
          </Link>
          <ul className="basis-full flex justify-end gap-3 mx-auto px-4">
            <li></li>
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} /> Inicio
              </Link>
            </li>
            <li>
              <Link to="/search">
                <FontAwesomeIcon icon={faSearch} /> Imovéis
              </Link>
            </li>
            <li>
              <Link className="flex gap-1" to="/">
                <img src={iconWhatsapp} width={18} />
                <span>Contato {import.meta.env.VITE_PHONE}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
