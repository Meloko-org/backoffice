// queryKeys.ts
export const queryKeys = {
  userDashboard: (id: string, page: number, limit: number) => [
    "user-dashboard",
    id,
    page,
    limit,
  ],

  orderDetail: (id: string) => [
    "order-detail",
    id,
  ],

  shopDashboard: (id: string) => [
    "shop-dashboard",
    id,
  ],

  shopOrders: (
    id: string,
    params: {
      page: number;
      limit: number;
      search?: string;
      sortKey?: string;
      sortDirection?: string;
      filters?: Record<string, any>;
    }
  ) => [
    "shop-orders",
    id,
    params,
  ],

  shopNotes: (
    id: string,
    params: {
      page: number;
      limit: number;
      search?: string;
      sortKey?: string;
      sortDirection?: string;
      filters?: Record<string, any>;
    }
  ) => [
    "shop-notes",
    id,
    params,
  ],
};
