import { Crown } from "lucide-react";
import { renderValidateState } from "../utils/renderStates";

type Props = {
  isPremium: boolean;
  isValidated: boolean;
  isOpen: boolean;
  extraClasses?: string;
}

export default function ShopStatusesBar({
  isPremium,
  isValidated,
  isOpen,
  extraClasses,
}: Props) {


  return (
    <div className={`${extraClasses} flex flex-row gap-x-1`}>
      <div className="w-full rounded-l-xl shadow flex items-center justify-center bg-(--first-plan-bg) p-2">
        {renderValidateState(isValidated)}
      </div>
      <div className="w-full shadow flex items-center justify-center bg-(--first-plan-bg) p-2">
        {isOpen 
          ? (
            <div className="details-badge-success">Ouvert</div>
          )
          : (
            <div className="details-badge-danger">Fermé</div>
          )
        }
      </div>
      <div className="w-full rounded-r-xl shadow flex items-center justify-center bg-(--first-plan-bg) p-2">
        {isPremium 
          ? ( <Crown className="text-warning" />)
          : ( <Crown className="text-black" />)
        }
      </div>
    </div>
  )
}