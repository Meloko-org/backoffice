import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCategory, getCategoriesList } from "../api/categories.api";
import type { ProductCategory } from "../types/category";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { useInfoContext } from "../../../hooks/useInfoContext";
import type { ModelContext } from "../../../types/admin";
import { useAdminLayout } from "../../../layouts/admin/contexts/AdminLayoutContext";
import { DataListLayout } from "../../../components/data-table/DataListLayout";
import { Pencil, Trash2 } from "lucide-react";
import { useAdminList } from "../../../hooks/useAdminList";
import { getTypeNames } from "../../types/api/types.api";
import type { TypeForSelect } from "../../types/types/type";
import { useConfirm } from "../../../layouts/admin/contexts/ConfirmContext";

export default function AdminCategoriesPage() {
  const navigate = useNavigate()

  // définit le titre de la page pour AdminHeader
  useAdminPage("Liste des catégories")
  
  const { openRight, closeRight } = useAdminLayout()
  const { confirm } = useConfirm();


  const [types, setTypes] = useState<TypeForSelect[]>([]);

  useEffect(() => {
    getTypeNames().then(setTypes)
  }, [])

  console.log("les types :", types)


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
  } = useAdminList(getCategoriesList);





  /* gère l'affichage de la cat dans la sidebarRight */ 
  const [ selectedCategory, setSelectedCategory ] = useState<ProductCategory | null>(null);

  const infoContext: ModelContext = useMemo(() => {
    if (!selectedCategory) return null;

    return {
      type: "category",
      title: "Détail de la catégorie",
      data: selectedCategory,
      onEdit: () => handleEditCategory(selectedCategory),
      onDelete: () => handleDeleteCategory(selectedCategory),
    };
  }, [selectedCategory]);

  useInfoContext(infoContext)


  const handleSelectCategory = (category: ProductCategory) => {
    console.log("selectedCat :", selectedCategory)
    setSelectedCategory(category)
    openRight();
  }

  const handleEditCategory = (category: ProductCategory) => {
    console.log("edit cat :", category)
    navigate(`/admin/categories/${category._id}/edit`)
  }

  const handleDeleteCategory = (category: ProductCategory) => {
    setSelectedCategory(category)
    openRight();
    confirm({
      title: "Supprimer la catégorie",
      description: "Cette action est irréversible.",
      onConfirm: async () => {
        await deleteCategory(category._id);
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

              getRowId={(cat) => cat._id}
              onRowClick={handleSelectCategory}
              onPageChange={setPage}
              columns={[
                { key: "name", label: "Nom", sortable: true },
                { key: "slug", label: "Slug", sortable: true },
                {
                  key: "type",
                  label: "Type",
                  render: (cat) => cat.type?.name,
                },
                {
                  key: "createdAt",
                  label: "Créée le",
                  sortable: true,
                  render: (cat) =>
                    new Date(cat.createdAt).toLocaleDateString(),
                },
                {
                  key: "actions",
                  label: "",
                  render: (cat) => (
                    <div className="table-actions">
                      <button 
                        className="table-action-btn edit" 
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log(cat)
                          handleEditCategory(cat)
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        className="table-action-btn delete" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(cat)
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
                    value={filters.type || ""}
                    onChange={(e) => {
                      const value = e.target.value;

                      setFilters((prev) => ({
                        ...prev,
                        type: value || undefined,
                      }));
                    }}
                    className="w-48"
                  >
                    <option value="">Tous les types</option>

                    {types?.map((type) => (
                      <option key={type._id} value={type._id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn-primary"
                    onClick={() => navigate("/admin/categories/create")}
                  >
                    Créer une catégorie
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
