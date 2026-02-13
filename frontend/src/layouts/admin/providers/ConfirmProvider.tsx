import { useState, type ReactNode } from "react";
import { ConfirmContext } from "../contexts/ConfirmContext";


export type ConfirmOptions = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => Promise<void> | void;
};

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);

  const confirm = (opts: ConfirmOptions) => {
    setOptions(opts);
  };

  const close = () => {
    setOptions(null);
  };

  return (
    <ConfirmContext.Provider
      value={{
        confirm,
        close,
        options,
        isOpen: !!options,
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
}