import { ImageOff } from "lucide-react";
import type { User } from "../types/user";
import { formatPriceToEuros } from "../../../utils/price/priceConverter";
import DetailsActions from "../../../components/admin/details/DetailsActions";
import { userActions } from "../config/userActionsRegistry";
import { useEffect, useMemo, useState } from "react";
import { getUserById } from "../api/users.api";
import Loader from "../../../components/admin/Loader";
import { useUserActionsContext } from "../hooks/useUserActionsContext";
import type { WithId } from "../../../layouts/admin/contexts/AdminInfoContext";

type Props = {
	context: WithId<"user"> 
}


export default function UserDetails({
	context,
}: Props) {

  const { id } = context

  const [ user, setUser ] = useState<User | null>(null);

  /* fetch du user */
  useEffect(() => {
    getUserById(id).then(setUser)
  }, [id])

  /* création du context des actions (récupère tous les hooks nécessaires) */
  const ctx = useUserActionsContext();

  /* Récupération des actions spécifiques à UserDetails */ 
  const actions = useMemo(() => {
    if (!user) return [];
    return userActions.getActions(user, ctx, "details")
  }, [user, ctx])

  /* loader */
  if (!user) {
    return (
      <Loader />
    )
  }


	const imageUrl = user.avatar; 
  const hasImage = Boolean(imageUrl);


  return (
    <div className="bloc-details">

      <div className="flex flex-row gap-x-3">
        <div className="w-[65%]">
          <div>
            <p className="details-label">
              Nom / Prénom
            </p>
            <p className="details-info m-0">{user.firstname}</p>
            <p className="details-info">{user.lastname}</p>
            <p className="ml-4 details-info slug">
              {user.role.name}
            </p>
          </div>

          {/* <div>
            <p className="details-label">
              Rôle
            </p>
            <p key={user.role._id} className="details-info slug">
              {user.role.name}
            </p>
          </div> */}

        </div>
        <div className="flex items-center justify-center w-[35%]">
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
      
      
      
      {/* Suspension / Suppression */}
      <div className="details-cols-2">

        <div className="">
          <div className={`
              warning px-2 pt-2 pb-0
              ${user.isSuspended ? "bg-warning/30" : ""}
            `}>

            <div className="flex flex-row gap-x-1 items-center">
              <div className="basis-1/3">
                <p className="details-label-warning">
                  Suspendu
                </p>
              </div>
              <div className="basis-2/3">
                <p className="details-info">
                  {user.isSuspended ? "Oui" : "Non"}
                </p>
              </div>
            </div>

            {user.isSuspended && (
              <>
                <div className="flex flex-row gap-x-1">
                  <div className="basis-1/3">
                    <p className="details-label-warning">
                      Le
                    </p>
                  </div>
                  <div className="basis-2/3">
                    <p className="details-info">
                      {new Date(user.suspendedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row gap-x-1">
                  <div className="basis-1/3">
                    <p className="details-label-warning">
                      Raison
                    </p>
                  </div>
                  <div className="basis-2/3">
                    <p className="details-info">
                      {user.suspensionReason}
                    </p>
                  </div>
                </div>
                
              </>
            )}

          </div>
        </div>

        <div className="">
          <div className={`
              alert px-2 pt-2 pb-0 
              ${user.isDeleted ? "bg-danger/30" : ""}
            `}>

            <div className="flex flex-row gap-x-1 items-center">
              <div className="basis-1/3">
                <p className="details-label-danger">
                  Supprimé
                </p>
              </div>
              <div className="basis-2/3">
                <p className="details-info">
                  {user.isDeleted ? "Oui" : "Non"}
                </p>
              </div>
            </div>

            {user.isDeleted && (
              <>
                <div className="flex flex-row gap-x-1">
                  <div className="basis-1/3">
                    <p className="details-label-danger">
                      Le
                    </p>
                  </div>
                  <div className="basis-2/3">
                    <p className="details-info">
                      {new Date(user.deletedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-row gap-x-1">
                  <div className="basis-1/3">
                    <p className="details-label-danger">
                      Par
                    </p>
                  </div>
                  <div className="basis-2/3">
                    <p className="details-info">
                      {user.deletedByAdmin.lastname}
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
        <p className="details-label">
          Email
        </p>
        <p className="details-info">
          {user.email}
        </p>
      </div>

      <div>
        <p className="details-label">
          ClerkUUId
        </p>
        <p className="details-info">
          {user.clerkUUID}
        </p>
      </div>
      
      {user.addresses && user.addresses.length > 0 && (
        <div className="h-30 overflow-y-auto">
          <div>
            <p className="details-label">
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
                <p className="details-info m-0 px-1">{adr.address.address1}</p>
                <p className="details-info m-0 px-1">{adr.address.address2}</p>
                <div className="space-x-3">
                  <span className="details-info px-1">{adr.address.postalCode}</span>
                  <span className="details-info px-1">{adr.address.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
        
      {user.stripeUUID && (
        <>
          <div>
            <p className="details-label">
              StripeUUID
            </p>
            <p className="details-info">
              {user.stripeUUID}
            </p>
          </div>

          <div className="flex flex-row gap-x-2">
            <div className="basis-1/2">
              <p className="details-label">
                Nombre de commandes
              </p>
              <p className="details-info">
                {user.totalOrders}
              </p>
            </div>

            <div className="basis-1/2">
              <p className="details-label">
                Total dépensé
              </p>
              <p className="details-info">
                {formatPriceToEuros(user.totalSpent)}
              </p>
            </div>
          </div>
        </>
      )}

      <DetailsActions
        actions={actions}
        wrapperClasses="details-button-row mt-5"
      />


      {/* IMAGE */}
      {/* <div className="fixed top-17 right-13 w-30">
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
      </div> */}

    </div>

  );
}