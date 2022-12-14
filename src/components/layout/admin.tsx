import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAlert } from "../../hooks/use-alert";
import { useAuth } from "../../hooks/use-auth";
import { Login } from "../../pages/admin-login";
import { interceptorsResponse } from "../../services/api";
import { Alert } from "../alert";
import { NavDropDown } from "../nav-dropdown";
import { NavLeft } from "../nav-left";

export default function Admin() {
  const { alert } = useAlert();

  const { auth, logout } = useAuth();

  const location = useLocation();

  useEffect(() => {
    interceptorsResponse(logout);
  }, [location.pathname]);

  return !auth?.id ? (
    <Login />
  ) : (
    <div className="flex flex-row h-screen bg-gray-100 overflow-hidden">
      <NavLeft />

      <main className="basis-full sm:basis-4/5 pb-8 px-4 overflow-y-auto relative">
        <NavDropDown />

        {alert.message && (
          <Alert
            message={alert.message}
            title={alert.title}
            variant={alert.variant}
          />
        )}

        <Outlet />
      </main>
    </div>
  );
}
