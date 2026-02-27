import { useNavigate } from "react-router-dom";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { useAdminLayout } from "../../../layouts/admin/contexts/AdminLayoutContext";
import { useConfirm } from "../../../layouts/admin/contexts/ConfirmContext";
import { useEffect, useMemo, useState } from "react";
import type { FamilyForSelect } from "../../families/types/family";
import { getFamilyNames } from "../../families/api/families.api";
import { useAdminList } from "../../../hooks/useAdminList";
import { deleteProduct, getProductsList } from "../api/products.api";
import type { Product } from "../types/product";
import { useInfoContext } from "../../../hooks/useInfoContext";
import type { ModelContext } from "../../../types/admin";
import { Pencil, Trash2 } from "lucide-react";
import { DataListLayout } from "../../../components/data-table/DataListLayout";
import { BallTriangle } from "react-loader-spinner";
import type { FilterConfig } from "../../../components/data-table/DataFiltersBar";

export default function AdminProductsPage() {
  const navigate = useNavigate();

  useAdminPage("Liste des produits");

  const { openRight, closeRight, isRightOpen } = useAdminLayout();
  const { confirm } = useConfirm();


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
    refetch,
  } = useAdminList(getProductsList);


  /* filtres destinés à DataFiltersBar */

  // récupération des données nécessaires aux filtres: ici les familles
  const [ families, setFamilies ] = useState<FamilyForSelect[]>([]);
  useEffect(() => {
    getFamilyNames().then(setFamilies);
  }, [])

  // configuration des filtres
  const filtersConfig: FilterConfig[] = [
    {
      type: "select",
      key: "family",
      label: "Famille",
      options: families.map((r) => ({
        label: r.name,
        value: r._id,
      })),
    },
  ];

  // retour page quand reset filters
  useEffect(() => {
    setPage(1);
  }, [filters]);


  /* affichage dans la sidebar droite */  
  const [ selectedProduct, setSelectedProduct ] = useState<Product | null>();

  const infoContext: ModelContext = useMemo(() => {
    if (!selectedProduct) return null;

    return {
      type: "product",
      title: "Détail du produit",
      data: selectedProduct,
      onEdit: () => handleEditProduct(selectedProduct),
      onDelete: () => handleDeleteProduct(selectedProduct),
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

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(prev =>
      prev?._id === product._id ? null : product
    )
  }

  const handleEditProduct = (product: Product) => {
    navigate(`/admin/products/${product._id}/edit`)
  }

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product)
    openRight();
    confirm({
      title: "Supprimer le produit",
      description: "Cette action est irréversible.",
      onConfirm: async () => {
        await deleteProduct(product._id);
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

              filters={filters}
              onFiltersChange={setFilters}
              filtersConfig={filtersConfig}

              limit={limit}
              onLimitChange={setLimit}

              getRowId={(product) => product._id}
              onRowClick={handleSelectProduct}
              onPageChange={setPage}
              columns={[
                {
                  key: "family",
                  label: "Famille",
                  render: (product) => product.family?.name,
                },
                { key: "name", label: "Nom", sortable: true },
                { key: "slug", label: "Slug", sortable: true },
                {
                  key: "createdAt",
                  label: "Créée le",
                  sortable: true,
                  render: (product) =>
                    new Date(product.createdAt).toLocaleDateString(),
                },
                {
                  key: "actions",
                  label: "",
                  render: (product) => (
                    <div className="table-actions">
                      <button 
                        className="table-action-btn edit" 
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(product)
                          handleEditProduct(product)
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        className="table-action-btn delete" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProduct(product)
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

                  <button
                    className="btn-primary"
                    onClick={() => navigate("/admin/products/create")}
                  >
                    Créer un produit
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