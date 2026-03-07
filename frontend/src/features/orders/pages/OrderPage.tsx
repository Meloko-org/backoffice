import { useParams } from "react-router-dom";
import { useOrder } from "../../../hooks/useOrder";
import { OrderHeaderSection } from "../components/OrderHeaderSection";
import { CustomerSection } from "../components/CustomerSection";
import { SubOrdersSection } from "../components/SubOrderSection";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { BallTriangle } from "react-loader-spinner";

export function OrderPage() {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, isError } = useOrder(id!);

  useAdminPage("Détail de la commande");

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#98B66E"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
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
