/**
 * contrat global de tous les modèles
 */

import type { categoriesAdmin } from "../../../../features/categories/config/category.admin";
import type { familiesAdmin } from "../../../../features/families/config/family.admin";
import type { marketsAdmin } from "../../../../features/markets/config/market.admin";
import type { ordersAdmin } from "../../../../features/orders/config/order.admin";
import type { productsAdmin } from "../../../../features/products/config/product.admin";
import type { usersAdmin } from "../../../../features/users/config/user.admin";


export type AdminModels = {
  users: typeof usersAdmin;
  categories: typeof categoriesAdmin;
  families: typeof familiesAdmin;
  products: typeof productsAdmin;
  markets: typeof marketsAdmin,
  orders: typeof ordersAdmin,
};

