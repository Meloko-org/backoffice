import { useNavigate } from "react-router-dom";
import type { ShopCardData } from "../../../types/admin"

type Props = {
  shop: ShopCardData;
  extraClasses?: string;
}

export default function ShopCard({ shop, extraClasses}: Props) {

  const navigate = useNavigate();

  const handleLink = () => {
    navigate(`/admin/shops/${shop.id}`)
  }

  return (
    <button 
      onClick={handleLink}
      className={`
          ${extraClasses}
          rounded-lg btn-card
        `}
    >
      <div className="flex flex-row items-center p-1 user space-x-3">

        <div className="h-8 w-8">
          <img
            src={shop.logo || "/images/avatar.svg"}
            onError={(e) => {
              e.currentTarget.src = "/images/avatar.svg"
            }}
            alt={shop.name}
            className="h-full w-full object-fill rounded-full"
          />
        </div>
        <div className="text-lg font-semibold">{shop.name}</div>
        <div className="text-xs text-neutral-400 capitalize">{shop.city}</div>

      </div>

    </button>
  )
}