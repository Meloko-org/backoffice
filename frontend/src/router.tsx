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
import AdminLayoutProvider from "./layouts/admin/providers/AdminLayoutProvider";
import AdminRouteGuard from "./guards/AdminRouteGuard";
import AdminInfoProvider from "./layouts/admin/providers/AdminInfoProvider";
import AdminFamiliesPage from "./features/families/pages/AdminFamiliesPage";
import CreateFamilyPage from "./features/families/pages/CreateFamilyPage";
import EditFamilyPage from "./features/families/pages/EditFamilyPage";
import CreateProductPage from "./features/products/pages/CreateProductPage";
import EditProductPage from "./features/products/pages/EditProductPage";
import CreateMarketPage from "./features/markets/pages/CreateMarketPage";
import EditMarketPage from "./features/markets/pages/EditMarketPage";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/post-login", element: <PostLoginRedirect /> },

  {
    path: "/admin",
    element: (
      <AdminGuard>
        <AdminLayoutProvider>
          <AdminInfoProvider>
            <AdminLayout />
          </AdminInfoProvider>
        </AdminLayoutProvider>
      </AdminGuard>
    ),
    children: [
      { 
        index: true, 
        element: (
          <AdminRouteGuard permission="dashboard:read">
            <AdminDashboard />
          </AdminRouteGuard>
        ) 
      },
      { 
        path: "products", 
        element: (
          <AdminRouteGuard permission="products:read">
            <ProductsListPage />
          </AdminRouteGuard>
        )
      },
      { 
        path: "products/create", 
        element: (
          <AdminRouteGuard permission="categories:manage">
            <CreateProductPage />
          </AdminRouteGuard>)
      },
      { 
        path: "products/:id/edit", 
        element: (
          <AdminRouteGuard permission="categories:manage">
            <EditProductPage />
          </AdminRouteGuard>)
      },
      { 
        path: "categories", 
        element: (
          <AdminRouteGuard permission="categories:manage">
            <AdminCategoriesPage />
          </AdminRouteGuard> )
      },
      { 
        path: "categories/create", 
        element: (
          <AdminRouteGuard permission="categories:manage">
            <CreateCategoryPage />
          </AdminRouteGuard>)
      },
      { 
        path: "categories/:id/edit", 
        element: (
          <AdminRouteGuard permission="categories:manage">
            <EditCategoryPage />
          </AdminRouteGuard>)
      },
      { 
        path: "families", 
        element: (
          <AdminRouteGuard permission="families:manage">
            <AdminFamiliesPage />
          </AdminRouteGuard> )
      },
      { 
        path: "families/create", 
        element: (
          <AdminRouteGuard permission="families:manage">
            <CreateFamilyPage />
          </AdminRouteGuard>)
      },
      { 
        path: "families/:id/edit", 
        element: (
          <AdminRouteGuard permission="families:manage">
            <EditFamilyPage />
          </AdminRouteGuard>)
      },
      { 
        path: "products/import", 
        element: (
          <AdminRouteGuard permission="products:import">
            <ProductsImportPage />
          </AdminRouteGuard>) 
      },
      { 
        path: "markets", 
        element: (
          <AdminRouteGuard permission="markets:read">
            <MarketsListPage />
          </AdminRouteGuard>) 
      },
      { 
        path: "markets/create", 
        element: (
          <AdminRouteGuard permission="markets:manage">
            <CreateMarketPage />
          </AdminRouteGuard>)
      },
      { 
        path: "markets/:id/edit", 
        element: (
          <AdminRouteGuard permission="markets:manage">
            <EditMarketPage />
          </AdminRouteGuard>)
      },
      { 
        path: "markets/import", 
        element: (
          <AdminRouteGuard permission="markets:import">
            <MarketsImportPage />
          </AdminRouteGuard> )
      },
      { 
        path: "support", 
        element: <div>Support</div> 
      },
    ],
  }

]);
