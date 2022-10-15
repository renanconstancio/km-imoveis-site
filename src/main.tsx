// import "./styles/fontawesome/css/solid.css";
// import "./styles/fontawesome/css/brands.css";
// import "./styles/fontawesome/css/regular.css";
import "./global/styles/fontawesome/css/all.min.css";
import "./global/styles/app.css";

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes";
import { AlertProvider } from "./context/alert";
import { ModalProvider } from "./context/modal";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AlertProvider>
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  </AlertProvider>,
);
