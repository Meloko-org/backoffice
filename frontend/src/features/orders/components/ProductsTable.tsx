import { useEffect, useMemo, useState } from "react";
import { DataTable } from "../../../components/data-table/DataTable";
import { useAdminLayout } from "../../../layouts/admin/contexts/AdminLayoutContext";
import type { Column } from "../../../types/DataTable.types";
import { formatPriceToEuros } from "../../../utils/price/priceConverter";
import type { ProductLine } from "../types/order";
import type { ModelContext } from "../../../types/admin";
import { useInfoContext } from "../../../hooks/useInfoContext";
import { getNameFromProductLine } from "../../../utils/product/nameGetter";

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
      data: selectedProduct,
      // onEdit: () => handleEditUser(selectedUser),
      // onDelete: () => handleDeleteUser(selectedUser),
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
    console.log("product :", line)
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
        p.productStatus === "confirmed"
          ? (
            <div className="confirmed-badge">{p.productStatus}</div>
          ) 
          : (
            <div className="cancelled-badge">{p.productStatus}</div>
          )
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
