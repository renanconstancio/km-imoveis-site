import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { GeolocationType } from "../../context/geolocation";
import { useGeolocation } from "../../hooks/use-geolocation";
import { Footer } from "../footer";
import { Header } from "../header";

import iconFace from "../../assets/facebook.svg";
import iconInsta from "../../assets/instagram.svg";
import { Filters } from "../filters";
import { CarouselIndex } from "../carousel";
import { PropsBanners } from "../../global/types/types";
import { api } from "../../services/api";

// type PropsGeolocationStates = {
//   codigo_uf: number;
//   uf: string;
//   nome: string;
//   latitude: number;
//   longitude: number;
//   regiao: string;
// };

// type PropsGeolocationCity = {
//   capital: number;
//   codigo_ibge: number;
//   codigo_uf: number;
//   ddd: number;
//   fuso_horario: string;
//   latitude: number;
//   longitude: number;
//   nome: string;
//   city: string;
//   siafi_id: number;
// };

type PropsGeolocation = {
  latitude: number;
  longitude: number;
};

export default function Site() {
  const [banners, setBanners] = useState<PropsBanners[]>([]);
  const [geolocation, setGeolocation] = useState<PropsGeolocation>(
    {} as PropsGeolocation,
  );
  const [cities, setCities] = useState<GeolocationType[]>([]);

  const location = useLocation();
  const { addGeolocation } = useGeolocation();

  async function loadCities() {
    fetch(
      "https://raw.githubusercontent.com/kelvins/Municipios-Brasileiros/main/json/municipios.json",
    )
      .then(resp => resp.json())
      .then(async (resp: GeolocationType[]) => setCities(resp));
  }

  async function loadBanners() {
    await api
      .get("/immobiles/sort/banner")
      .then(async resp => setBanners(await resp.data));
  }

  useEffect(() => {
    loadBanners();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        setGeolocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  // useEffect(() => {
  //   if (!cities.length) loadStates();
  // }, [cities]);

  useEffect(() => {
    if (!cities.length) loadCities();
  }, [cities]);

  // useEffect(() => {
  //   addGeolocation(
  //     cities?.filter(
  //       ({ latitude, longitude }) =>
  //         `${geolocation.latitude}`.includes(`${latitude}`) ||
  //         `${geolocation.longitude}`.includes(`${longitude}`),
  //     )[0],
  //   );
  // }, [cities, geolocation.latitude, geolocation.longitude]);

  return (
    <div className="bg-gray-200 flex flex-1 flex-col relative">
      <Header />

      {location.pathname === "/" && (
        <div className="bg-slate-100">
          <section className="container px-4 flex flex-wrap items-center">
            <div className="w-full md:w-1/3 mt-4 md:mt-0">
              <Filters />
            </div>
            <div className="w-full md:w-2/3 mb-5 mt-5 md:m-0">
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
