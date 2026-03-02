import { useRef, useState, type ReactNode } from "react";
import { ConfirmContext } from "../contexts/ConfirmContext";


export type ConfirmOptions<T = any> = {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  content?: (value: T, setValue: (v: T) => void) => React.ReactNode;
  onConfirm: (value: T) => Promise<void>;
  // content?: () => ReactNode;
  // onConfirm: () => Promise<void>;
};

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);

  function defineConfirm(opts: ConfirmOptions) {
    setOptions(opts);
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
        isOpen: !!options,
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
}