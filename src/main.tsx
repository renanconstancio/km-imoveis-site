import "react-responsive-carousel/lib/styles/carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "./global/styles/app.css";

import ReactDOM from "react-dom/client";

import { HelmetProvider } from "react-helmet-async";

import { AuthProvider } from "./context/auth";
import { AlertProvider } from "./context/alert";
import { ModalProvider } from "./context/modal";
import RouteIndex from "./routes";
import React from "react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <AlertProvider>
          <ModalProvider>
            <RouteIndex />
          </ModalProvider>
        </AlertProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
