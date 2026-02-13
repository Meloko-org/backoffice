import { createContext, useContext } from "react";
import type { ConfirmOptions } from "../providers/ConfirmProvider";


type ConfirmContextType = {
  confirm: (options: ConfirmOptions) => void;
  close: () => void;
  options: ConfirmOptions | null;
  isOpen: boolean;
};

export const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used within ConfirmProvider");
  return ctx;
}
