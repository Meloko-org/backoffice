import type { OrderProductStatus } from "../../../features/orders/types/order";

interface Props {
  status: OrderProductStatus;
}

export function OrderProductStatusBadge({ status }: Props) {
  const classMap: Record<Props["status"], string> = {
    confirmed: "confirmed-badge",
    cancelled: "cancelled-badge",
  };

  return (
    <div className={classMap[status]}>
      {status}
    </div>
  );
}
