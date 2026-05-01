import { ImageOff } from "lucide-react";
import type { ShopActionContext } from "../config/shop.actions";
import { shopActions } from "../config/shopActionsregistry";
import { useShopActionsContext } from "../hooks/useShopActionsContext";
import type { ShopDashboard } from "../types/shop"
import ShopStatusesBar from "./ShopStatusesBar";
import { useRightPanel } from "../../../layouts/admin/contexts/RightPanelContext";

type Props = {
  shop: ShopDashboard["shop"];
}

export function ShopHeaderSection({ shop }: Props) {

  const { setMain } = useRightPanel();

  const baseCtx = useShopActionsContext();
  const ctx: ShopActionContext = {
    ...baseCtx
  }

  const actions = shopActions.getActions(shop, ctx, "shop-header")


  const handleDescriptions = () => {
    setMain({
      type: "shopDescriptions",
      title: "Détail des descriptions",
      data: {
        shortDesc: shop.shortDesc,
        longDesc: shop.longDesc
      }
    })
  }

  return (
    <div className="bloc ">

      <div className="grid grid-cols-6 gap-2">

        <div className="grid gap-3 h-30 content-between">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full overflow-hidden no-pict mb-2">
            {shop.logo ? (
              <img
                src={shop.logo}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-1 text-neutral-400 h-full">
                <ImageOff className="w-6 h-6" />
              </div>
            )}
          </div>

          <div className="justify-self-center-safe">
            <button
              onClick={handleDescriptions}
              className="btn-outline-primary h-8"
            >Desc</button>
          </div>
        </div>

        <div className="col-span-3 space-y-1">
          <h1>
              {shop.name}
            </h1>

            <p className="details-info slug mt-3">
              {shop.siret}
            </p>

            <p className="details-info pl-0">
              {shop.types.map(t => t.label).join(", ")}
            </p>

            
            <div className="details-cols-2 bg-black rounded-sm pr-2">
              <span className="text-xs text-center text-(--second-text) pl-2">créé le {new Date(shop.createdAt).toLocaleDateString()}</span>
              {/* <span className="text-xs text-center text-(--second-text)">modifié le {new Date(shop.updatedAt).toLocaleDateString()}</span> */}
            </div>
        </div>

        <div className="col-span-2 grid gap-3 h-30 content-between">
          <div className="flex flex-row justify-end">
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
          

          
          {/* Statuses */}
          <ShopStatusesBar
            isOpen={shop.isOpen}
            isPremium={shop.isPremium}
            isValidated={shop.isValidated}
            extraClasses="w-full"
          />
        </div>

      </div>

      
      
    </div>
  )
}