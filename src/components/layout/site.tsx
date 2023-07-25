import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../footer";
import { Header } from "../header";
import { Filters } from "../filters";

export default function Site() {
  const location = useLocation();

  return (
    <div className="bg-gray-200 flex flex-1 flex-col relative pt-14 sm:p-0">
      <Header />

      {location.pathname !== "/" && <Filters variant="row" />}

      <Outlet />

      <Footer />
    </div>
  );
}
