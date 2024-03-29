import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LightBoxProvider } from "../context/lightbox";

import { Admin, Site } from "../components/layout";
import { LoadingFull } from "../components/loading";

import { Error } from "../pages/error";

const Logs = lazy(() => import("../pages/admin/logs/list"));
const Dashboard = lazy(() => import("../pages/admin/dashborad"));

const Users = lazy(() => import("../pages/admin/users/list"));
const FormUsers = lazy(() => import("../pages/admin/users/form"));

const Immobiles = lazy(() => import("../pages/admin/immobiles/list"));
const FormImmobiles = lazy(() => import("../pages/admin/immobiles/form"));

const Tenants = lazy(() => import("../pages/admin/tenant/list"));
const FormTenants = lazy(() => import("../pages/admin/tenant/form"));

const Owners = lazy(() => import("../pages/admin/owners/list"));
const FormOwners = lazy(() => import("../pages/admin/owners/form"));

const Neighborhoods = lazy(() => import("../pages/admin/neighborhoods/list"));
const FormNeighborhoods = lazy(
  () => import("../pages/admin/neighborhoods/form"),
);

const Streets = lazy(() => import("../pages/admin/streets/list"));
const FormStreets = lazy(() => import("../pages/admin/streets/form"));

const States = lazy(() => import("../pages/admin/states/list"));
const FormStates = lazy(() => import("../pages/admin/states/form"));

const Cities = lazy(() => import("../pages/admin/cities/list"));
const FormCities = lazy(() => import("../pages/admin/cities/form"));

const Categories = lazy(() => import("../pages/admin/categories/list"));
const FormCategories = lazy(() => import("../pages/admin/categories/form"));

const SiteHome = lazy(() => import("../pages/site/home"));
const SiteImmoble = lazy(() => import("../pages/site/immoble"));
const SiteSearch = lazy(() => import("../pages/site/search"));
const SiteQuemSomos = lazy(() => import("../pages/site/quem-somos"));

export default function RouteIndex() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFull />}>
        <Routes>
          <Route path="adm" element={<Admin />}>
            <Route path="immobiles">
              <Route index element={<Immobiles />} />
              <Route path="new" element={<FormImmobiles />} />
              <Route path=":immobleId/edit" element={<FormImmobiles />} />
            </Route>

            <Route path="categories">
              <Route index element={<Categories />} />
              <Route path="new" element={<FormCategories />} />
              <Route path=":categoryId/edit" element={<FormCategories />} />
            </Route>

            <Route path="cities">
              <Route index element={<Cities />} />
              <Route path="new" element={<FormCities />} />
              <Route path=":cityId/edit" element={<FormCities />} />
            </Route>

            <Route path="owners">
              <Route index element={<Owners />} />
              <Route path="new" element={<FormOwners />} />
              <Route path=":ownerId/edit" element={<FormOwners />} />
            </Route>

            <Route path="tenants">
              <Route index element={<Tenants />} />
              <Route path="new" element={<FormTenants />} />
              <Route path=":tenantId/edit" element={<FormTenants />} />
            </Route>

            <Route path="streets">
              <Route index element={<Streets />} />
              <Route path="new" element={<FormStreets />} />
              <Route path=":streetId/edit" element={<FormStreets />} />
            </Route>

            <Route path="neighborhoods">
              <Route index element={<Neighborhoods />} />
              <Route path="new" element={<FormNeighborhoods />} />
              <Route path=":districtId/edit" element={<FormNeighborhoods />} />
            </Route>

            <Route path="states">
              <Route index element={<States />} />
              <Route path="new" element={<FormStates />} />
              <Route path=":stateId/edit" element={<FormStates />} />
            </Route>

            <Route path="users">
              <Route index element={<Users />} />
              <Route path="new" element={<FormUsers />} />
              <Route path=":userId/edit" element={<FormUsers />} />
            </Route>

            <Route path="logs" element={<Logs />} />

            <Route index element={<Dashboard />} />
          </Route>

          <Route element={<Site />}>
            <Route index element={<SiteHome />} />
            <Route path="/search" element={<SiteSearch />} />
            <Route path="/quem-somos" element={<SiteQuemSomos />} />
            <Route
              path="/:situation/imovel/:reference/:desciption"
              element={
                <LightBoxProvider>
                  <SiteImmoble />
                </LightBoxProvider>
              }
            />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
