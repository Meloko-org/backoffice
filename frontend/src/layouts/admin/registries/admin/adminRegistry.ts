/**
 * Stockage runtime
 */

import { categoriesAdmin } from "../../../../features/categories/config/category.admin";
import { familiesAdmin } from "../../../../features/families/config/family.admin";
import { marketsAdmin } from "../../../../features/markets/config/market.admin";
import { ordersAdmin } from "../../../../features/orders/config/order.admin";
import { producersAdmin } from "../../../../features/producers/config/producer.admin";
import { productsAdmin } from "../../../../features/products/config/product.admin";
import { usersAdmin } from "../../../../features/users/config/user.admin";
import { shopsAdmin } from "../../../../features/shops/config/shop.admin";
import type { AdminModels } from "./adminModels"


class AdminRegistry {
  private models: AdminModels;

  constructor(models: AdminModels) {
    this.models = models;
  }

  get<K extends keyof AdminModels>(model: K)  {
    return this.models[model] as AdminModels[K];
  }

  getAll() {
    return this.models;
  }
}


export const adminRegistry = new AdminRegistry({
  users: usersAdmin,
  categories: categoriesAdmin,
  families: familiesAdmin,
  products: productsAdmin,
  markets: marketsAdmin,
  orders: ordersAdmin,
  producers: producersAdmin,
  shops: shopsAdmin,
});

