import { ImageOff, Pencil, Eye, Trash2, Trash } from "lucide-react";
import { useConfirm } from "../../../layouts/admin/contexts/ConfirmContext";
import type { Product } from "../types/product";
import { deleteProduct } from "../api/products.api";
import DetailsButton from "../../../components/admin/buttons/DetailsButton";

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
    <div className="bloc-details">
      {/* IMAGE */}
      <div className="details-image-ctn">
        <div className="details-image">
          {hasImage ? (
            <img
              src={imageUrl!}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="details-no-image">
              <ImageOff className="w-8 h-8" />
              <span>Aucune image</span>
            </div>
          )}
        </div>
      </div>

      {/* INFOS */}
      <div>
        <p className="details-label">
          Nom
        </p>
        <p className="details-info">{product.name}</p>
      </div>

      <div>
        <p className="details-label">
          Slug
        </p>
        <p className="details-info slug ">
          {product.slug}
        </p>
      </div>

      <div>
        <p className="details-label">
          Famille
        </p>
        <p className="details-info">{product.family.name}</p>
      </div>

      <div>
        <p className="details-label">
          Catégorie
        </p>
        <p className="details-info">{product.family.category.name}</p>
      </div>

      <div className="details-cols-3">
        <div className="details-inline">
          <div className="details-label">Unité</div>
          <div className="details-info">{product.weight.unit}</div>
        </div>
        <div className="details-inline">
          <div className="details-label">Mesure</div>
          <div className="details-info ">{product.weight.measurement}</div>
        </div>
        <div className="details-inline">
          <div className="details-label">TVA</div>
          <div className="details-info ">{product.vatRate}</div>
        </div>
      </div>

      
      <div>
        <p className="details-label">
          Description
        </p>
        <p className="details-info details-desc">
          {product.description}
        </p>
      </div>

      

      {/* ACTIONS */}
      {(onEdit || onDelete) && (
        <div className="details-cols-2 mt-5">

          <div className="">
            {onEdit && (

              <DetailsButton
                label="Éditer"
                icon={Eye}
                onClick={() => onEdit(product)}
                extraClasses="w-full btn-primary"
              />
            )}
          </div>

          <div>
            {onDelete && (
              <DetailsButton
                label="Supprimer"
                icon={Trash}
                onClick={handleDelete}
                extraClasses="w-full btn-danger"
              />
              // <button
              //   onClick={handleDelete}
              //   className="flex-1 w-full btn-danger flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm"
              // >
              //   <Trash2 className="w-4 h-4" />
              //   Supprimer
              // </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
}