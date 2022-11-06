import { createContext, ReactNode, useState } from "react";

export type GeolocationType = {
  nome: string;
  capital: number;
  codigo_ibge: number;
  codigo_uf: number;
  ddd: number;
  fuso_horario: string;
  latitude: number;
  longitude: number;
  siafi_id: number;
};

export type GeolocationContextType = {
  geolocation?: GeolocationType;
  addGeolocation: (geolocations: GeolocationType) => void;
};

export const GeolocationContext = createContext<GeolocationContextType>(
  {} as GeolocationContextType,
);

export function GeolocationProvider({ children }: { children: ReactNode }) {
  const [geolocationState, setGeolocationState] = useState<GeolocationType>(
    {} as GeolocationType,
  );

  return (
    <GeolocationContext.Provider
      value={{
        geolocation: geolocationState,
        addGeolocation: setGeolocationState,
      }}
    >
      {children}
    </GeolocationContext.Provider>
  );
}
