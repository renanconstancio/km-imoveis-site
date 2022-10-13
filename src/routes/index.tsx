import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import { Admin } from "../components/layout";
import { Error } from "../pages/error";
import { FormImmobiles, Immobiles } from "../pages/immobiles";
import { Helmet, HelmetProvider } from "react-helmet-async";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
  },
  {
    path: "adm",
    element: (
      <HelmetProvider>
        <Admin />
      </HelmetProvider>
    ),
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
