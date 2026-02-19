import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteFamily, getFamiliesList } from "../api/families.api";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { useInfoContext } from "../../../hooks/useInfoContext";
import type { ModelContext } from "../../../types/admin";
import { useAdminLayout } from "../../../layouts/admin/contexts/AdminLayoutContext";
import { DataListLayout } from "../../../components/data-table/DataListLayout";
import { Pencil, Trash2 } from "lucide-react";
import { useAdminList } from "../../../hooks/useAdminList";
import { useConfirm } from "../../../layouts/admin/contexts/ConfirmContext";
import type { ProductFamily } from "../types/family";
import type { CategoryForSelect } from "../../categories/types/category";
import { getCategoryNames } from "../../categories/api/categories.api";

export default function AdminFamiliesPage() {
  const navigate = useNavigate()

  // définit le titre de la page pour AdminHeader
  useAdminPage("Liste des familles")
  
  const { openRight, closeRight, toggleRight, isRightOpen } = useAdminLayout()
  const { confirm } = useConfirm();


  const [categories, setCategories] = useState<CategoryForSelect[]>([]);

  useEffect(() => {
    getCategoryNames().then(setCategories)
  }, [])


  /*
    "Donne-moi une fonction qui retourne items + pagination,
    je m’occupe du reste : page, search, sort, loading."
  */
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
  } = useAdminList(getFamiliesList);





  /* gère l'affichage de la cat dans la sidebarRight */ 
  const [ selectedFamily, setSelectedFamily ] = useState<ProductFamily | null>(null);

  const infoContext: ModelContext = useMemo(() => {
    if (!selectedFamily) return null;

    return {
      type: "family",
      title: "Détail de la famille",
      data: selectedFamily,
      onEdit: () => handleEditFamily(selectedFamily),
      onDelete: () => handleDeleteFamily(selectedFamily),
    };
  }, [selectedFamily]);

  useInfoContext(infoContext)


  useEffect(() => {
    if (selectedFamily) {
      openRight();
    } else {
      closeRight();
    }
  }, [selectedFamily])


  const handleSelectFamily = (family: ProductFamily) => {
    setSelectedFamily(prev =>
      prev?._id === family._id ? null : family
    )
  }

  const handleEditFamily = (family: ProductFamily) => {
    navigate(`/admin/families/${family._id}/edit`)
  }

  const handleDeleteFamily = (family: ProductFamily) => {
    setSelectedFamily(family)
    openRight();
    confirm({
      title: "Supprimer la famille",
      description: "Cette action est irréversible.",
      onConfirm: async () => {
        await deleteFamily(family._id);
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

	// console.log("ADMIN_CATEGORIES_PAGE")

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

              getRowId={(fam) => fam._id}
              onRowClick={handleSelectFamily}
              onPageChange={setPage}
              columns={[
                { key: "name", label: "Nom", sortable: true },
                { key: "slug", label: "Slug", sortable: true },
                {
                  key: "category",
                  label: "Catégorie",
                  render: (fam) => fam.category?.name,
                },
                {
                  key: "createdAt",
                  label: "Créée le",
                  sortable: true,
                  render: (fam) =>
                    new Date(fam.createdAt).toLocaleDateString(),
                },
                {
                  key: "actions",
                  label: "",
                  render: (fam) => (
                    <div className="table-actions">
                      <button 
                        className="table-action-btn edit" 
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(fam)
                          handleEditFamily(fam)
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        className="table-action-btn delete" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFamily(fam)
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
                    value={filters.category || ""}
                    onChange={(e) => {
                      const value = e.target.value;

                      setFilters((prev) => ({
                        ...prev,
                        category: value || undefined,
                      }));
                    }}
                    className="w-48 toolbar-elt"
                  >
                    <option value="">Toutes les catégories</option>

                    {categories?.map((type) => (
                      <option key={type._id} value={type._id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn-primary"
                    onClick={() => navigate("/admin/families/create")}
                  >
                    Créer une famille
                  </button>
                </>
              }
            />
          </div>
        </div>
      )}

    </>
  );
};
