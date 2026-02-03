import type { ProductCategory } from "../types/category";

interface Props {
  categories: ProductCategory[];
  loading?: boolean;
  onEdit: (category: ProductCategory) => void;
  onDelete: (category: ProductCategory) => void;
}

export const CategoryTable = ({
  categories,
  loading,
  onEdit,
  onDelete,
}: Props) => {
  if (loading) {
    return <p>Chargement...</p>;
  }

  if (categories.length === 0) {
    return <p>Aucune catégorie</p>;
  }

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr className="text-black">
          <th align="left">Nom</th>
          <th align="left">Slug</th>
          <th align="left">Type</th>
          <th align="left">Créée le</th>
          <th />
        </tr>
      </thead>

      <tbody>
        {categories.map((cat) => (
          <tr key={cat._id} className="text-black">
            <td>{cat.name}</td>
            <td>{cat.slug}</td>
            <td>{cat.type?.name}</td>
            <td>
              {new Date(cat.createdAt).toLocaleDateString()}
            </td>
            <td className="text-white">
              <button onClick={() => onEdit(cat)}>✏️</button>
              <button onClick={() => onDelete(cat)}>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
