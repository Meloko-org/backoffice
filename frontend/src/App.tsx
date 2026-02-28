import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import HomePage from "./pages/public/HomePage";
import LoginPage from "./pages/public/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";

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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route 
          path="/admin" 
          element={
            <>
              <SignedIn>
                <AdminDashboard />
              </SignedIn>

              <SignedOut>
                <Navigate to="/login" replace />
              </SignedOut>
            </>
          } />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;

