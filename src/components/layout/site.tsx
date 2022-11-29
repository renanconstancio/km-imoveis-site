import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../footer";
import { Header } from "../header";
import { Filters } from "../filters";
import { TCarousel } from "../carousel/types";

import { CarouselIndex } from "../carousel";

import banner01 from "../../assets/banners/banner-a.jpg";
import banner02 from "../../assets/banners/banner-b.jpg";
import banner03 from "../../assets/banners/banner-c.png";

const bannerFix: TCarousel[] = [
  {
    reference: "",
    description: "",
    situation: "purchase",
    state: "",
    city: "",
    photo: {
      image_lg: `${banner01}`,
      image_xs: "",
    },
  },
  {
    reference: "",
    description: "",
    situation: "purchase",
    state: "",
    city: "",
    photo: {
      image_lg: `${banner02}`,
      image_xs: "",
    },
  },
  {
    reference: "",
    description: "",
    situation: "purchase",
    state: "",
    city: "",
    photo: {
      image_lg: `${banner03}`,
      image_xs: "",
    },
  },
];

export default function Site() {
  const [banners, setBanners] = useState<TCarousel[]>([]);

  const location = useLocation();

console.log()
  
  // async function loadBanners() {
  //   await api.get("/immobiles/banner/list").then(async resp => {
  //     const banner = await resp.data;
  //     setBanners(old => [...old, ...banner]);
  //   });
  // }

  useEffect(() => {
    setBanners(bannerFix.sort(() => Math.random() - 0.5));
  }, [setBanners]);

  return (
    <div className="bg-gray-200 flex flex-1 flex-col relative">
      <Header />

      {location.pathname === "/" && (
        <div className="bg-slate-100">
          <section className="container px-4 flex flex-wrap items-center">
            <div className="w-full md:w-2/6 mt-4 md:mt-0">
              <Filters />
            </div>
            <div className="w-full md:w-4/6 mb-5 mt-5 md:m-0">
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
