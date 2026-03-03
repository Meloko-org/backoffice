import { ImageOff, Pencil, Trash2 } from "lucide-react";
import { useConfirm } from "../../../layouts/admin/contexts/ConfirmContext";
import type { Product } from "../types/product";
import { deleteProduct } from "../api/products.api";

type Props = {
	product: Product;
	onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}


export default function FamilyDetails({
	product,
	onEdit,
	onDelete,
}: Props) {

	if (!product) return null;

  const { defineConfirm } = useConfirm();


	const imageUrl = product.image; 
  const hasImage = Boolean(imageUrl);

  const handleDelete = () => {
    defineConfirm({
      title: "Supprimer le produit",
      description: "Cette action est irréversible.",
      onConfirm: async () => {
        await deleteProduct(product._id);
      },
    });
  };

  return (
    <div className="p-4 space-y-4 text-sm">
      {/* IMAGE */}
      <div className="no-pict w-full aspect-4/3 rounded-lg overflow-hidden flex items-center justify-center">
        {hasImage ? (
          <img
            src={imageUrl!}
            alt={product.name}
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
          <p className="detail-info font-medium">{product.name}</p>
        </div>

        <div>
          <p className="detail-label text-xs uppercase tracking-wide ">
            Slug
          </p>
          <p className="detail-info slug font-mono text-xs px-2 py-1 rounded inline-block">
            {product.slug}
          </p>
        </div>

        {product.family?.name && (
          <div>
            <p className="detail-label text-xs uppercase tracking-wide">
              Famille
            </p>
            <p className="detail-info ">{product.family.name}</p>
          </div>
        )}

        {product.family?.category.name && (
          <div>
            <p className="detail-label text-xs uppercase tracking-wide">
              Catégorie
            </p>
            <p className="detail-info ">{product.family.category.name}</p>
          </div>
        )}

        <div className="flex justify-between gap-x-4">
          <div className="flex items-center w-full gap-x-2">
            <div className="detail-label text-xs uppercase tracking-wide">Unité</div>
            <div className="detail-info">{product.weight.unit}</div>
          </div>
          <div className="flex items-center w-full gap-x-2">
            <div className="detail-label text-xs uppercase tracking-wide">Mesure</div>
            <div className="detail-info ">{product.weight.measurement}</div>
          </div>
          <div className="flex items-center w-full gap-x-2">
            <div className="detail-label text-xs uppercase tracking-wide">TAV</div>
            <div className="detail-info ">{product.vatRate}</div>
          </div>
        </div>

        

        {product.description && (
          <div>
            <p className="detail-label text-xs uppercase tracking-wide">
              Description
            </p>
            <p className="detail-info leading-relaxed">
              {product.description}
            </p>
          </div>
        )}

        


      </div>

      {/* ACTIONS */}
      {(onEdit || onDelete) && (
        <div className="pt-2 flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(product)}
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