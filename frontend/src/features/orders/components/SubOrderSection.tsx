import type { SubOrderDetail } from "../types/order";
import { SubOrderCard } from "./SubOrderCard";

interface Props {
  details: SubOrderDetail[];
}

export function SubOrdersSection({ details }: Props) {
  return (
    <div className="bloc">
      {details.map((subOrder) => (
        <SubOrderCard key={subOrder._id} subOrder={subOrder} />
      ))}
    </div>
  );
}
