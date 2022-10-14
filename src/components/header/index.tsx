import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";

export function Header() {
  return (
    <header>
      <div className="border-b border-gray-200 py-2">
        <nav className="flex justify-between items-center container mx-auto px-4">
          <Link to="/" className="w-40">
            <img src={logo} alt="Logo" />
          </Link>
          <ul className="container flex justify-end gap-3 mx-auto px-4">
            <li>
              <i className="fas fa-phone"></i> (00) 00000-0000
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i> endereço aqui
            </li>
            <li>
              <i className="fab fa-facebook"></i>
            </li>
            <li>
              <i className="fab fa-instagram"></i>
            </li>
            <li>
              <i className="fab fa-whatsapp"></i>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
