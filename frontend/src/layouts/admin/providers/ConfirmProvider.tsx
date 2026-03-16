import { useState, type ReactNode } from "react";
import { ConfirmContext } from "../contexts/ConfirmContext";


export type ConfirmOptions<T = any> = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  content?: (value: T | undefined, setValue: (v: T) => void) => React.ReactNode;
  onConfirm: (value: T) => void | Promise<void>;
};

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<ConfirmOptions<unknown> | null>(null);

  function defineConfirm<T>(opts: ConfirmOptions<T>) {
    setOptions(opts as ConfirmOptions<unknown>);
  }

  function close() {
    setOptions(null);
  }

  return (
    <ConfirmContext.Provider
      value={{
        defineConfirm,
        close,
        options,
        isConfirmOpen: !!options,
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
}