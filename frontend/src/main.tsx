import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import { setTokenGetter } from "./auth/clerkTokenProvider";
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


function ClerkTokenBridge() {

  const { getToken } = useAuth();

  useEffect(() => {
    setTokenGetter(() => getToken());
  }, [getToken]);

  return null;
}


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={clerkPubKey}>
        <ClerkTokenBridge />
        <RouterProvider router={router} />
      </ClerkProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
