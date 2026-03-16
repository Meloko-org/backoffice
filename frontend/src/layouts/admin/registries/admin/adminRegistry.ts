import type { AdminModels } from "./adminModels"


class ModelAdminRegistry<M extends Record<string, any>> {

  private models: Partial<M> = {}

  register<K extends keyof M>(model: K, config: M[K]) {
    this.models[model] = config
  }

  get<K extends keyof M>(model: K): M[K] {
    const config = this.models[model]

    if (!config) {
      throw new Error(`Admin model "${String(model)}" not registered`)
    }

    return config
  }

  getAll() {
    return this.models
  }
}

export const adminRegistry = new ModelAdminRegistry<AdminModels>()