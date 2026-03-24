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
import CreateCategoryPage from "./features/categories/pages/CreateCategoryPage";
import EditCategoryPage from "./features/categories/pages/EditCategoryPage";
import AdminLayoutProvider from "./layouts/admin/providers/AdminLayoutProvider";
import AdminRouteGuard from "./guards/AdminRouteGuard";
import AdminInfoProvider from "./layouts/admin/providers/AdminInfoProvider";
import CreateFamilyPage from "./features/families/pages/CreateFamilyPage";
import EditFamilyPage from "./features/families/pages/EditFamilyPage";
import CreateProductPage from "./features/products/pages/CreateProductPage";
import EditProductPage from "./features/products/pages/EditProductPage";
import CreateMarketPage from "./features/markets/pages/CreateMarketPage";
import EditMarketPage from "./features/markets/pages/EditMarketPage";
import UsersListPage from "./features/users/pages/UsersListPage";
import UserPage from "./features/users/pages/UserPage";
import OrdersListPage from "./features/orders/pages/OrdersListPage";
import { OrderPage } from "./features/orders/pages/OrderPage";
import EditUserPage from "./features/users/pages/EditUserPage";
import CategoriesListPage from "./features/categories/pages/CategoriesListPage";
import FamiliesListPage from "./features/families/pages/FamiliesListPage";



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
            {/* <AdminCategoriesPage /> */}
            <CategoriesListPage />
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
            {/* <AdminFamiliesPage /> */}
            <FamiliesListPage />
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
        path: "users", 
        element: (
          <AdminRouteGuard permission="users:manage">
            <UsersListPage />
          </AdminRouteGuard>
        )
      },
      { 
        path: "users/:id", 
        element: (
          <AdminRouteGuard permission="users:manage">
            <UserPage />
          </AdminRouteGuard>
        )
      },
      { 
        path: "users/:id/edit", 
        element: (
          <AdminRouteGuard permission="families:manage">
            <EditUserPage />
          </AdminRouteGuard>)
      },
      { 
        path: "orders", 
        element: (
          <AdminRouteGuard permission="orders:manage">
            <OrdersListPage />
          </AdminRouteGuard>
        )
      },
      { 
        path: "orders/:id", 
        element: (
          <AdminRouteGuard permission="orders:manage">
            <OrderPage />
          </AdminRouteGuard>
        )
      },
      { 
        path: "support", 
        element: <div>Support</div> 
      },
    ],
  }

]);
