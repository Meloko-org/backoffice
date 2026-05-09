

export type AdminRole =
  | "super-admin"
  | "admin"
  | "support"
  | "dev"
  | "user";


export type SuspensionReason =
  | "abuse"
  | "fraud"
  | "spam";


export type UserCardData = {
  id: string;
  lastname?: string;
  firstname?: string;
  email?: string;
  avatar?: string;
  type: "user" | "producer";
}

export type ShopCardData = {
  id: string;
  name: string;
  logo: string;
  city: string;
}
