import { useConfirm } from "../../../layouts/admin/contexts/ConfirmContext";
import { Pencil, Trash2, ImageOff } from "lucide-react";
import type { ProductFamily } from "../types/family";
import { deleteFamily } from "../api/families.api";


type Props = {
	family: ProductFamily;
	onEdit?: (family: ProductFamily) => void;
  onDelete?: (family: ProductFamily) => void;
}


export default function FamilyDetails({
	family,
	onEdit,
	onDelete,
}: Props) {

	if (!family) return null;

  const { defineConfirm } = useConfirm();


	const imageUrl = family.image; 
  const hasImage = Boolean(imageUrl);

  const handleDelete = () => {
    defineConfirm({
      title: "Supprimer la famille",
      description: "Cette action est irréversible.",
      onConfirm: async () => {
        await deleteFamily(family._id);
      },
    });
  };

  return (
    <div className="p-4 space-y-4 text-sm">
      {/* IMAGE */}
      <div className="flex justify-center">
        <div className="no-pict w-[80%] aspect-4/3 rounded-lg overflow-hidden flex items-center justify-center">
          {hasImage ? (
            <img
              src={imageUrl!}
              alt={family.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-neutral-400">
              <ImageOff className="w-8 h-8" />
              <span>Aucune image</span>
            </div>
          )}
        </div>
      </div>

      {/* INFOS */}
      <div className="space-y-2">
        <div>
          <p className="detail-label text-xs uppercase tracking-wide">
            Nom
          </p>
          <p className="detail-info font-medium">{family.name}</p>
        </div>

        <div>
          <p className="detail-label text-xs uppercase tracking-wide ">
            Slug
          </p>
          <p className="detail-info slug font-mono text-xs px-2 py-1 rounded inline-block">
            {family.slug}
          </p>
        </div>

        {family.category?.name && (
          <div>
            <p className="detail-label text-xs uppercase tracking-wide">
              Catégorie
            </p>
            <p className="detail-info ">{family.category.name}</p>
          </div>
        )}

        <div>
          <p className="detail-label text-xs uppercase tracking-wide">
            Type de produits
          </p>
          <p className="detail-info leading-relaxed">
            {family.productsTypes.map((type) => (
              <span key={type}>{type}</span>
            ))}
          </p>
        </div>

        {family.description && (
          <div>
            <p className="detail-label text-xs uppercase tracking-wide">
              Description
            </p>
            <p className="detail-info leading-relaxed">
              {family.description}
            </p>
          </div>
        )}

        <div>
          <p className="detail-label text-xs uppercase tracking-wide ">
            Tags
          </p>
          {family.tagCategories && family.tagCategories.map((tag) => (
            <p 
              key={tag._id} 
              className="detail-info text-black slug font-mono text-xs px-2 py-1 mr-2 rounded inline-block"
              style={{ backgroundColor: `${tag.color}`}}
            >
              {tag.name}
            </p>
          ))}
          
        </div>


      </div>

      {/* ACTIONS */}
      {(onEdit || onDelete) && (
        <div className="pt-2 flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(family)}
              className="flex-1 btn-primary flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm"
            >
              <Pencil className="w-4 h-4" />
              Éditer
            </button>
          )}

          {onDelete && (
            <button
              onClick={handleDelete}
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