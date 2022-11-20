import { Helmet } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Admin } from "../components/layout";
import { AlertProvider } from "../context/alert";
import { AuthProvider } from "../context/auth";
import { ModalProvider } from "../context/modal";
import { Categories, FormCategories } from "../pages/admin-categories";
import { Cities, FormCities } from "../pages/admin-cities";
import { Dashboard } from "../pages/admin-dashborad";
import { FormImmobiles, Immobiles } from "../pages/admin-immobiles";
import { Logs } from "../pages/admin-logs";
import { FormNeighborhoods, Neighborhoods } from "../pages/admin-neighborhoods";
import { FormOwners, Owners } from "../pages/admin-owners";
import { FormStates, States } from "../pages/admin-states";
import { FormStreets, Streets } from "../pages/admin-streets";
import { FormTenants, Tenants } from "../pages/admin-tenant";
import { FormUsers, Users } from "../pages/admin-users";

export function RoutesAdm() {
  return (
    <AuthProvider>
      <AlertProvider>
        <ModalProvider>
          <BrowserRouter>
            <Routes>
              <Route path="adm" element={<Admin />}>
                <Route path="immobiles">
                  <Route
                    index
                    element={
                      <>
                        <Helmet>
                          <title>
                            Lista de Imóveis - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <Immobiles />
                      </>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <>
                        <Helmet>
                          <title>
                            Cadastrar Imóveis - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <FormImmobiles />
                      </>
                    }
                  />
                  <Route
                    path=":immobleId/edit"
                    element={
                      <>
                        <Helmet>
                          <title>
                            Editar Imóveis - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <FormImmobiles />
                      </>
                    }
                  />
                </Route>

                <Route path="categories">
                  <Route
                    index
                    element={
                      <>
                        <Helmet>
                          <title>
                            Lista de Categorias - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <Categories />
                      </>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <>
                        <Helmet>
                          <title>
                            Cadastrar Categorias - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <FormCategories />
                      </>
                    }
                  />
                  <Route
                    path=":categoryId/edit"
                    element={
                      <>
                        <Helmet>
                          <title>
                            Editar Categorias - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <FormCategories />
                      </>
                    }
                  />
                </Route>

                <Route path="cities">
                  <Route
                    index
                    element={
                      <>
                        <Helmet>
                          <title>
                            Lista de Cidades - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <Cities />
                      </>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <>
                        <Helmet>
                          <title>
                            Cadastrar Cidades - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <FormCities />
                      </>
                    }
                  />
                  <Route
                    path=":cityId/edit"
                    element={
                      <>
                        <Helmet>
                          <title>
                            Editar Cidades - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <FormCities />
                      </>
                    }
                  />
                </Route>

                <Route path="owners">
                  <Route
                    index
                    element={
                      <>
                        <Helmet>
                          <title>
                            Lista de Proprietários -{" "}
                            {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <Owners />
                      </>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <>
                        <Helmet>
                          <title>
                            Cadastrar Proprietários -{" "}
                            {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <FormOwners />
                      </>
                    }
                  />
                  <Route
                    path=":ownerId/edit"
                    element={
                      <>
                        <Helmet>
                          <title>
                            Editar Proprietários - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <FormOwners />
                      </>
                    }
                  />
                </Route>

                <Route path="tenants">
                  <Route
                    index
                    element={
                      <>
                        <Helmet>
                          <title>
                            Lista de Inquilínos - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <Tenants />
                      </>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <>
                        <Helmet>
                          <title>
                            Cadastrar Inquilínos - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <FormTenants />
                      </>
                    }
                  />
                  <Route
                    path=":tenantId/edit"
                    element={
                      <>
                        <Helmet>
                          <title>
                            Editar Inquilínos - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <FormTenants />
                      </>
                    }
                  />
                </Route>

                <Route path="streets">
                  <Route
                    index
                    element={
                      <>
                        <Helmet>
                          <title>
                            Lista de Ruas - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <Streets />
                      </>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <>
                        <Helmet>
                          <title>
                            Cadastrar Ruas - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <FormStreets />
                      </>
                    }
                  />
                  <Route
                    path=":streetId/edit"
                    element={
                      <>
                        <Helmet>
                          <title>
                            Editar Ruas - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <FormStreets />
                      </>
                    }
                  />
                </Route>

                <Route path="neighborhoods">
                  <Route
                    index
                    element={
                      <>
                        <Helmet>
                          <title>
                            Lista de Bairros - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <Neighborhoods />
                      </>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <>
                        <Helmet>
                          <title>
                            Cadastrar Bairros - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <FormNeighborhoods />
                      </>
                    }
                  />
                  <Route
                    path=":districtId/edit"
                    element={
                      <>
                        <Helmet>
                          <title>
                            Editar Bairros - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <FormNeighborhoods />
                      </>
                    }
                  />
                </Route>

                <Route path="states">
                  <Route
                    index
                    element={
                      <>
                        <Helmet>
                          <title>
                            Lista de Estados - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <States />
                      </>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <>
                        <Helmet>
                          <title>
                            Cadastrar Estados - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <FormStates />
                      </>
                    }
                  />
                  <Route
                    path=":stateId/edit"
                    element={
                      <>
                        <Helmet>
                          <title>
                            Editar Estados - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <FormStates />
                      </>
                    }
                  />
                </Route>

                <Route path="users">
                  <Route
                    index
                    element={
                      <>
                        <Helmet>
                          <title>
                            Lista de Usuários - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <Users />
                      </>
                    }
                  />
                  <Route
                    path="new"
                    element={
                      <>
                        <Helmet>
                          <title>
                            Cadastrar Usuários - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <FormUsers />
                      </>
                    }
                  />
                  <Route
                    path=":userId/edit"
                    element={
                      <>
                        <Helmet>
                          <title>
                            Editar Usuários - {import.meta.env.VITE_TITLE}
                          </title>
                        </Helmet>
                        <FormUsers />
                      </>
                    }
                  />
                </Route>

                <Route path="logs">
                  <Route
                    index
                    element={
                      <>
                        <Helmet>
                          <title>Logs - {import.meta.env.VITE_TITLE}</title>
                        </Helmet>
                        <Logs />
                      </>
                    }
                  />
                </Route>

                <Route index element={<Dashboard />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ModalProvider>
      </AlertProvider>
    </AuthProvider>
  );
}
