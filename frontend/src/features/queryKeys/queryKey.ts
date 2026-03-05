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
};
