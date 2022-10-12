// import "./styles/fontawesome/css/solid.css";
// import "./styles/fontawesome/css/brands.css";
// import "./styles/fontawesome/css/regular.css";
import "./styles/fontawesome/css/all.min.css";
import "./styles/app.css";

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />,
);

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//     </Routes>
//   </BrowserRouter>,
// );
