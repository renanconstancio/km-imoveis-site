import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

import iconWhatsapp from "../../assets/whatsapp.svg";

export function Header() {
  return (
    <header>
      <div className="border-b border-gray-200 py-4">
        <nav className="flex justify-between items-center container mx-auto px-4">
          <Link to="/" className="basis-56">
            <img src={logo} alt="Logo" />
          </Link>
          <ul className="container flex justify-end gap-3 mx-auto px-4">
            <li className="flex gap-1">
              <img src={iconWhatsapp} width={20} />
              <span>{import.meta.env.VITE_PHONE}</span>
            </li>
            {/* <li>
              <FontAwesomeIcon icon={faMapPin} /> endereço aqui
            </li>
            <li>
              <i className="fab fa-facebook"></i>
            </li>
            <li>
              <i className="fab fa-instagram"></i>
            </li>
            <li>
              <i className="fab fa-whatsapp"></i>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
