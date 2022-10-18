import { createBrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { Admin, Site } from "../components/layout";
import { FormImmobiles, Immobiles } from "../pages/immobiles";

import { Error } from "../pages/error";
import { Home } from "../pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Site />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "adm",
    element: <Admin />,
    errorElement: <Error />,
    children: [
      {
        path: "immobiles",
        children: [
          {
            path: "",
            element: (
              <>
                <Helmet>
                  <title>
                    Lista de Imóveis - {import.meta.env.VITE_REACT_TITLE}
                  </title>
                </Helmet>
                <Immobiles />
              </>
            ),
          },
          {
            path: "new",
            element: (
              <>
                <Helmet>
                  <title>
                    Cadastrar Imóveis - {import.meta.env.VITE_REACT_TITLE}
                  </title>
                </Helmet>
                <FormImmobiles />
              </>
            ),
          },
          {
            path: ":immobleId/edit",
            element: (
              <>
                <Helmet>
                  <title>
                    Editar Imóveis - {import.meta.env.VITE_REACT_TITLE}
                  </title>
                </Helmet>
                <FormImmobiles />
              </>
            ),
          },
        ],
      },
    ],
  },
]);
