import "./global/styles/app.css";
import "react-responsive-carousel/lib/styles/carousel.css";

import ReactDOM from "react-dom/client";

import { RoutesAdm } from "./routes/routes-adm";
import { BrowserRouter, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { RoutesSite } from "./routes/routes-site";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <HelmetProvider>
    <RoutesAdm />
    <RoutesSite />
  </HelmetProvider>,
);
