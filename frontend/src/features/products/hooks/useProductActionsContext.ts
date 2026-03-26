import { useNavigate } from "react-router-dom";
import type { ProductActionContext } from "../config/product.actions";
import { useConfirm } from "../../../layouts/admin/contexts/ConfirmContext";
import { useAdminLayout } from "../../../layouts/admin/contexts/AdminLayoutContext";
import { useDeleteProduct } from "./useDeleteProduct";
import { useMemo } from "react";

export function useProductActionsContext(): ProductActionContext {

  const navigate = useNavigate();
  const { defineConfirm } = useConfirm();
  const { openRight } = useAdminLayout();

  const { del } = useDeleteProduct();

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