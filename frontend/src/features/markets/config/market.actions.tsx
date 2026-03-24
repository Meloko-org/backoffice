import type { ConfirmOptions } from "../../../layouts/admin/providers/ConfirmProvider";

export type MarketActionContext = {
  navigate: (path: string) => void;
  openRight?: () => void;
  defineConfirm: <T>(opts: ConfirmOptions<T>) => void;
  del: (id: string) => Promise<any>;
}