import { useParams } from "react-router-dom";
import { useOrder } from "../../../hooks/useOrder";
import { OrderHeaderSection } from "../components/OrderHeaderSection";
import { CustomerSection } from "../components/CustomerSection";
import { SubOrdersSection } from "../components/SubOrderSection";

export function OrderPage() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = useOrder(id!);

  if (isLoading) return <div>Chargement...</div>;
  if (isError || !order) return <div>Erreur chargement commande</div>;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-row gap-6">
        <div className="basis-1/3 space-y-6">
          <OrderHeaderSection order={order} />
          <CustomerSection order={order} />
        </div>
        <div className="basis-2/3">
          <SubOrdersSection details={order.details} />
        </div>
      </div>
      
    </div>
  );
}
