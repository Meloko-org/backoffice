import { useNavigate } from "react-router-dom";
import type { ProductActionContext } from "../config/product.actions";
import { useDeleteProduct } from "./useDeleteProduct";
import { useMemo } from "react";
import { useDefineConfirm } from "../../../hooks/useDefineConfirm";

export function useProductActionsContext(): ProductActionContext {

  const navigate = useNavigate();
  const defineConfirm = useDefineConfirm();
  const { del } = useDeleteProduct();



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