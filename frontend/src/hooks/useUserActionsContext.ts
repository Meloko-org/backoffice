import { useNavigate } from "react-router-dom";
import type { UserActionContext } from "../features/users/config/user.actions";
import { useConfirm } from "../layouts/admin/contexts/ConfirmContext";
import { useSuspendUser } from "./useSuspendUser";
import { useDeleteUser } from "./useDeleteUser";
import { useAdminLayout } from "../layouts/admin/contexts/AdminLayoutContext";
import { useMemo } from "react";

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