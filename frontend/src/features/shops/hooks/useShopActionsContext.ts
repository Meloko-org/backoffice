import { useNavigate } from "react-router-dom";
import type { ShopActionContext } from "../config/shop.actions";
import { useMemo } from "react";
import { useValidateShop } from "./useValidateShop";
import { useDefineConfirm } from "../../../hooks/useDefineConfirm";

export function useShopActionsContext(): ShopActionContext {

  const navigate = useNavigate();
  const defineConfirm = useDefineConfirm();
  const { validate, unvalidate } = useValidateShop();



  return useMemo(() => (
    {
      navigate,
      defineConfirm,
      validate,
      unvalidate
    }
  ), [navigate,
      defineConfirm,
      validate,
      unvalidate
    ]);
}