import { ImageOff, Pencil, Trash2 } from "lucide-react";
import { useConfirm } from "../../../layouts/admin/contexts/ConfirmContext";
import type { User } from "../types/user";
import { formatPriceToEuros } from "../../../utils/price/priceConverter";

type Props = {
	user: User;
	onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}


export default function UserDetails({
	user,
	onEdit,
	onDelete,
}: Props) {

	if (!user) return null;

  const { confirm } = useConfirm();


	const imageUrl = user.avatar; 
  const hasImage = Boolean(imageUrl);

  console.log(user)

  const handleDelete = () => {
    confirm({
      title: "Supprimer le user",
      description: "Cette action est irréversible.",
      onConfirm: async () => {
        // await deleteUser(user._id);
      },
    });
  };

  return (
    <div className="p-4 space-y-3 text-sm relative">

      <div>
        <p className="detail-label text-xs uppercase tracking-wide">
          Nom / Prénom
        </p>
        <p className="detail-info font-medium m-0">{user.firstname}</p>
        <p className="detail-info font-medium">{user.lastname}</p>
      </div>

      <div>
        <p className="detail-label text-xs uppercase tracking-wide ">
          Rôle
        </p>
        {user.roles.map((role) => (
          <p key={role._id} className="detail-info slug font-mono text-xs px-2 py-1 rounded inline-block">
            {role.name}
          </p>
        ))}
      </div>
      

      {/* Suspension / Suppression */}
      <div className="flex flex-row gap-x-2">

        <div className="basis-1/2">
          <div className={`
              warning p-2
              ${user.isSuspended ? "bg-warning" : ""}
            `}>

            <div className="flex flex-row gap-x-3 items-center">
              <div className="basis-1/2">
                <p className="detail-label text-xs uppercase tracking-wide ">
                  Suspendu
                </p>
              </div>
              <div className="basis-1/2">
                <p className="detail-info font-medium">
                  {user.isSuspended ? "Oui" : "Non"}
                </p>
              </div>
            </div>

            {user.isSuspended && (
              <>
                <div className="flex flex-row gap-x-3">
                  <div className="basis-1/2">
                    <p className="detail-label text-xs uppercase tracking-wide ">
                      Le
                    </p>
                  </div>
                  <div className="basis-1/2">
                    <p className="detail-info font-medium">
                      {user.suspendedAt}
                    </p>
                  </div>
                </div>
                
                <p className="detail-label text-xs uppercase tracking-wide ">
                  Raison
                </p>
                <p className="detail-info font-medium">
                  {user.suspensionReason}
                </p>
              </>
            )}

          </div>
        </div>

        <div className="basis-1/2">
          <div className={`
              alert p-2 basis-1/2
              ${user.isDeleted ? "bg-danger" : ""}
            `}>

            <div className="flex flex-row gap-x-3 items-center">
              <div className="basis-1/2">
                <p className="detail-label text-xs uppercase tracking-wide ">
                  Supprimé
                </p>
              </div>
              <div className="basis-1/2">
                <p className="detail-info font-medium">
                  {user.isDeleted ? "Oui" : "Non"}
                </p>
              </div>
            </div>

            {user.isDeleted && (
              <>
                <div className="flex flex-row gap-x-1">
                  <div className="basis-1/4">
                    <p className="detail-label text-xs uppercase tracking-wide ">
                      Le
                    </p>
                  </div>
                  <div className="basis-3/4">
                    <p className="detail-info font-medium">
                      {new Date(user.deletedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-row gap-x-1">
                  <div className="basis-1/4">
                    <p className="detail-label text-xs uppercase tracking-wide ">
                      Par
                    </p>
                  </div>
                  <div className="basis-3/4">
                    <p className="detail-info font-medium">
                      {user.deletedByAdmin}
                    </p>
                  </div>
                </div>
                
                
              </>
            )}

          </div>
        </div>
        
      </div>
      

      {/* INFOS */}
      <div>
        <p className="detail-label text-xs uppercase tracking-wide ">
          Email
        </p>
        <p className="detail-info font-medium">
          {user.email}
        </p>
      </div>

      <div>
        <p className="detail-label text-xs uppercase tracking-wide ">
          ClerkUUId
        </p>
        <p className="detail-info font-medium">
          {user.clerkUUID}
        </p>
      </div>

      
      
      {user.addresses && user.addresses.length > 0 && (
        <div className="h-30 overflow-y-auto">
          <div>
            <p className="detail-label text-xs uppercase tracking-wide">
              Adresses
            </p>
          </div>
          <div className="mb-2 flex flex-row flex-wrap gap-x-2">
            {user.addresses.map((adr) => (
              <div key={adr._id} className={`
                w-auto
                ${adr.isDefault === true ? "default-adr-card" : "adr-card"}
              `}>
                <p className={`
                  font-medium
                  ${adr.isDefault === true ? "default-adr-card-title" : "adr-card-title"}
                `}>
                  {adr.name}
                </p>
                <p className="detail-info m-0">{adr.address.address1}</p>
                <p className="detail-info m-0">{adr.address.address2}</p>
                <div className="space-x-3">
                  <span className="detail-info ">{adr.address.postalCode}</span>
                  <span className="detail-info ">{adr.address.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
        
      {user.stripeUUID && (
        <>
          <div>
            <p className="detail-label text-xs uppercase tracking-wide ">
              StripeUUID
            </p>
            <p className="detail-info font-medium">
              {user.stripeUUID}
            </p>
          </div>

          <div className="flex flex-row gap-x-2">
            <div className="basis-1/2">
              <p className="detail-label text-xs uppercase tracking-wide ">
                Nombre de commandes
              </p>
              <p className="detail-info font-medium">
                {user.totalOrders}
              </p>
            </div>

            <div className="basis-1/2">
              <p className="detail-label text-xs uppercase tracking-wide ">
                Total dépensé
              </p>
              <p className="detail-info font-medium">
                {formatPriceToEuros(user.totalSpent)}
              </p>
            </div>
          </div>
        </>
      )}
        
      

      {/* ACTIONS */}
      {(onEdit || onDelete) && (
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(user)}
              className="flex-1 btn-primary flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm"
            >
              <Pencil className="w-4 h-4" />
              Éditer
            </button>
          )}

          {onDelete && (
            <button
              onClick={handleDelete}
              className="flex-1 btn-danger flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Supprimer
            </button>
          )}
        </div>
      )}

      {/* IMAGE */}
      <div className="fixed top-17 right-13 w-30">
          <div className="no-pict w-full aspect-square rounded-full overflow-hidden flex items-center justify-center">
            {hasImage ? (
              <img
                src={imageUrl!}
                alt={user.firstname}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-neutral-400">
                <ImageOff className="w-8 h-8" />
                <span>Aucune image</span>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}