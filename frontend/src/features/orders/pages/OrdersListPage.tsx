import { useNavigate } from "react-router-dom";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { useAdminLayout } from "../../../layouts/admin/contexts/AdminLayoutContext";
import { useConfirm } from "../../../layouts/admin/contexts/ConfirmContext";
import { getOrdersList } from "../api/orders.api";
import { useEffect, useMemo, useState } from "react";
import type { Order } from "../types/order";
import type { ModelContext } from "../../../types/admin";
import { useAdminList } from "../../../hooks/useAdminList";
import { useInfoContext } from "../../../hooks/useInfoContext";
import { BallTriangle } from "react-loader-spinner";
import { DataListLayout } from "../../../components/data-table/DataListLayout";
import { formatPriceToEuros } from "../../../utils/price/priceConverter";
import { DataRowMenu, type RowMenuAction } from "../../../components/data-table/DataRowMenu";
import { Eye, Pencil } from "lucide-react";
import type { FilterConfig } from "../../../components/data-table/DataFiltersBar";

export default function OrdersListPage() {
  const navigate = useNavigate();

  useAdminPage("Liste des commandes");

  const { openRight, closeRight } = useAdminLayout();
  const { defineConfirm } = useConfirm();

  const {
    items,
    pagination,
    loading,
    page,
    setPage,
    search,
    setSearch,
    sortKey,
    sortDirection,
    handleSort,
    filters,
    setFilters,
    limit,
    setLimit,
    refetch,
  } = useAdminList(getOrdersList, { syncWithUrl: true });



  /* filtres destinés à DataFiltersBar */

  const filtersConfig: FilterConfig[] = [
    {
      type: "boolean",
      key: "isPaid",
      label: "Payée"
    },
    {
      type: "boolean",
      key: "isWithdrawn",
      label: "Retirée"
    },
    {
      type: "dateRange",
      fromKey: "paidAtFrom",
      toKey: "paidAtTo",
      label: "Payée"
    }
  ]

  // retour page quand reset filters
  useEffect(() => {
    setPage(1);
  }, [filters]);



  /* affichage dans la sidebar droite */  
  const [ selectedOrder, setSelectedOrder ] = useState<Order | null>();

  const infoContext: ModelContext = useMemo(() => {
    if (!selectedOrder) return null;

    return {
      type: "order",
      title: "Détail de la commande",
      order: selectedOrder,
      onEdit: () => handleEditOrder(selectedOrder),
      onDelete: () => handleDeleteOrder(selectedOrder),
    };
  }, [selectedOrder]);

  useInfoContext(infoContext)

  useEffect(() => {
    if (selectedOrder) {
      openRight();
    } else {
      closeRight();
    }
  }, [selectedOrder])


  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(prev =>
      prev?._id === order._id ? null : order
    )
  }

  const handleEditOrder = (order: Order) => {
    navigate(`/admin/orders/${order._id}`)
  }

  const handleDeleteOrder = (order: Order) => {
    setSelectedOrder(order)
    openRight();
    defineConfirm({
      title: "Supprimer le user",
      description: "Cette action est irréversible.",
      onConfirm: async () => {
        // await deleteUser(user._id);
        refetch();
      },
    });
  }


  const handleSearch = (value: string) => {
    setPage(1);
    setSearch(value);
  };



  useEffect(() => {
    return () => {
      closeRight();
    };
  }, []);




  if (loading) {
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


  return (
    <>

      {items && (
        <div className="p-8">
          <div className="mx-auto max-w-5xl space-y-6">
            <DataListLayout
              data={items}
              pagination={pagination!}
              paginationAlign="center"
              loading={loading}

              search={search}
              onSearchChange={handleSearch}

              sortKey={sortKey}
              sortDirection={sortDirection}
              onSort={handleSort}

              filters={filters}
              onFiltersChange={setFilters}
              filtersConfig={filtersConfig}
              filterReset={true}

              limit={limit}
              onLimitChange={setLimit}

              getRowId={(order) => order._id}
              onRowClick={handleSelectOrder}
              onPageChange={setPage}
              columns={[
                { key: "orderNumber", label: "Numéro", sortable: true },
                { 
                  key: "customer", 
                  label: "Client", 
                  sortable: true,
                  render: (order) =>  
                  `${order.user.firstname} ${order.user.lastname}`
                },
                {
                  key: "totalTTC", 
                  label: "Montant TTC", 
                  sortable: true,
                  render: (order) => formatPriceToEuros(order.totalTTC)
                },
                {
                  key: "isPaid",
                  label: "Payée",
                  sortable: true,
                  render: (order) => (order.isPaid ? "Oui" : "Non")
                },
                {
                  key: "isWithdrawn",
                  label: "Status",
                  sortable: true,
                  render: (order) => order.isWithdrawn ? "retirée" : "non retirée"
                },
                {
                  key: "actions",
                  label: "",
                  render: (order) => (
                    <div className="table-actions">
                      <button 
                        className="table-action-btn edit" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditOrder(order)
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                  ),
                },
              ]}
              // actions={}
            />
          </div>
        </div>
      )}

    </>
  );


  
}