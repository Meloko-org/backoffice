import { createBrowserRouter } from "react-router-dom";
import AdminGuard from "./guards/AdminGuard";
import Home from "./pages/public/HomePage";
import Login from "./pages/public/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./layouts/admin/AdminLayout";
import PostLoginRedirect from "./pages/PostLoginRedirect";
import ProductsImportPage from "./features/products/pages/ProductsImportPage";
import ProductsListPage from "./features/products/pages/ProductsListPage";
import MarketsImportPage from "./features/markets/pages/MarketsImportPage";
import MarketsListPage from "./features/markets/pages/MarketsListPage";
import AdminCategoriesPage from "./features/categories/pages/AdminCategoriesPage";
import CreateCategoryPage from "./features/categories/pages/CreateCategoryPage";
import EditCategoryPage from "./features/categories/pages/EditCategoryPage";
import AdminLayoutProvider from "../src/layouts/admin/AdminLayoutProvider";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/post-login", element: <PostLoginRedirect /> },

  {
    path: "/admin",
    element: (
      <AdminGuard>
        <AdminLayoutProvider>
          <AdminLayout />
        </AdminLayoutProvider>
      </AdminGuard>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "products", element: <ProductsListPage /> },
      { path: "categories", element: <AdminCategoriesPage /> },
      { path: "categories/create", element: <CreateCategoryPage />},
      { path: "categories/:id/edit", element: <EditCategoryPage />},
      { path: "products/import", element: <ProductsImportPage /> },
      { path: "markets", element: <MarketsListPage /> },
      { path: "markets/import", element: <MarketsImportPage /> },
      { path: "support", element: <div>Support</div> },
    ],
  }

]);
