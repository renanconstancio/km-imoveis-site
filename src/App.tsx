// import { useEffect } from "react";
import { CarouselIndex } from "./components/carousel";
import { Header } from "./components/header";
import { Home } from "./pages/home";

export default function App() {
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.watchPosition(function (position) {
  //       console.log("Latitude is :", position.coords.latitude);
  //       console.log("Longitude is :", position.coords.longitude);
  //     });
  //   }
  // }, []);

  return (
    <>
      <Header />
      <CarouselIndex />
      <Home />
    </>
  );
}
