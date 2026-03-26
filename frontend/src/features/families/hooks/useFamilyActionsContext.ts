import { useNavigate } from "react-router-dom";
import type { FamilyActionContext } from "../config/family.actions";
import { useAdminLayout } from "../../../layouts/admin/contexts/AdminLayoutContext";
import { useConfirm } from "../../../layouts/admin/contexts/ConfirmContext";
import { useMemo } from "react";
import { useDeleteFamily } from "./useDeleteFamily";

export function useFamilyActionsContext(): FamilyActionContext {

  const navigate = useNavigate();
  const { defineConfirm } = useConfirm();
  const { openRight } = useAdminLayout();

  const { del } = useDeleteFamily();

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