import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

import HomePage from "./pages/public/HomePage";
import LoginPage from "./pages/public/LoginPage";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";



function App() {
  return (
    
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
  );
}

export default App;

