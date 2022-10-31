import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../header";

export default function Site() {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });
    }
  }, []);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
