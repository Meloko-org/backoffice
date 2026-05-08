

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


export type UserCard = {
  id: string;
  lastname?: string;
  firstname?: string;
  email?: string;
  avatar?: string;
  type: "user" | "producer";
}
