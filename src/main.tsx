import "./styles/fontawesome/css/solid.css";
import "./styles/fontawesome/css/brands.css";
import "./styles/fontawesome/css/regular.css";
import "./styles/fontawesome/css/fontawesome.css";
import "./styles/app.css";

import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>,
);
