import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { interceptorsResponse } from "../../services/api";
import { NavDropDown } from "../nav-dropdown";
import { NavLeft } from "../nav-left";

import Login from "../../pages/admin/login";

export default function Admin() {
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

        <Outlet />
      </main>
    </div>
  );
}
