import { useNavigate } from "react-router-dom";
import type { FamilyActionContext } from "../config/family.actions";
import { useMemo } from "react";
import { useDeleteFamily } from "./useDeleteFamily";
import { useRightPanel } from "../../../layouts/admin/contexts/RightPanelContext";
import { useDefineConfirm } from "../../../hooks/useDefineConfirm";

export function useFamilyActionsContext(): FamilyActionContext {

  const navigate = useNavigate();
  const { del } = useDeleteFamily();
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