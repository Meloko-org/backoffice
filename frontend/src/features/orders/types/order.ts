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


/* type pour OrderDashboard */
export interface OrderDetail {
  _id: string;
  orderNumber: string;

  user: {
    _id: string;
    email: string;
    firstname: string | null;
    lastname: string | null;
  };

  billingAddress: Address;
  shippingAddress: Address | null;

  details: SubOrderDetail[];

  isWithdrawn: boolean;
  isPaid: boolean;

  paymentMethod: "stripe" | string;
  paymentIntentId?: string;

  totalHT: number;
  totalVAT: number;
  totalTTC: number;

  createdAt: string;
  updatedAt: string;
  paidAt?: string;
}

export interface SubOrderDetail {
  _id: string;

  shop: ShopMini;

  withdrawMode: "clickCollect" | "market";
  withdrawMarket?: string | null;
  withdrawDay?: string | null;

  status: string;
  stockIssue: boolean;

  products: ProductLine[];

  invoice?: InvoiceDetail;
  creditNotes: CreditNoteDetail[];

  shopTotalHT: number;
  shopTotalVAT: number;
  shopTotalTTC: number;
}

export interface ProductLine {
  _id: string;

  product: {
    _id: string;
    product: {
      _id: string;
      name: string;
      family: {
        _id: string;
        name: string;
      }
    };
    price: number;
    productCustomName?: string;
    weightPerUnit?: string;
    origin?: string;
    format?: string;
    portion?: string;
    image?: string;
  };

  quantity: number;
  unit: string;

  unitPriceTTC: number;
  unitPriceHT: number;
  vatRate: number;
  vatAmount: number;

  totalPriceTTC: number;

  productStatus: string;
  refunded: boolean;
  refundReason: string;
  refundedAt: string;
  refundCreditNote: string;
}

export interface InvoiceDetail {
  _id: string;
  invoiceNumber: string;
  issuedAt: string;
  status: string;
  currency: string;

  lines: InvoiceLine[];

  totalHT: number;
  totalVAT: number;
  totalTTC: number;
}

export interface InvoiceLine {
  label: string;
  quantity: number;
  unit: string;
  unitPriceHT: number;
  vatRate: number;

  totalHT: number;
  totalVAT: number;
  totalTTC: number;
}

export interface CreditNoteDetail {
  _id: string;
  shop: string;
  order: string;
  subOrder: string;
  creditNoteNumber: string;
  issuedAt: string;
  invoice: string;
  status: string;
  reason: string;
  lines: CreditNoteLine[];


  totalHT: number;
  totalVAT: number;
  totalTTC: number;
}

export interface CreditNoteLine {
  product: string;
  label: string;
  quantity: number;
  unit: string;
  unitPriceHT: number;
  vatRate: number;
  totalHT: number;
  totalVAT: number;
  totalTTC: number;
}

export interface ShopMini {
  _id: string;
  producer: string;
  siret: string;
  address: {
    postalCode: string;
    city: string;
  };
  isOpen: boolean;
  name: string;
  isPremium: boolean;
}

export interface Address {
  name: string;
  address1: string;
  address2: string;
  postalCode: string;
  city: string;
  country: string;
}