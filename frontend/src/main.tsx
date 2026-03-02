import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { RouterProvider } from "react-router-dom";

// import App from "./App";
import { router } from "./router";
import "./index.css";

/**
 * Utilisation de React query pour :
 * - cache automatique (pas de refetch inutile)
 * - Invalidation automatique
 * - Refetch intelligent (au focus, reconnect, etc)
 * - code plus propre
 */
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Clerk publishable key manquante");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={clerkPubKey}>
        <RouterProvider router={router} />
      </ClerkProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
