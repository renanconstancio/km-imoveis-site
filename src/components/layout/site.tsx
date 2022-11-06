import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useGeolocation } from "../../hooks/use-geolocation";
import { api } from "../../services/api";
import { Footer } from "../footer";
import { Header } from "../header";

type PropsGeolocationStates = {
  codigo_uf: number;
  uf: string;
  nome: string;
  latitude: number;
  longitude: number;
  regiao: string;
};

type PropsGeolocationCity = {
  capital: number;
  codigo_ibge: number;
  codigo_uf: number;
  ddd: number;
  fuso_horario: string;
  latitude: number;
  longitude: number;
  nome: string;
  siafi_id: number;
};

type PropsGeolocation = {
  latitude: number;
  longitude: number;
};

export default function Site() {
  const [states, setStates] = useState<PropsGeolocationStates[]>([]);
  const [cities, setCities] = useState<PropsGeolocationCity[]>([]);
  const [geolocation, setGeolocation] = useState<PropsGeolocation>(
    {} as PropsGeolocation,
  );

  const { addGeolocation } = useGeolocation();

  async function loadStates() {
    await fetch(
      "https://raw.githubusercontent.com/kelvins/Municipios-Brasileiros/main/json/estados.json",
    )
      .then(resp => resp.json())
      .then(async (resp: PropsGeolocationStates[]) => setStates(resp));
  }

  async function loadCities() {
    await fetch(
      "https://raw.githubusercontent.com/kelvins/Municipios-Brasileiros/main/json/municipios.json",
    )
      .then(resp => resp.json())
      .then(async (resp: PropsGeolocationCity[]) => {
        const respAll = resp.map((rws: PropsGeolocationCity) => {
          const state = states.find(s => s.codigo_uf === rws.codigo_uf);
          return {
            ...rws,
            nome: `${rws.nome}/${state?.uf}`,
          };
        });

        setCities(respAll);
      });
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

  useEffect(() => {
    loadStates();
  }, []);

  useEffect(() => {
    if (states.length) loadCities();
  }, [states]);

  useEffect(() => {
    if (cities.length) {
      addGeolocation(
        cities?.filter(
          ({ latitude, longitude }) =>
            `${geolocation.latitude}`.includes(`${latitude}`) ||
            `${geolocation.longitude}`.includes(`${longitude}`),
        )[0],
      );
    }
  }, [cities, geolocation]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
