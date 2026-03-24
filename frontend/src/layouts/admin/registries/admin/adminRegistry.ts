/**
 * Stockage runtime
 */

import { categoriesAdmin } from "../../../../features/categories/config/category.admin";
import { familiesAdmin } from "../../../../features/families/config/family.admin";
import { marketsAdmin } from "../../../../features/markets/config/market.admin";
import { productsAdmin } from "../../../../features/products/config/product.admin";
import { usersAdmin } from "../../../../features/users/config/user.admin";
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
});

