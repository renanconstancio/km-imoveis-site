import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../footer";
import { Header } from "../header";
import { Filters } from "../filters";

export default function Site() {
  const location = useLocation();

  return (
    <div className="bg-gray-200 flex flex-1 flex-col relative">
      <Header />

      {location.pathname !== "/" && (
        <div className="bg-slate-100 -mt-2 mb-5">
          <section className="container p-5">
            <Filters variant="row" />
          </section>
        </div>
      )}

      <Outlet />

      <Footer />
    </div>
  );
}
