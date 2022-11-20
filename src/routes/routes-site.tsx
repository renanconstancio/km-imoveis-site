import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { GeolocationProvider } from "../context/geolocation";
import { Site } from "../components/layout";
import { SiteHome } from "../pages/site-home";
import { Helmet } from "react-helmet-async";
import { SiteSearch } from "../pages/site-search";
import { SiteImmoble } from "../pages/site-immoble";
import { Error } from "../pages/error";

export function RoutesSite() {
  return (
    // <GeolocationProvider>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Site />}>
          <Route
            index
            element={
              <>
                <Helmet>
                  <title>{import.meta.env.VITE_TITLE}</title>
                  <link rel="canonical" href={window.location.href} />
                </Helmet>
                <SiteHome />
              </>
            }
          />
          <Route
            path="/search"
            element={
              <>
                <Helmet>
                  <title>{import.meta.env.VITE_TITLE}</title>
                  <link rel="canonical" href={window.location.href} />
                </Helmet>
                <SiteSearch />
              </>
            }
          />
          <Route
            path="/:situation/imovel/:reference/:desciption"
            element={<SiteImmoble />}
          />
          {/* 
        <Route path="*" element={<Error />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    // </GeolocationProvider>
  );
}
