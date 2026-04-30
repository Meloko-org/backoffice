import { useCallback } from "react";
import { useRightPanel } from "../layouts/admin/contexts/RightPanelContext";
import type { ConfirmOptions } from "../layouts/admin/components/ConfirmPanel";

export function useDefineConfirm() {
  const { setOverlay } = useRightPanel();

  return useCallback(<T,>(opts: ConfirmOptions<T>) => {
    setOverlay({
      type: "confirm",
      data: opts
    });
  }, [setOverlay]);
}