import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import type { UserActionContext } from "../config/user.actions";
import { useConfirm } from "../../../layouts/admin/contexts/ConfirmContext";
import { useAdminLayout } from "../../../layouts/admin/contexts/AdminLayoutContext";
import { useSuspendUser } from "../../../hooks/useSuspendUser";
import { useDeleteUser } from "./useDeleteUser";

export function useUserActionsContext(): UserActionContext {

  const navigate = useNavigate();
  const { defineConfirm } = useConfirm();
  const { openRight } = useAdminLayout();

  const { suspend, unsuspend } = useSuspendUser();
  const { del, restore } = useDeleteUser();


  return useMemo(() => (
    {
      navigate,
      openRight,
      defineConfirm,
      suspend,
      unsuspend,
      del,
      restore,
    }
  ), [navigate,
      openRight,
      defineConfirm,
      suspend,
      unsuspend,
      del,
      restore,])
  ;
}