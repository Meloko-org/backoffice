import { useEffect, useState } from "react";
import { getCategories } from "../api/categories.api";
import { CategoryTable } from "../components/CategoryTable";
import { Pagination } from "../../../components/global/Pagination";
import type { CategoryListResponse } from "../types/category";

export default function AdminCategoriesPage() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<CategoryListResponse>();
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    const res = await getCategories({ page, limit: 5 });
    setData(res.data);
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
        onEdit={(cat) => console.log("edit", cat)}
        onDelete={(cat) => console.log("delete", cat)}
      />

      <Pagination
        page={page}
        totalPages={data?.pagination.totalPages ?? 0}
        onChange={setPage}
      />

    </>
  );
};
