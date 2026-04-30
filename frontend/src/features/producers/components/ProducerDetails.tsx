import { useEffect, useMemo, useState } from "react";
import { type ProducerDetails } from "../types/producer";
import { getProducerById } from "../api/producer.api";
import { useProducerActionsContext } from "../hooks/useProducerActionsContext";
import { producerActions } from "../config/producerActionsRegistry";
import Loader from "../../../components/admin/Loader";
import DetailsActions from "../../../components/admin/details/DetailsActions";
import { renderUserStatus } from "../../users/utils/renderUserStatus";
import { Crown } from "lucide-react";
import { formatIBAN } from "../../../utils/data/dataFormatter";
import type { WithId } from "../../../layouts/admin/contexts/RightPanelContext";

type Props = {
  context: WithId<"producer">
}

export default function ProducerDetails({
  context,
}: Props) {

  const { id } = context;

  const [ producer, setProducer ] = useState<ProducerDetails | null>(null);

  /* fetch du producer */
  useEffect(() => {
    getProducerById(id).then(setProducer)
  }, [id])

  const ctx = useProducerActionsContext();

  const actions = useMemo(() => {
    if (!producer) return [];
    return producerActions.getActions(producer, ctx, "details")
  }, [producer, ctx])


  /* loader */
  if (!producer) {
    return (
      <Loader />
    )
  }


  return (
    <div className="bloc-details">

      <div>
        <p className="details-label">
          Raison sociale
        </p>
        <div className="details-info">
          {producer.socialReason}
        </div>
      </div>

      <div>
        <p className="details-label">
          SIREN
        </p>
        <div className="details-info">
          {producer.siren}
        </div>
      </div>

      <div>
        <p className="details-label">
          IBAN
        </p>
        <div className="details-info">
          {formatIBAN(producer.iban)}
        </div>
      </div>

      <div>
        <p className="details-label">
          BIC
        </p>
        <div className="details-info">
          {producer.bic}
        </div>
      </div>

      {producer.address && (
        <>
          <div>
              <p className="details-label">
                Adresse
              </p>
            </div>
          <div className="w-auto adr-card">
            <p className="details-info m-0 px-1">{producer.address.address1}</p>
            <p className="details-info m-0 px-1">{producer.address.address2}</p>
            <div className="space-x-3">
              <span className="details-info px-1">{producer.address.postalCode}</span>
              <span className="details-info px-1">{producer.address.city}</span>
            </div>
          </div>
        </>
      )}

      {/* USER */}
      <div className="text-success font-semibold uppercase text-center text-xs">
        user
      </div>
      <div className="details-cols-2">

        <div>
          <div>
            <p className="details-label-success">
              Nom / Prénom
            </p>
            <div className="details-info">
              <span className="mr-2">{producer.owner.firstname}</span>
              <span>{producer.owner.lastname}</span>
            </div>
          </div>
        </div>

        <div className="details-col-right">
          <div>
            <p className="details-label-success">
              status
            </p>
            <div className="details-info flex flex-row justify-end">
              {renderUserStatus(producer.owner)}
            </div>
          </div>
        </div>
      </div>
      
      

      <div className="text-greener font-bold uppercase text-center text-xs">
        <div className="flex flex-row justify-center">
          Shop
          {producer.shop.isOpen 
            ? (
              <div className="details-badge-success ml-3">Ouvert</div>
            )
            : (
              <div className="details-badge-danger ml-3">Fermé</div>
            )
          }
        </div>
      </div>
      <div>
        <p className="details-label-greener">
          Nom
        </p>
        <p className="details-info flex flex-row">
          {producer.shop.name}
          {producer.shop.isPremium && (
            <Crown className="text-warning ml-3"/>
          )}
        </p>
      </div>
      <div>
        <p className="details-label-greener">
          siret
        </p>
        <p className="details-info">{producer.shop.siret}</p>
      </div>
      <div>
        <p className="details-label-greener">
          types
        </p>
        <p className="details-info">
          {producer.shop.types.map(t => t.label).join(", ")}
        </p>
      </div>
      <div>
        <p className="details-label-greener">
          points de vente
        </p>
        <p className="details-info">{producer.shop.marketsCount}</p>
      </div>

      {producer.shop.address && (
        <>
          <div>
              <p className="details-label-greener">
                Adresse
              </p>
            </div>
          <div className="w-auto adr-card">
            <p className="details-info m-0 px-1">{producer.shop.address.address1}</p>
            <p className="details-info m-0 px-1">{producer.shop.address.address2}</p>
            <div className="space-x-3">
              <span className="details-info px-1">{producer.shop.address.postalCode}</span>
              <span className="details-info px-1">{producer.shop.address.city}</span>
            </div>
            <div className="space-x-3 mt-2">
              <span className="details-info px-1">lat: {producer.shop.address.latitude?.$numberDecimal}</span>
              <span className="details-info px-1">lon: {producer.shop.address.longitude?.$numberDecimal}</span>
            </div>
          </div>
        </>
      )}


      <DetailsActions
        actions={actions}
        wrapperClasses="details-button-row mt-5"
      />
    </div>
  )
}