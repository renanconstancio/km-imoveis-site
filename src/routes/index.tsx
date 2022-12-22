import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Admin, Site } from "../components/layout";
import { LoadingFull } from "../components/loading";
import { Categories, FormCategories } from "../pages/admin-categories";
import { Cities, FormCities } from "../pages/admin-cities";
import { Dashboard } from "../pages/admin-dashborad";
import { Immobiles, FormImmobiles } from "../pages/admin-immobiles";
import { Logs } from "../pages/admin-logs";
import { Neighborhoods, FormNeighborhoods } from "../pages/admin-neighborhoods";
import { Owners, FormOwners } from "../pages/admin-owners";
import { States, FormStates } from "../pages/admin-states";
import { Streets, FormStreets } from "../pages/admin-streets";
import { Tenants, FormTenants } from "../pages/admin-tenant";
import { Users, FormUsers } from "../pages/admin-users";
import { Error } from "../pages/error";

const SiteHome = lazy(() => import("../pages/site-home"));
const SiteImmoble = lazy(() => import("../pages/site-immoble"));
const SiteSearch = lazy(() => import("../pages/site-search"));

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
            <Route
              path="/:situation/imovel/:reference/:desciption"
              element={<SiteImmoble />}
            />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
