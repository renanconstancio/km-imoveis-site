import "react-responsive-carousel/lib/styles/carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "./global/styles/app.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

import { AuthProvider } from "./context/auth";
import { AlertProvider } from "./context/alert";
import { ModalProvider } from "./context/modal";
import RouteIndex from "./routes";

// Create a client
const queryClient = new QueryClient({
  
  defaultOptions: {
    
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 30 * 60
    }
  }
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <AlertProvider>
            <ModalProvider>
              <RouteIndex />
            </ModalProvider>
          </AlertProvider>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
