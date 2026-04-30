import type { ConfirmOptions } from "../../../layouts/admin/components/ConfirmPanel";

export type FamilyActionContext = {
  navigate: (path: string) => void;
  openRight?: () => void;
  defineConfirm: <T>(opts: ConfirmOptions<T>) => void;
  del: (id: string) => Promise<any>;  
}