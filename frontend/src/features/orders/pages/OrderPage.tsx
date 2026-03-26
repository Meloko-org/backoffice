import { useParams } from "react-router-dom";
import { useOrder } from "../../../hooks/useOrder";
import { OrderHeaderSection } from "../components/OrderHeaderSection";
import { CustomerSection } from "../components/CustomerSection";
import { SubOrdersSection } from "../components/SubOrderSection";
import { useAdminPage } from "../../../hooks/useAdminPage";
import Loader from "../../../components/admin/Loader";

export function OrderPage() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = useOrder(id!);

  useAdminPage("Détail de la commande");

  if (isLoading) {
    return (
      <Loader />
    );
  }

  if (isError || !order) return <div>Erreur chargement commande</div>;

  return (
    <div className="mx-auto max-w-6xl">
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
