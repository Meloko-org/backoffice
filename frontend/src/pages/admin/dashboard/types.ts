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
  recentOrders: {
    id: string;
    orderNumber: string;
    total: number;
    createdAt: string;
    isPaid: boolean;
  }[];
  recentUsers: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    isProducer: boolean;
  }[];
  timeseries: {
    date: string;
    orders: number;
    revenue: number;
  }[];
  revenue7Days: number;
  avgCart: number;

  topMarkets: TopMarket[];
  topProducts: TopProduct[],
  topShops: TopShop[],

  topMarketsByUsage: {
    name: string;
    count: number;
  }[];
};

/* représente un stock */
export interface TopProduct {
  _id: string;
  quantity: number;
  revenue: number;
  name: string;
  quantityFormatted: string;
}

export interface TopShop {
  _id: string;
  revenue: number;
  orders: number;
  name: string;
}

export interface TopMarket {
  name: string;
  revenue: number;
  count: number;
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

export interface ProductAnalytics {
  product: {
    _id: string;
    name: string;
    family?: string;
    unit: "gr" | "piece";
    type: string[];
  };

  stats: {
    totalQuantity: number;
    totalRevenue: number;
    ordersCount: number;
    avgOrderValue: number;
  };

  timeline: {
    date: string;
    quantity: number;
    revenue: number;
  }[];

  topShops: {
    _id: string;
    name: string;
    quantity: number;
    revenue: number;
  }[];

  pricing: {
    avg: number;
    min: number;
    max: number;
  };

  insights: {
    bestDay: string;
    topShop: string;
    avgPrice: number;
  };
}



export interface TopShopDetails {
  _id: string;
  name: string;
  isPremium: boolean;

  stats: {
    totalRevenue: number;
    ordersCount: number;
    avgOrderValue: number;
  };

  timeline: {
    date: string;
    revenue: number;
    orders: number;
  }[];

  topProducts: {
    _id: string;
    name: string;
    quantity: number;
    revenue: number;
  }[];
}

export interface ShopAnalytics {
  shop: {
    _id: string;
    name: string;
    isPremium: boolean;
  };

  stats: {
    totalRevenue: number;
    ordersCount: number;
    avgOrderValue: number;
  };

  timeline: {
    date: string;
    revenue: number;
    orders: number;
  }[];

  topProducts: {
    name: string;
    quantity: number;
    revenue: number;
  }[];

  revenueByMarket: {
    name: string;
    revenue: number;
  }[];

  insights: {
    bestDay: string;
    bestProduct: string;
    bestMarket: string;
  };
}



export interface TopMarketDetails {

}

export interface MarketAnalytics {

}