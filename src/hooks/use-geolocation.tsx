import { useContext } from "react";
import {
  GeolocationContext,
  GeolocationContextType,
} from "../context/geolocation";

export function useGeolocation() {
  return useContext(GeolocationContext) as GeolocationContextType;
}
