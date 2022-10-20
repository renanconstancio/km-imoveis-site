import { NavLink, Outlet } from "react-router-dom";
import { useAlert } from "../../hooks/use-alert";
import { useAuth } from "../../hooks/use-auth";
import { Login } from "../../pages/login";
import { Alert } from "../alert";

export default function Admin() {
  const classDefaultName = "p-5 hover:bg-gray-700";
  const activeClassName = "p-5 bg-gray-700";

  const { alert } = useAlert();
  const { auth, logout } = useAuth();

  // useEffect(() => {

  // }, [user]);

  console.log(auth);

  return !auth?.id ? (
    <Login />
  ) : (
    <div className="flex flex-1 h-screen bg-gray-100 overflow-hidden">
      <nav className="w-1/5 pl-5 py-5 h-screen bg-gray-800 text-white font-play flex flex-col fixed inset-0">
        <NavLink
          to="/adm/immobiles"
          className={({ isActive }) =>
            isActive ? activeClassName : classDefaultName
          }
        >
          <i className="fa fa-home"></i> Imovéis
        </NavLink>
        <NavLink
          to="/adm/streets"
          className={({ isActive }) =>
            isActive ? activeClassName : classDefaultName
          }
        >
          <i className="fas fa-street-view"></i> Ruas
        </NavLink>
        <NavLink
          to="/adm/cities"
          className={({ isActive }) =>
            isActive ? activeClassName : classDefaultName
          }
        >
          <i className="fas fa-building"></i> Cidades
        </NavLink>
        <NavLink
          to="/adm/states"
          className={({ isActive }) =>
            isActive ? activeClassName : classDefaultName
          }
        >
          <i className="far fa-star"></i> Estados
        </NavLink>
        <span className="cursor-pointer" onClick={logout}>
          <i className="fas fa-sign-out-alt"></i> Sair
        </span>
      </nav>
      <main className="p-8 w-4/5 overflow-y-auto ml-[20%]">
        {alert.message && <Alert message={alert.message} title={alert.title} />}
        <Outlet />
      </main>
    </div>
  );
}
