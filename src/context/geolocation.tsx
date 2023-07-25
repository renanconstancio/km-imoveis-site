import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

export type GeolocationType = {
  latitude: string;
  longitude: string;
  city: string;
};

export type GeolocationContextType = {
  geolocation?: GeolocationType;
  // addGeolocation: (geolocations: GeolocationType) => void;
};

export const GeolocationContext = createContext<GeolocationContextType>(
  {} as GeolocationContextType,
);

export function GeolocationProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState<string>("");
  const [geolocationState, setGeolocationState] = useState<GeolocationType>(
    {} as GeolocationType,
  );

  async function loadCities(lat: string, lon: string) {
    await axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      )
      .then(async (resp) => {
        const { address } = await resp.data;
        setCity(address.city_district);
        setGeolocationState({
          ...geolocationState,
          city: address.city_district,
        });
      });
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setGeolocationState({
          latitude: String(position.coords.latitude),
          longitude: String(position.coords.longitude),
          city: "",
        });
      });
    }
  }, []);

  useEffect(() => {
    if (geolocationState.latitude && geolocationState.longitude)
      loadCities(geolocationState.latitude, geolocationState.longitude);
  }, [geolocationState.latitude, geolocationState.longitude]);

  return (
    <GeolocationContext.Provider
      value={{
        geolocation: geolocationState,
      }}
    >
      {children}
    </GeolocationContext.Provider>
  );
}
