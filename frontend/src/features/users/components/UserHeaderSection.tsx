import { ImageOff } from "lucide-react";
import type { UserDashboard } from "../types/user";
import { useUserActionsContext } from "../../users/hooks/useUserActionsContext";
import type { UserActionContext } from "../config/user.actions";
import { userActions } from "../config/userActionsRegistry";


type Props = {
  user: UserDashboard["user"];
};

export default function UserHeaderSection({ user }: Props) {

  /* création du context des actions (récupère tous les hooks nécessaires) */
  const baseCtx = useUserActionsContext();
  const ctx: UserActionContext = {
    ...baseCtx
  }

  /* Récupération des actions spécifiques à UserHeaderSection */   
  const actions = userActions.getActions(user, ctx, "user-header")

  return (
    <div className="bloc flex justify-between items-start">
      <div className="flex gap-x-6 items-center m-0">

        {/* Avatar */}
        <div className="w-20 h-20 rounded-full overflow-hidden no-pict">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-1 text-neutral-400 h-full">
              <ImageOff className="w-6 h-6" />
            </div>
          )}
        </div>

        {/* Identity */}
        <div className="space-y-1">
          <h1>
            {user.firstname} {user.lastname}
          </h1>

          <p className="detail-info">{user.email}</p>

          {/* Badges */}
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="detail-info slug px-2 py-1 rounded-full text-xs">
              {user.role.name}
            </span>
          </div>

          <div className="flex gap-2 mt-2 flex-wrap">
            {!user.isDeleted && user.isSuspended && (
              <span className="badge-warning px-2 py-1">
                Suspendu
              </span>
            )}

            {user.isDeleted && (
              <span className="badge-danger px-2 py-1">
                Supprimé
              </span>
            )}
            
          </div>

          {user.lastLoginAt && (
            <p className="bloc-sub-text text-sm mt-2">
              Dernière connexion :{" "}
              {new Date(user.lastLoginAt).toLocaleString()}
            </p>
          )}

          
          <div className="details-cols-2 bg-black rounded-sm pr-2">
            <span className="text-xs text-center text-(--second-text)">créé le {new Date(user.createdAt).toLocaleDateString()}</span>
            <span className="text-xs text-center text-(--second-text)">modifié le {new Date(user.updatedAt).toLocaleDateString()}</span>
          </div>

        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">

        {actions.map((action, index) => {

          const variantClass =
            action.variant === "danger"
              ? "btn-danger"
              : action.variant === "warning"
              ? "btn-outline-primary"
              : "btn-primary";

          return (
            <button
              key={index}
              className={variantClass}
              onClick={() => action.run()}
            >
              {action.label}
            </button>
          );
        })}


      </div>
    </div>
  );
}
