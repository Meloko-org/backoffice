import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../api/categories.api";
import { CategoryTable } from "../components/CategoryTable";
import { Pagination } from "../../../components/global/Pagination";
import type { CategoryListResponse } from "../types/category";

export default function AdminCategoriesPage() {
  const navigate = useNavigate()
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

	console.log("data :", data)

  return (
    <>
      <h1>Catégories</h1>

      <CategoryTable
        categories={data?.items ?? []}
        loading={loading}
        onEdit={(cat) => {
          console.log("cat id :", cat._id)
          navigate(`/admin/categories/${cat._id}/edit`)
        }}
        onDelete={(cat) => console.log("delete", cat)}
      />

      <Pagination
        page={page}
        totalPages={data?.pagination.totalPages ?? 0}
        onChange={setPage}
      />

      <button
        onClick={() => navigate("/admin/categories/create")}
      >
        Créer une catégorie
      </button>

    </>
  );
};
