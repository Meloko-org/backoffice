import { useEffect, useMemo, useState } from "react";
import { DataTable } from "../../../components/data-table/DataTable";
import type { Column } from "../../../components/data-table/DataTable";
import { formatPriceToEuros } from "../../../utils/price/priceConverter";
import type { ProductLine } from "../types/order";
import { getNameFromProductLine } from "../../../utils/product/nameGetter";
import { OrderProductStatusBadge } from "../../../components/admin/badges/OrderProductStatus";
import { useRightPanelMain } from "../../../hooks/useRightPanelMain";
import { useRightPanel, type ModelInfoContext } from "../../../layouts/admin/contexts/RightPanelContext";

interface Props {
  products: ProductLine[];
}

export function ProductsTable({ products }: Props) {

  const { closeRight } = useRightPanel();
  
  /* affichage dans la sidebar droite */  
  const [ selectedProduct, setSelectedProduct ] = useState<ProductLine | null>(null);


  const infoContext: ModelInfoContext = selectedProduct
    ? {
      type: "orderProduct",
      title: "Détail du produit commandé",
      data: selectedProduct,
    }
    : null;

  useRightPanelMain(infoContext)

  // useEffect(() => {
  //   if (selectedProduct) {
  //     openRight();
  //   } else {
  //     closeRight();
  //   }
  // }, [selectedProduct])

  const handleSelectProduct = (line: ProductLine) => {
    setSelectedProduct(prev =>
      prev?._id === line._id ? null : line
    )
  }


  useEffect(() => {
    return () => {
      closeRight();
    };
  }, []);

  const columns: Column<typeof products[number]>[] = [
    {
      key: "product",
      label: "Produit",
      render: (p) => getNameFromProductLine(p)
    },
    {
      key: "quantity",
      label: "Quantité",
      render: (p) => `${p.quantity} ${p.unit}`
    },
    {
      key: "totalPriceTTC",
      label: "Prix TTC",
      render: (p) => formatPriceToEuros(p.totalPriceTTC)
    },
    {
      key: "productStatus",
      label: "Status",
      render: (p) => (
        <OrderProductStatusBadge status={p.productStatus} />
      )
    },
  ];

  return (
    <DataTable
      data={products}
      columns={columns}
      getRowId={(line) => line._id}
      onRowClick={handleSelectProduct}
    />
  );
}
