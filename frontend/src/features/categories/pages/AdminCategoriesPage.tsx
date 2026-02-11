import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../api/categories.api";
import { CategoryTable } from "../components/CategoryTable";
import { Pagination } from "../../../components/global/Pagination";
import type { CategoryListResponse, ProductCategory } from "../types/category";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { useInfoContext } from "../../../hooks/useInfoContext";
import type { ModelContext } from "../../../types/admin";
import { useAdminLayout } from "../../../layouts/admin/AdminLayoutContext";

export default function AdminCategoriesPage() {
  const navigate = useNavigate()
  useAdminPage("Liste des catégories")
  const { openRight, closeRight } = useAdminLayout()

  const [page, setPage] = useState(1);
  const [data, setData] = useState<CategoryListResponse>();
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    const categories = await getCategories({ page, limit: 5 });
    setData(categories)
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, [page]);


  /* gère l'affichage de la cat dans la sidebarRight */ 
  const [ selectedCategory, setSelectedCategory ] = useState<ProductCategory | null>(null);


  const infoContext = useMemo(() => {
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
    setSelectedCategory(category)
    openRight();
  }

  const handleEditCategory = (category: ProductCategory) => {
    navigate(`/admin/categories/${category._id}/edit`)
  }

  const handleDeleteCategory = (category: ProductCategory) => {

  }

  useEffect(() => {
    return () => {
      closeRight();
    };
  }, []);

	// console.log("ADMIN_CATEGORIES_PAGE")

  return (
    <>
      <div className="p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <CategoryTable
            categories={data?.items ?? []}
            loading={loading}
            onEdit={handleEditCategory}
            onDelete={(cat) => console.log("delete", cat)}
            onSelect={handleSelectCategory}
          />
        
          <div className="flex flex-row justify-center">
            <Pagination
              page={page}
              totalPages={data?.pagination.totalPages ?? 0}
              onChange={setPage}
            />
          </div>
        </div>
      </div>

      <button
        className="btn-primary"
        onClick={() => navigate("/admin/categories/create")}
      >
        Créer une catégorie
      </button>

    </>
  );
};
