import type { ModelInfoContext } from "../../../layouts/admin/contexts/AdminInfoContext"

type Props = {
  context: Extract<ModelInfoContext, { type: "shopDescriptions"}>
}


export default function ShopDescDetails({ context }: Props) {

  return (
    <div className="bloc-details">
      <div>
        <p className="details-label">
          Description courte
        </p>
        <p className="details-info">
          {context.data.shortDesc}
        </p>
      </div>
      <div>
        <p className="details-label">
          Description longue
        </p>
        <p className="details-info">
          {context.data.longDesc}
        </p>
      </div>
    </div>
  )
}