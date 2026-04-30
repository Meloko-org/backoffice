import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import type { UserActionContext } from "../config/user.actions";
import { useSuspendUser } from "../../../hooks/useSuspendUser";
import { useDeleteUser } from "./useDeleteUser";
import { useRightPanel } from "../../../layouts/admin/contexts/RightPanelContext";
import type { ConfirmOptions } from "../../../layouts/admin/components/ConfirmPanel";


export function useUserActionsContext(): UserActionContext {

  const navigate = useNavigate();
  const { setOverlay } = useRightPanel();

  const { suspend, unsuspend } = useSuspendUser();
  const { del, restore } = useDeleteUser();

  const defineConfirm = useCallback(<T,>(opts: ConfirmOptions<T>) => {
    console.log("DEFINE CONFIRM CALLED");
    setOverlay({
      type: "confirm",
      data: opts
    });

  }, [setOverlay]);


  return useMemo(() => (
    {
      navigate,
      defineConfirm,
      suspend,
      unsuspend,
      del,
      restore,
    }
  ), [navigate,
      defineConfirm,
      suspend,
      unsuspend,
      del,
      restore,])
  ;
}