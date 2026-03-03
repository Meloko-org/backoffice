import type { PaginationMeta } from "../../../types/global.types";

export interface Order {
  _id: string;
  user: {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
  };
  billingAddress: {
    name: string;
    address1: string;
    address2: string;
    postalCode: string;
    city: string;
    country: string;
  };
  shippingAddress: {
    name: string;
    address1: string;
    address2: string;
    postalCode: string;
    city: string;
    country: string;
  } | null;
  details: {
    products: {
      product: string;
      quantity: number;
      unit: string;
      unitPriceTTC: number;
      unitPriceHT: number;
      vatRate: number;
      vatAmount: number;
      totalPriceTTC: number;
      productStatus: string;
      refunded: boolean;
      _id: string;
    }[];
    withdrawMode: string;
    withdrawMarket: string;
    withdrawDay: string;
    shop: string;
    shopTotalHT: number;
    shopTotalVAT: number;
    shopTotalTTC: number;
    status: string;
    invoice: string;
    creditNotes: string[];
    stockIssue: boolean;
    _id: string;
  }[];
  isWithdrawn: boolean;
  isPaid: boolean;
  paidAt: string;
  paymentMethod: string;
  paymentIntentId: string;
  totalHT: number;
  totalVAT: number;
  totalTTC: number;
  orderNumber: string;
  createdAt: string;
  updatedAt: string;
}


export interface OrderListResponse {
  items: Order[];
  pagination: PaginationMeta;
}