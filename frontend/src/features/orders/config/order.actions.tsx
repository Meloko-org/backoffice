
export type OrderActionContext = {
  navigate: (path: string) => void;
  openRight?: () => void;
  // defineConfirm: <T>(opts: ConfirmOptions<T>) => void;
}