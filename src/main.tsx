import "./global/styles/app.css";
import "react-responsive-carousel/lib/styles/carousel.css";

import ReactDOM from "react-dom/client";

import { HelmetProvider } from "react-helmet-async";

import { AuthProvider } from "./context/auth";
import { AlertProvider } from "./context/alert";
import { ModalProvider } from "./context/modal";
import RouteIndex from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <HelmetProvider>
    <AuthProvider>
      <AlertProvider>
        <ModalProvider>
          <RouteIndex />
        </ModalProvider>
      </AlertProvider>
    </AuthProvider>
  </HelmetProvider>,
);
