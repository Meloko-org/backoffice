export type AdminDashboardData = {
  today: {
    ordersCount: number;
    revenue?: number;
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
  timeseries: {
    date: string;
    orders: number;
    revenue: number;
  }[];
  revenue7Days: number;
  avgCart: number;

  revenueByMarket: {
    name: string;
    revenue: number;
    count: number;
  }[];
  
  topProducs: {
    _id: string;
    name: string;
    quantity: number;
    quantityFormatted: string;
    revenue: number;
  }[],
  topShops: {
    _id: string;
    revenue: number;
    orders: number;
    name: string;
  }[],
  topMarketsByUsage: {
    name: string;
    count: number;
  }[];
};