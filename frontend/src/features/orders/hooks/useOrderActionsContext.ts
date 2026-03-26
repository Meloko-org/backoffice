import { useNavigate } from "react-router-dom";
import type { OrderActionContext } from "../config/order.actions";
import { useConfirm } from "../../../layouts/admin/contexts/ConfirmContext";
import { useAdminLayout } from "../../../layouts/admin/contexts/AdminLayoutContext";
import { useMemo } from "react";

export function useOrderActionsContext(): OrderActionContext {

  const navigate = useNavigate();
  const { defineConfirm } = useConfirm();
  const { openRight } = useAdminLayout();


  return useMemo(() => (
      {
      navigate,
      openRight,
      defineConfirm,
    }
  ), [
      navigate,
      openRight,
      defineConfirm,
    ])
}