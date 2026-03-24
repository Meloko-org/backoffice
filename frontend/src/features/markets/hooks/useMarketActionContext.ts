import { useNavigate } from "react-router-dom";
import type { MarketActionContext } from "../config/market.actions";
import { useConfirm } from "../../../layouts/admin/contexts/ConfirmContext";
import { useAdminLayout } from "../../../layouts/admin/contexts/AdminLayoutContext";
import { useDeleteMarket } from "./useDeleteMarket";
import { useMemo } from "react";

export function useMarketActionsContext(): MarketActionContext {

  const navigate = useNavigate();
  const { defineConfirm } = useConfirm();
  const { openRight } = useAdminLayout();

  const { del } = useDeleteMarket();

  return useMemo(() => (
      {
      navigate,
      openRight,
      defineConfirm,
      del,
    }
  ), [
      navigate,
      openRight,
      defineConfirm,
      del,
    ])
}