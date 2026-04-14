import { useState } from "react";
import { DataTable, type Column } from "../../../components/data-table/DataTable";
import { DataTablePagination } from "../../../components/data-table/DataTablePagination";
import { formatPriceToEuros } from "../../../utils/price/priceConverter";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserDashboard } from "../hooks/useUserDashboard";

interface Props {
  userId: string;
}

export default function UserOrderSection({ userId }: Props)  {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(8); // fixe pour dashboard

  const { data, isLoading } = useUserDashboard(userId, page, limit);

  if (!data) return null;

  const orders = data.recentOrders.items;
  const pagination = data.recentOrders.pagination;

  const handleEditOrder = (orderId: string) => {
    navigate(`/admin/orders/${orderId}`);
  }

  const columns: Column<typeof orders[number]>[] = [
    {
      key: "orderNumber",
      label: "Commande",
      sortable: false,
    },
    {
      key: "createdAt",
      label: "Date",
      render: (row) =>
        new Date(row.createdAt).toLocaleDateString(),
    },
    {
      key: "totalTTC",
      label: "Total TTC",
      render: (row) => formatPriceToEuros(row.totalTTC),
    },
    {
      key: "isPaid",
      label: "Paiement",
      render: (row) =>
        row.isPaid ? "Payée" : "Non payée",
    },
    {
      key: "paymentMethod",
      label: "Méthode",
    },
    {
      key: "actions",
      label: "Actions",
      render: (order) => (
        <div className="table-actions">
          <button 
            className="table-action-btn edit" 
            onClick={(e) => {
              e.stopPropagation();
              handleEditOrder(order._id)
            }}
          >
            <Pencil className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <h2>
        Commandes récentes
      </h2>

      <DataTable
        data={orders}
        columns={columns}
        loading={isLoading}
        getRowId={(row) => row._id}
      />

      <DataTablePagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        onChange={setPage}
        align="center"
      />
    </div>
  );
};