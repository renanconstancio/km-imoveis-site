import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGeolocation } from "../../hooks/use-geolocation";
import { Footer } from "../footer";
import { Header } from "../header";

import { Filters } from "../filters";
import { CarouselIndex } from "../carousel";
import { PropsBanners } from "../../global/types/types";
import { api } from "../../services/api";

type PropsGeolocation = {
  latitude: number;
  longitude: number;
};

export default function Site() {
  const [banners, setBanners] = useState<PropsBanners[]>([]);

  const location = useLocation();

  async function loadBanners() {
    await api
      .get("/immobiles/sort/banner")
      .then(async resp => setBanners(await resp.data));
  }

  useEffect(() => {
    loadBanners();
  }, []);

  return (
    <div className="bg-gray-200 flex flex-1 flex-col relative">
      <Header />

      {location.pathname === "/" && (
        <div className="bg-slate-100">
          <section className="container px-4 flex flex-wrap items-center">
            <div className="basis-full md:basis-2/6 mt-4 md:mt-0">
              <Filters />
            </div>
            <div className="basis-full md:basis-4/6 mb-5 mt-5 md:m-0">
              {banners.length ? <CarouselIndex banners={banners} /> : ""}
            </div>
          </section>
        </div>
      )}

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
