import { useNavigate } from "react-router-dom";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { useAdminLayout } from "../../../layouts/admin/contexts/AdminLayoutContext";
import { useConfirm } from "../../../layouts/admin/contexts/ConfirmContext";
import { useAdminList } from "../../../hooks/useAdminList";
import { deleteMarket, getMarketsList, getPostalCodes } from "../api/markets.api";
import { useEffect, useMemo, useState } from "react";
import type { ModelContext } from "../../../types/admin";
import { useInfoContext } from "../../../hooks/useInfoContext";
import type { Market } from "../types/markets";
import { BallTriangle } from "react-loader-spinner";
import { DataListLayout } from "../../../components/data-table/DataListLayout";
import { Pencil, Trash2 } from "lucide-react";

export default function MarketsListPage() {

  const navigate = useNavigate();

  useAdminPage("Liste des points de vente");

  const { openRight, closeRight, isRightOpen } = useAdminLayout();
  const { confirm } = useConfirm();

  const [ postalCodes, setPostalCodes ] = useState<string[]>([]);

  useEffect(() => {
    getPostalCodes().then(setPostalCodes)
  }, [])


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
    filters,
    setFilters,
    limit,
    setLimit,
    handleSort,
  } = useAdminList(getMarketsList);

  const [ selectedMarket, setSelectedMarket ] = useState<Market | null>();

  const infoContext: ModelContext = useMemo(() => {
    if (!selectedMarket) return null;

    return {
      type: "market",
      title: "Détail du point de vente",
      data: selectedMarket,
      onEdit: () => handleEditMarket(selectedMarket),
      onDelete: () => handleDeleteMarket(selectedMarket),
    };
  }, [selectedMarket]);

  useInfoContext(infoContext)


  useEffect(() => {
    if (selectedMarket) {
      openRight();
    } else {
      closeRight();
    }
  }, [selectedMarket])

  const handleSelectMarket = (market: Market) => {
    console.log(market)
    setSelectedMarket(prev =>
      prev?._id === market._id ? null : market
    )
  }

  const handleEditMarket = (market: Market) => {
    navigate(`/admin/markets/${market._id}/edit`)
  }

  const handleDeleteMarket = (market: Market) => {
    setSelectedMarket(market)
    openRight();
    confirm({
      title: "Supprimer le point de vente",
      description: "Cette action est irréversible.",
      onConfirm: async () => {
        await deleteMarket(market._id);
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
          <div className="mx-auto max-w-4xl space-y-6">
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

              limit={limit}
              onLimitChange={setLimit}

              getRowId={(market) => market._id}
              onRowClick={handleSelectMarket}
              onPageChange={setPage}
              columns={[
                { key: "name", label: "Nom", sortable: true },
                { 
                  key: "city", 
                  label: "Ville", 
                  sortable: true,
                  render: (market) => market.address.city,
                },
                {
                  key: "createdAt",
                  label: "Créée le",
                  sortable: true,
                  render: (market) =>
                    new Date(market.createdAt).toLocaleDateString(),
                },
                {
                  key: "actions",
                  label: "",
                  render: (market) => (
                    <div className="table-actions">
                      <button 
                        className="table-action-btn edit" 
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(market)
                          handleEditMarket(market)
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        className="table-action-btn delete" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMarket(market)
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ),
                },
              ]}
              actions={
                <>
                  <select
                    value={filters.postalCode || ""}
                    onChange={(e) => {
                      const value = e.target.value;

                      setFilters((prev) => ({
                        ...prev,
                        postalCode: value || undefined,
                      }));
                    }}
                    className="w-48 toolbar-elt"
                  >
                    <option value="">Code postal</option>

                    {postalCodes?.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>  
                  <button
                    className="btn-primary"
                    onClick={() => navigate("/admin/markets/create")}
                  >
                    Créer un point de vente
                  </button>
                </>
              }
            />
          </div>
        </div>
      )}

    </>
  );
}
