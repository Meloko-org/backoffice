import { useNavigate } from "react-router-dom";
import type { OrderActionContext } from "../config/order.actions";
import { useMemo } from "react";
import { useRightPanel } from "../../../layouts/admin/contexts/RightPanelContext";

export function useOrderActionsContext(): OrderActionContext {

  const navigate = useNavigate();


  return useMemo(() => (
    {
      navigate,
    }
  ), [
      navigate,
    ])
}