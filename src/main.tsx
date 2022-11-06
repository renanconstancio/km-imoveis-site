import "./global/styles/app.css";

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { router } from "./routes";
import { AlertProvider } from "./context/alert";
import { ModalProvider } from "./context/modal";
import { AuthProvider } from "./context/auth";
import { GeolocationProvider } from "./context/geolocation";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthProvider>
    <GeolocationProvider>
      <AlertProvider>
        <ModalProvider>
          <HelmetProvider>
            <RouterProvider router={router} />
          </HelmetProvider>
        </ModalProvider>
      </AlertProvider>
    </GeolocationProvider>
  </AuthProvider>,
);
