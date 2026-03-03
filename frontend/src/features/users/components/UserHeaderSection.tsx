import { ImageOff } from "lucide-react";
import type { UserDashboard } from "../types/user";
import { useSuspendUser } from "../../../hooks/useSuspendUser";
import { useDeleteUser } from "../../../hooks/useDeleteUser";
import { useAdminLayout } from "../../../layouts/admin/contexts/AdminLayoutContext";
import { useConfirm } from "../../../layouts/admin/contexts/ConfirmContext";
import FloatingSelect from "../../../core/forms/components/floatingSelect";


type Props = {
  user: UserDashboard["user"];
};

export default function UserHeaderSection({ user }: Props) {

  const { openRight, isRightOpen } = useAdminLayout();
  const { defineConfirm } = useConfirm();

  const { suspend, unsuspend, isLoading } =
    useSuspendUser(user.id);

  const { del, restore } = useDeleteUser(user.id);




  const handleSuspend = () => {
    if (!isRightOpen) openRight();

    defineConfirm({
      title: "Suspendre l'utilisateur",
      confirmLabel: "Suspendre",
      content: (value, setValue) => (
        <FloatingSelect
          label="Raison de la suspension"
          options={[
            // { value: "", label: "Choisir une raison" },
            { value: "fraud", label: "Fraude" },
            { value: "abuse", label: "Abus" },
            { value: "spam", label: "Spam" },
          ]}
          value={value || ""}
          onChange={setValue}
        />
      ),
      onConfirm: async (reason) => {
        if (!reason) {
          console.log("Aucune raison sélectionnée")
          throw new Error("Aucune raison sélectionnée");
        }

        await suspend(reason); // React Query mutation
      },
    });
  }

  const handleUnsuspend = () => {
    if (!isRightOpen) openRight();
    defineConfirm({
      title: "Réactiver l'utilisateur",
      confirmLabel: "Réactiver",
      description: "Enlever la suspension de l'utilisateur",
      onConfirm: async () => {
        await unsuspend(); // React Query mutation
      },
    });
  }

  const handleDelete = () => {
    if (!isRightOpen) openRight();
    defineConfirm({
      title: "Supprimer l'utilisateur",
      confirmLabel: "Supprimer",
      description: "Un utilisateur supprimé peut être restauré.",
      onConfirm: async () => {
        await del(); // React Query mutation
      },
    });
  }

  const handleRestore = () => {
    if (!isRightOpen) openRight();
    defineConfirm({
      title: "Restaurer l'utilisateur",
      confirmLabel: "Restaurer",
      description: "Restauration d'un utilisateur supprimé.",
      onConfirm: async () => {
        await restore(); // React Query mutation
      },
    });
  }


  console.log("user :", user)

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

            {user.roles.map((role) => (
              <span
                key={role.id}
                className="detail-info slug px-2 py-1 rounded-full text-xs"
              >
                {role.name}
              </span>
            ))}
          </div>

          <div className="flex gap-2 mt-2 flex-wrap">
            {user.isSuspended && (
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
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">

        {!user.isDeleted && (
          !user.isSuspended ? (
            <button 
              className="btn-outline-primary"
              onClick={handleSuspend}
              disabled={isLoading}
            >
              Suspendre
            </button>
          ) : (
            <button 
              className="btn-primary"
              onClick={handleUnsuspend}
              disabled={isLoading}
            >
              Réactiver
            </button>
          )
        )}

        {!user.isDeleted ? (
          <button 
            className="btn-danger"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Supprimer
          </button>
        ) : (
          <button 
            className="btn-outline-primary"
            onClick={handleRestore}
            disabled={isLoading}
          >
            Restaurer
          </button>
        )}

      </div>
    </div>
  );
}
