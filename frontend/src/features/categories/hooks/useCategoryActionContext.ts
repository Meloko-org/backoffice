import { useNavigate } from "react-router-dom";
import type { CategoryActionContext } from "../config/category.actions";
import { useConfirm } from "../../../layouts/admin/contexts/ConfirmContext";
import { useAdminLayout } from "../../../layouts/admin/contexts/AdminLayoutContext";
import { useMemo } from "react";
import { useDeleteCategory } from "./useDeleteCategory";

export function useCategoryActionsContext(): CategoryActionContext {

  const navigate = useNavigate();
  const { defineConfirm } = useConfirm();
  const { openRight } = useAdminLayout();

  const { del } = useDeleteCategory();

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