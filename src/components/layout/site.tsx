import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { GeolocationType } from "../../context/geolocation";
import { useGeolocation } from "../../hooks/use-geolocation";
import { Footer } from "../footer";
import { Header } from "../header";

import iconFace from "../../assets/facebook.svg";
import iconInsta from "../../assets/instagram.svg";

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
  // const [states, setStates] = useState<PropsGeolocationStates[]>([]);
  const [geolocation, setGeolocation] = useState<PropsGeolocation>(
    {} as PropsGeolocation,
  );
  const [cities, setCities] = useState<GeolocationType[]>([]);

  const { addGeolocation } = useGeolocation();

  // async function loadStates() {
  //   fetch(
  //     "https://raw.githubusercontent.com/kelvins/Municipios-Brasileiros/main/json/estados.json",
  //   )
  //     .then(resp => resp.json())
  //     .then(async (resp: PropsGeolocationStates[]) => setStates(resp));
  // }

  // async function loadCities() {
  //   fetch(
  //     "https://raw.githubusercontent.com/kelvins/Municipios-Brasileiros/main/json/municipios.json",
  //   )
  //     .then(resp => resp.json())
  //     .then(async (resp: PropsGeolocationCity[]) => {
  //       const respAll = resp.map((rws: PropsGeolocationCity) => {
  //         const state = states.find(s => s.codigo_uf === rws.codigo_uf);
  //         return {
  //           ...rws,
  //           nome: `${rws.nome}/${state?.uf}`,
  //         };
  //       });

  //       setCities(respAll);
  //     });
  // }

  async function loadCities() {
    fetch(
      "https://raw.githubusercontent.com/kelvins/Municipios-Brasileiros/main/json/municipios.json",
    )
      .then(resp => resp.json())
      .then(async (resp: GeolocationType[]) => setCities(resp));
  }

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

  useEffect(() => {
    addGeolocation(
      cities?.filter(
        ({ latitude, longitude }) =>
          `${geolocation.latitude}`.includes(`${latitude}`) ||
          `${geolocation.longitude}`.includes(`${longitude}`),
      )[0],
    );
  }, [cities, geolocation.latitude, geolocation.longitude]);

  return (
    <div className="bg-gray-200 flex flex-1 flex-col relative">
      <Header />
      <Outlet />
      <Footer />

      {/* <span className="fixed inset-y-0 left-0 w-0 z-50 flex flex-col justify-center gap-1">
        <img
          src={iconFace}
          alt="Facebook"
          style={{ width: 45, maxWidth: "auto!important" }}
        />
        <img
          src={iconInsta}
          alt="Instagram"
          style={{ width: 45, maxWidth: "auto!important" }}
        />
      </span> */}
    </div>
  );
}
