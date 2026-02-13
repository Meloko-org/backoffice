import type { ProductCategory } from "../types/category";
import { Pencil, Trash2, ImageOff } from "lucide-react";


type Props = {
	category: ProductCategory;
	onEdit?: (category: ProductCategory) => void;
  onDelete?: (category: ProductCategory) => void;
}


export default function CategoryDetails({
	category,
	onEdit,
	onDelete,
}: Props) {

	if (!category) return null;


	const imageUrl = category.image; 
  const hasImage = Boolean(imageUrl);

  return (
    <div className="p-4 space-y-4 text-sm">
      {/* IMAGE */}
      <div className="no-pict w-full aspect-4/3 rounded-lg overflow-hidden flex items-center justify-center">
        {hasImage ? (
          <img
            src={imageUrl!}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-neutral-400">
            <ImageOff className="w-8 h-8" />
            <span>Aucune image</span>
          </div>
        )}
      </div>

      {/* INFOS */}
      <div className="space-y-2">
        <div>
          <p className="detail-label text-xs uppercase tracking-wide">
            Nom
          </p>
          <p className="detail-info font-medium">{category.name}</p>
        </div>

        <div>
          <p className="detail-label text-xs uppercase tracking-wide ">
            Slug
          </p>
          <p className="detail-info slug font-mono text-xs px-2 py-1 rounded inline-block">
            {category.slug}
          </p>
        </div>

        {category.type?.name && (
          <div>
            <p className="detail-label text-xs uppercase tracking-wide">
              Type
            </p>
            <p className="detail-info ">{category.type.name}</p>
          </div>
        )}

        {category.description && (
          <div>
            <p className="detail-label text-xs uppercase tracking-wide">
              Description
            </p>
            <p className="detail-info leading-relaxed">
              {category.description}
            </p>
          </div>
        )}
      </div>

      {/* ACTIONS */}
      {(onEdit || onDelete) && (
        <div className="pt-2 flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(category)}
              className="flex-1 btn-primary flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm"
            >
              <Pencil className="w-4 h-4" />
              Éditer
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(category)}
              className="flex-1 btn-danger flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Supprimer
            </button>
          )}
        </div>
      )}
    </div>
  );
}