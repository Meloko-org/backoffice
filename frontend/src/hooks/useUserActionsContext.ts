import { useNavigate } from "react-router-dom";
import type { UserActionContext } from "../features/users/config/user.actions";
import { useConfirm } from "../layouts/admin/contexts/ConfirmContext";
import { useSuspendUser } from "./useSuspendUser";
import { useDeleteUser } from "./useDeleteUser";
import { useAdminLayout } from "../layouts/admin/contexts/AdminLayoutContext";

export function useUserActionsContext(): UserActionContext {

  const navigate = useNavigate();
  const { defineConfirm } = useConfirm();
  const { openRight } = useAdminLayout();

  const { suspend, unsuspend } = useSuspendUser();
  const { del, restore } = useDeleteUser();


  return {
    navigate,
    openRight,
    defineConfirm,
    suspend,
    unsuspend,
    del,
    restore,
  };
}