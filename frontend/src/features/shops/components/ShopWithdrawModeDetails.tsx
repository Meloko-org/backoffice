import type { ModelInfoContext } from "../../../layouts/admin/contexts/AdminInfoContext"
import { renderActiveMarket } from "../utils/renderStates";

type Props = {
  context: Extract<ModelInfoContext, { type: "shopWithdrawModes"}>
}


export default function ShopWithdrawModeDetails({ context }: Props) {

  const cc = context.data.clickCollect;
  const markets = context.data.markets;

  const dayLabels = [
    "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"
  ]

  console.log("withdraw context :", context)
  return (
    <div className="bloc-details">

      {cc && cc.isActive && (
        <>
          <div className="text-primary font-semibold uppercase text-center text-xs">
            Click & Collect
          </div>
          <div className="details-cols-2">

            <div className="">
              <div>
                <p className="details-label">
                  Horaires
                </p>
                <p className="details-info">
                  {cc.openingHours.map((o) => (
                    <div className="flex flex-row justify-between items-center">
                      <div className="bloc-label">
                        {dayLabels[o.day - 1]}
                      </div>
                      <div className="">
                        {o.periods.map((p) => (
                          <div className="">
                            {p.openingTime} - {p.closingTime}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </p>
              </div>
            </div>

            <div className="details-col-right">
              <div>
                <p className="details-label">
                  Instructions
                </p>
                <p className="details-info">
                  {cc.instructions}
                </p>
              </div>
            </div>

          </div>

          
        </>
      )}

      {markets && markets.length > 0 && (
        <>
          <div className="text-success font-semibold uppercase text-center text-xs">
            Points de vente
          </div>

          <div className="flex flex-row flex-wrap gap-5">
            {markets.map((m) => (
              <div key={m._id} className="w-[47%] bg-(--first-plan-bg)">
                <div>
                  <p className="details-label-success">
                    Nom
                  </p>
                  <p className="details-info">
                    {m.name}
                  </p>
                </div>

                <div>
                  <p className="details-label-success">
                    Horaires
                  </p>
                  <p className="details-info">
                    {m.openingHours.map((o) => (
                      <div className="flex flex-row justify-between items-center">
                        <div className="bloc-label">
                          {dayLabels[o.day - 1]}
                        </div>
                        <div className="">
                          {o.periods.map((p) => (
                            <div className="">
                              {p.openingTime} - {p.closingTime}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </p>
                </div>

                <div>
                  <p className="details-label-success">
                    Actif
                  </p>
                  <p className="details-info place-self-center">
                    {renderActiveMarket(m.isActive)}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </>
      )}
      

    </div>
  )
}