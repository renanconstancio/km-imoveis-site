import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import { Admin } from "../components/layout";
import { Error } from "../pages/error";
import { FormImmobles, Immobles } from "../pages/immobles";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "/adm",
    element: <Admin />,
    errorElement: <Error />,
    children: [
      {
        path: "immobles",
        children: [
          {
            path: "",
            element: <Immobles />,
          },
          {
            path: "new",
            element: <FormImmobles />,
          },
        ],
      },
    ],
  },
]);
