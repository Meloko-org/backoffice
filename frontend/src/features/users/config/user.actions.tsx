import type { ConfirmOptions } from "../../../layouts/admin/providers/ConfirmProvider";



export type UserActionContext = {
  navigate: (path: string) => void;
  openRight?: () => void;
  defineConfirm: <T>(opts: ConfirmOptions<T>) => void;
  suspend: (args: { id: string; reason: string }) => Promise<any>;
  unsuspend: (id: string) => Promise<any>;
  del: (id: string) => Promise<any>;
  restore: (id: string) => Promise<any>;
}

