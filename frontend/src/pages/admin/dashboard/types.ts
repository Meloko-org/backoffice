export type AdminDashboardData = {
  today: {
    ordersCount: number;
    revenue: number;
  };
  users: {
    total: number;
    newToday: number;
    newWeek: number;
  };
  alerts: {
    cancelledOrders: number;
    refunds: number;
  };
  recentOrders: any[];
  recentUsers: any[];
};