import type { ConfirmOptions } from "../../../layouts/admin/components/ConfirmPanel";

export type ShopActionContext = {
  navigate: (path: string) => void;
  openRight?: () => void;
  defineConfirm: <T>(opts: ConfirmOptions<T>) => void;
  validate: (id: string) => Promise<any>;
  unvalidate: (id: string) => Promise<any>;
}