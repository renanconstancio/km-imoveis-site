import { createBrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { Admin, Site } from "../components/layout";
import { FormImmobiles, Immobiles } from "../pages/admin-immobiles";

import { Error } from "../pages/error";
import { SiteHome } from "../pages/site-home";
import { SiteImmoble } from "../pages/site-immoble";
import { Streets } from "../pages/admin-streets";
import FormStreets from "../pages/admin-streets/form-streets";
import { Cities, FormCities } from "../pages/admin-cities";
import { FormStates, States } from "../pages/admin-states";
import { Categories, FormCategories } from "../pages/admin-categories";
import { FormNeighborhoods, Neighborhoods } from "../pages/admin-neighborhoods";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Site />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: (
          <>
            <Helmet>
              <title>{import.meta.env.VITE_REACT_TITLE}</title>
            </Helmet>
            <SiteHome />
          </>
        ),
      },
      {
        path: "immoble/:title/:immobleId",
        element: <SiteImmoble />,
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
      {
        path: "streets",
        children: [
          {
            path: "",
            element: (
              <>
                <Helmet>
                  <title>
                    Lista de Ruas - {import.meta.env.VITE_REACT_TITLE}
                  </title>
                </Helmet>
                <Streets />
              </>
            ),
          },
          {
            path: "new",
            element: (
              <>
                <Helmet>
                  <title>
                    Cadastrar Ruas - {import.meta.env.VITE_REACT_TITLE}
                  </title>
                </Helmet>
                <FormStreets />
              </>
            ),
          },
          {
            path: ":streetId/edit",
            element: (
              <>
                <Helmet>
                  <title>
                    Editar Ruas - {import.meta.env.VITE_REACT_TITLE}
                  </title>
                </Helmet>
                <FormStreets />
              </>
            ),
          },
        ],
      },
      {
        path: "cities",
        children: [
          {
            path: "",
            element: (
              <>
                <Helmet>
                  <title>
                    Lista de Ruas - {import.meta.env.VITE_REACT_TITLE}
                  </title>
                </Helmet>
                <Cities />
              </>
            ),
          },
          {
            path: "new",
            element: (
              <>
                <Helmet>
                  <title>
                    Cadastrar Cidades - {import.meta.env.VITE_REACT_TITLE}
                  </title>
                </Helmet>
                <FormCities />
              </>
            ),
          },
          {
            path: ":streetId/edit",
            element: (
              <>
                <Helmet>
                  <title>
                    Editar Cidades - {import.meta.env.VITE_REACT_TITLE}
                  </title>
                </Helmet>
                <FormCities />
              </>
            ),
          },
        ],
      },
      {
        path: "states",
        children: [
          {
            path: "",
            element: (
              <>
                <Helmet>
                  <title>
                    Lista de Estados - {import.meta.env.VITE_REACT_TITLE}
                  </title>
                </Helmet>
                <States />
              </>
            ),
          },
          {
            path: "new",
            element: (
              <>
                <Helmet>
                  <title>
                    Cadastrar Estados - {import.meta.env.VITE_REACT_TITLE}
                  </title>
                </Helmet>
                <FormStates />
              </>
            ),
          },
          {
            path: ":stateId/edit",
            element: (
              <>
                <Helmet>
                  <title>
                    Editar Estados - {import.meta.env.VITE_REACT_TITLE}
                  </title>
                </Helmet>
                <FormStates />
              </>
            ),
          },
        ],
      },
      {
        path: "categories",
        children: [
          {
            path: "",
            element: (
              <>
                <Helmet>
                  <title>
                    Lista de Categorias - {import.meta.env.VITE_REACT_TITLE}
                  </title>
                </Helmet>
                <Categories />
              </>
            ),
          },
          {
            path: "new",
            element: (
              <>
                <Helmet>
                  <title>
                    Cadastrar Categorias - {import.meta.env.VITE_REACT_TITLE}
                  </title>
                </Helmet>
                <FormCategories />
              </>
            ),
          },
          {
            path: ":categoryId/edit",
            element: (
              <>
                <Helmet>
                  <title>
                    Editar Categorias - {import.meta.env.VITE_REACT_TITLE}
                  </title>
                </Helmet>
                <FormCategories />
              </>
            ),
          },
        ],
      },
      {
        path: "neighborhoods",
        children: [
          {
            path: "",
            element: (
              <>
                <Helmet>
                  <title>
                    Lista de Bairros - {import.meta.env.VITE_REACT_TITLE}
                  </title>
                </Helmet>
                <Neighborhoods />
              </>
            ),
          },
          {
            path: "new",
            element: (
              <>
                <Helmet>
                  <title>
                    Cadastrar Bairros - {import.meta.env.VITE_REACT_TITLE}
                  </title>
                </Helmet>
                <FormNeighborhoods />
              </>
            ),
          },
          {
            path: ":districtId/edit",
            element: (
              <>
                <Helmet>
                  <title>
                    Editar Bairros - {import.meta.env.VITE_REACT_TITLE}
                  </title>
                </Helmet>
                <FormNeighborhoods />
              </>
            ),
          },
        ],
      },
    ],
  },
]);
