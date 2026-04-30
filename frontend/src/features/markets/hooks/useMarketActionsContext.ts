import { useNavigate } from "react-router-dom";
import type { MarketActionContext } from "../config/market.actions";
import { useDeleteMarket } from "./useDeleteMarket";
import { useMemo } from "react";
import { useDefineConfirm } from "../../../hooks/useDefineConfirm";

export function useMarketActionsContext(): MarketActionContext {

  const navigate = useNavigate();
  const { del } = useDeleteMarket();
  const defineConfirm = useDefineConfirm();

  return useMemo(() => (
      {
      navigate,
      defineConfirm,
      del,
    }
  ), [
      navigate,
      defineConfirm,
      del,
    ])
}