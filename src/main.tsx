import "react-responsive-carousel/lib/styles/carousel.css";
import "./global/styles/app.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

import { AuthProvider } from "./context/auth";
import { ModalProvider } from "./context/modal";
import RouteIndex from "./routes";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 5000,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 30 * 60,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <AuthProvider>
          <ModalProvider>
            <RouteIndex />
          </ModalProvider>
        </AuthProvider>
      </HelmetProvider>
    </QueryClientProvider>
    <ToastContainer position="top-center" />
  </React.StrictMode>,
);
