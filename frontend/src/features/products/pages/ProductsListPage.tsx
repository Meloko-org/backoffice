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

export default function AdminProductsPage() {
  const navigate = useNavigate();

  useAdminPage("Liste des produits");

  const { openRight, closeRight, isRightOpen } = useAdminLayout();
  const { confirm } = useConfirm();

  /**
   * récupération des familles pour le select de la toolbar
   */
  const [ families, setFamilies ] = useState<FamilyForSelect[]>([]);
  useEffect(() => {
    getFamilyNames().then(setFamilies);
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
    refetch,
  } = useAdminList(getProductsList);

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

              limit={limit}
              onLimitChange={setLimit}

              getRowId={(product) => product._id}
              onRowClick={handleSelectProduct}
              onPageChange={setPage}
              columns={[
                { key: "name", label: "Nom", sortable: true },
                { key: "slug", label: "Slug", sortable: true },
                {
                  key: "family",
                  label: "Famille",
                  render: (product) => product.family?.name,
                },
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
                  <select
                    value={filters.family || ""}
                    onChange={(e) => {
                      const value = e.target.value;

                      setFilters((prev) => ({
                        ...prev,
                        family: value || undefined,
                      }));
                    }}
                    className="w-48 toolbar-elt"
                  >
                    <option value="">Toutes les familles</option>

                    {families?.map((fam) => (
                      <option key={fam._id} value={fam._id}>
                        {fam.name}
                      </option>
                    ))}
                  </select>
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