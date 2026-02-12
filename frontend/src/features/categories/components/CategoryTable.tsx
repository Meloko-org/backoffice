/* composant remplacé par DataTable */ 

import { Pencil, Trash2 } from "lucide-react";
import type { ProductCategory } from "../types/category";

interface Props {
  categories: ProductCategory[];
  loading?: boolean;
  onEdit: (category: ProductCategory) => void;
  onDelete: (category: ProductCategory) => void;
  onSelect: (category: ProductCategory) => void;
}

export const CategoryTable = ({
  categories,
  loading,
  onEdit,
  onDelete,
  onSelect,
}: Props) => {
  
  if (loading) {
    return <p>Chargement...</p>;
  }

  if (categories.length === 0) {
    return <p>Aucune catégorie</p>;
  }

  return (
    <div className="admin-table">
      <table>
        <thead>
          <tr>
            <th align="left">Nom</th>
            <th align="left">Slug</th>
            <th align="left">Type</th>
            <th align="left">Créée le</th>
            <th className="w-24"/>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => (
            <tr 
              key={cat._id}
              className="cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition"
              onClick={() => onSelect(cat)} 
            >
              <td>{cat.name}</td>
              <td>{cat.slug}</td>
              <td>{cat.type?.name}</td>
              <td>
                {new Date(cat.createdAt).toLocaleDateString()}
              </td>
              <td>
                <div className="table-actions">
                  <button className="table-action-btn edit" onClick={() => onEdit(cat)}>
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button className="table-action-btn delete" onClick={() => onDelete(cat)}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
