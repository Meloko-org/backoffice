import { EyeButton } from "../../../components/admin/buttons/EyeButton";
import { DataTable } from "../../../components/data-table/DataTable";
import type { Column } from "../../../types/DataTable.types";
import { formatPriceToEuros } from "../../../utils/price/priceConverter";
import type { InvoiceDetail, InvoiceLine } from "../types/order";

interface Props {
  invoice: InvoiceDetail;
}

export function InvoiceSection({ invoice }: Props) {

  const lines: InvoiceLine[] = invoice.lines;
  const columns: Column<typeof lines[number]>[] = [
    {
      key: "label",
      label: "Produit",
    },
    {
      key: "quantity",
      label: "Quantité",
      render: (l) => `${l.quantity} ${l.unit}`
    },
    {
      key: "totalTTC",
      label: "Total TTC",
      render: (l) => formatPriceToEuros(l.totalTTC)
    }
  ]

  return (
    <div className="mt-6 border-t pt-4">
      <div className="flex flex-row items-center">
        <h3 className="font-semibold mb-2">
          Facture {invoice.invoiceNumber}
        </h3>
        <EyeButton
          onClick={() => console.log("affichage de la facture pdf")}
          extraClasses="ml-5"
        />
      </div>
      

      <p className="text-sm mb-2">
        Émise le {new Date(invoice.issuedAt).toLocaleString()}
      </p>

      <div className="mx-auto max-w-2xl">
      <DataTable
        data={lines}
        columns={columns}
        getRowId={(row) => row.label}
      /></div>

      <div className="text-right mt-3 font-semibold">
        Total TTC : {formatPriceToEuros(invoice.totalTTC)}
      </div>
    </div>
  );
}
