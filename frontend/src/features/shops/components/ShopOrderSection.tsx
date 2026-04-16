import { useEffect, useState } from "react";
import { useShopOrders } from "../hooks/useShopOrders";
import type { Column } from "../../../components/data-table/DataTable";
import { DataListLayout } from "../../../components/data-table/DataListLayout";
import { formatPriceToEuros } from "../../../utils/price/priceConverter";
import { FlatStatCard } from "../../../components/admin/cards/FlatStatCard";
import type { ModelInfoContext } from "../../../layouts/admin/contexts/AdminInfoContext";
import type { ShopOrder, ShopSubOrder } from "../types/shop";
import { useInfoContext } from "../../../hooks/useInfoContext";
import { useAdminLayout } from "../../../layouts/admin/contexts/AdminLayoutContext";

interface Props {
  shopId: string;
}

export default function ShopOrderSection({ shopId }: Props) {

  const { openRight, closeRight } = useAdminLayout();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filters, setFilters] = useState({});

  const { data, isLoading } = useShopOrders(shopId, {
    page,
    limit,
    search,
    sortKey,
    sortDirection,
    filters,
  });

  const [ selectedSubOrder, setSelectedSubOrder ] = useState<ShopOrder | null>(null);

  const infoContext: ModelInfoContext = selectedSubOrder
    ? {
      type: "shopSubOrder",
      title: "Détail de la commande du shop",
      id: selectedSubOrder.shopDetail._id
    }
    : null;

  useInfoContext(infoContext)

  useEffect(() => {
    if (infoContext) {
      openRight();
    } else {
      closeRight();
    }
  }, [infoContext])




  if (!data) return null;

  const orders = data.items;
  const stats = data.stats;
  const pagination = data.pagination;

  console.log(data)

  const columns: Column<typeof orders[number]>[] = [
    {
      key: "orderNumber",
      label: "N° commande",
      sortable: true,
    },
    {
      key: "customer",
      label: "Client",
      sortable: true,
      render: (order) => `${order.user.firstname} ${order.user.lastname}`
    },
    {
      key: "shopTotalTTC",
      label: "Montant",
      sortable: true,
      render: (order) => 
        formatPriceToEuros(order.shopDetail.shopTotalTTC)
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      render: (order) => 
        new Date(order.createdAt).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })
    }
  ]

  const handleSelectSubOrder = (shopOrder: ShopOrder) => {
    setSelectedSubOrder(prev =>
      prev?._id === shopOrder._id ? null : shopOrder
    )
  }

  return (
    <div className="shop-dashboard-bloc">

      <div className="flex flex-row justify-between">
        <h2>Commandes</h2>
        <div className="grow flex flex-row justify-end space-x-2">
          <FlatStatCard
            label="Total"
            value={stats.totalOrders}
            extraClasses="h-8"
          />
          <FlatStatCard
            label="Moyenne"
            value={formatPriceToEuros(stats.avgTTC)}
            extraClasses="h-8"
          />
        </div>
      </div>
      

      <DataListLayout
        data={orders ?? []}
        pagination={pagination}
        paginationAlign="center"
        columns={columns}
        loading={isLoading}

        search={search}
        onSearchChange={setSearch}

        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => {
          if (key === sortKey) {
            setSortDirection(prev => prev === "asc" ? "desc" : "asc");
          } else {
            setSortKey(key);
            setSortDirection("asc");
          }
        }}

        filters={filters}
        onFiltersChange={setFilters}

        limit={limit}
        onLimitChange={setLimit}

        onPageChange={setPage}
        getRowId={(row) => row._id}
        onRowClick={handleSelectSubOrder}
      />

    </div>
  )
}