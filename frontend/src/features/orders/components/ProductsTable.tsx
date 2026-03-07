import { useEffect, useMemo, useState } from "react";
import { DataTable } from "../../../components/data-table/DataTable";
import { useAdminLayout } from "../../../layouts/admin/contexts/AdminLayoutContext";
import type { Column } from "../../../types/DataTable.types";
import { formatPriceToEuros } from "../../../utils/price/priceConverter";
import type { ProductLine } from "../types/order";
import type { ModelContext } from "../../../types/admin";
import { useInfoContext } from "../../../hooks/useInfoContext";
import { getNameFromProductLine } from "../../../utils/product/nameGetter";
import { OrderProductStatusBadge } from "../../../components/admin/badges/OrderProductStatus";

interface Props {
  products: ProductLine[];
}

export function ProductsTable({ products }: Props) {

  const { openRight, closeRight } = useAdminLayout();
  
  /* affichage dans la sidebar droite */  
  const [ selectedProduct, setSelectedProduct ] = useState<ProductLine | null>(null);

  const infoContext: ModelContext = useMemo(() => {
    if (!selectedProduct) return null;

    return {
      type: "orderProduct",
      title: "Détail du produit commandé",
      line: selectedProduct,
      // onEdit: on passe une fonction si nécessaire,
      // onDelete: on passe une fonction si nécessaire,
    };
  }, [selectedProduct]);

  useInfoContext(infoContext)

  useEffect(() => {
    if (selectedProduct) {
      openRight();
    } else {
      closeRight();
    }
  }, [selectedProduct])

  const handleSelectProduct = (line: ProductLine) => {
    setSelectedProduct(prev =>
      prev?._id === line._id ? null : line
    )
  }

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
