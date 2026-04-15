import { ProductsTable } from "./ProductsTable";
import { InvoiceSection } from "./InvoiceSection";
import type { SubOrderDetail } from "../types/order";
import { useNavigate } from "react-router-dom";
import { CreditNoteSection } from "./CreditNoteSection";
import { EyeButton } from "../../../components/admin/buttons/EyeButton";

interface Props {
  subOrder: SubOrderDetail;
}

export function SubOrderCard({ subOrder }: Props) {

  const navigate = useNavigate();

  return (
    <div className="">
      <div className="flex flex-row items-center">
        <h1 className="">
          Boutique : 
        </h1>
        <span className="text-2xl font-semibold mb-4 ml-5">{subOrder.shop.name}</span>
        <EyeButton 
          onClick={() => navigate(`/admin/shops/${subOrder.shop._id}`)}
          extraClasses="mb-4 ml-4"
        />
      </div>
      

      <p className="text-sm mb-2">
        Mode retrait : {subOrder.withdrawMode}
        {subOrder.withdrawMarket && ` - ${subOrder.withdrawMarket}`}
      </p>

      <ProductsTable products={subOrder.products} />

      {subOrder.invoice && (
        <InvoiceSection invoice={subOrder.invoice} />
      )}

      {subOrder.creditNotes.map((c) => (
          <CreditNoteSection key={c._id} creditNote={c} />
        ))
      }

    </div>
  );
}
