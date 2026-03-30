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
  shops: {
    total: number;
    totalPremium: number;
    newToday: number;
    newTodayPremium: number;
    newWeek: number;
    newWeekPremium: number; 
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
  
  topProducs: TopProduct[],
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


export interface TopProduct {
  _id: string;
  quantity: number;
  revenue: number;
  name: string;
  quantityFormatted: string;
}


export interface TopProductDetails {
  _id: string;

  name: string;
  shop: {
    _id: string;
    name: string;
  };

  product: {
    _id: string;
    name: string;
    family?: string;
  };

  pricing: {
    unit: "gr" | "piece";
    priceTTC: number;
  };

  stats: {
    totalQuantity: number;
    totalRevenue: number;
    ordersCount: number;
  };

  timeline: {
    date: string;
    quantity: number;
    revenue: number;
  }[];
}


