/**
 * Stockage runtime
 */

import { usersAdmin } from "../../../../features/users/config/user.admin";
import type { AdminModels } from "./adminModels"


class AdminRegistry {
  private models: AdminModels;

  constructor(models: AdminModels) {
    this.models = models;
  }

  get<K extends keyof AdminModels>(model: K): AdminModels[K] {
    return this.models[model];
  }

  getAll() {
    return this.models;
  }
}


export const adminRegistry = new AdminRegistry({
  users: usersAdmin,
});

