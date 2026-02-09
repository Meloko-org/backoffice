import { createContext, useContext } from "react";

type AdminLayoutContextType = {
  isLeftOpen: boolean;
  isRightOpen: boolean;
  toggleLeft: () => void;
  toggleRight: () => void;
  pageTitle: string | null;
  setPageTitle: (title: string | null) => void;
};

export const AdminLayoutContext = createContext<AdminLayoutContextType | null>(
  null
);

export function useAdminLayout() {
  const ctx = useContext(AdminLayoutContext);

  if (!ctx) {
    throw new Error("useAdminLayout must be used inside AdminLayoutProvider");
  }

  return ctx;
}
