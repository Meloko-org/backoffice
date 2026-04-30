import { useNavigate } from "react-router-dom";
import type { CategoryActionContext } from "../config/category.actions";
import { useMemo } from "react";
import { useDeleteCategory } from "./useDeleteCategory";
import { useDefineConfirm } from "../../../hooks/useDefineConfirm";

export function useCategoryActionsContext(): CategoryActionContext {

  const navigate = useNavigate();
  const { del } = useDeleteCategory();
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