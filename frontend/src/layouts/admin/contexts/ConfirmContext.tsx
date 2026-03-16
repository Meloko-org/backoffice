import { createContext, useContext } from "react";
import type { ConfirmOptions } from "../providers/ConfirmProvider";


type ConfirmContextType = {
  defineConfirm: <T>(options: ConfirmOptions<T>) => void;
  close: () => void;
  options: ConfirmOptions<any> | null;
  isConfirmOpen: boolean;
};

export const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used within ConfirmProvider");
  return ctx;
}
