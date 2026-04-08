import type { ConfirmOptions } from "../../../layouts/admin/providers/ConfirmProvider";

export type ProducerActionContext = {
  navigate: (path: string) => void;
  openRight?: () => void;
  defineConfirm: <T>(opts: ConfirmOptions<T>) => void;
}