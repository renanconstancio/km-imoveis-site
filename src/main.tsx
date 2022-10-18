// import "./styles/fontawesome/css/solid.css";
// import "./styles/fontawesome/css/brands.css";
// import "./styles/fontawesome/css/regular.css";
import "./global/styles/fontawesome/css/all.min.css";
import "./global/styles/app.css";

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { router } from "./routes";
import { AlertProvider } from "./context/alert";
import { ModalProvider } from "./context/modal";
import { AuthProvider } from "./context/auth";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthProvider>
    <AlertProvider>
      <ModalProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </ModalProvider>
    </AlertProvider>
  </AuthProvider>,
);
