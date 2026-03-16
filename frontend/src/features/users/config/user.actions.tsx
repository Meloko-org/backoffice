// import type { UserActionTarget } from "../types/user";
import type { ConfirmOptions } from "../../../layouts/admin/providers/ConfirmProvider";
// import { userActionsRegistry } from "./userActionsRegistry";



export type UserActionContext = {
  navigate: (path: string) => void;
  openRight?: () => void;
  defineConfirm: <T>(opts: ConfirmOptions<T>) => void;
  suspend: (args: { id: string; reason: string }) => Promise<any>;
  unsuspend: (id: string) => Promise<any>;
  del: (id: string) => Promise<any>;
  restore: (id: string) => Promise<any>;
  refetch?: () => Promise<any> | void;
}

// export async function runUserAction(
//   action: string,
//   user: UserActionTarget,
//   ctx: UserActionContext
// ) {

//   const actionDef = userActionsRegistry[action];

//   if (!actionDef) return;

//   return actionDef.run(user, ctx)
// }