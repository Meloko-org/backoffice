import DetailsActions from "../../../components/admin/details/DetailsActions";
import { rightPanelRegistry } from "../../../layouts/admin/config/rightPanelRegistry";
import type { ProductCategory } from "../types/category";
import { ImageOff } from "lucide-react";


type Props = {
	category: ProductCategory;
}


export default function CategoryDetails({
	category,
}: Props) {

	if (!category) return null;

  const config = rightPanelRegistry.category;

	const imageUrl = category.image; 
  const hasImage = Boolean(imageUrl);

  return (
    <div className="bloc-details">
      {/* IMAGE */}
      <div className="details-image-ctn">
        <div className="details-image">
          {hasImage ? (
            <img
              src={imageUrl!}
              alt={category.name}
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
        <p className="details-info">{category.name}</p>
      </div>

      <div>
        <p className="details-label">
          Slug
        </p>
        <p className="details-info slug">
          {category.slug}
        </p>
      </div>

      <div>
        <p className="details-label">
          Type
        </p>
        <p className="details-info">{category.type.name}</p>
      </div>

      <div>
        <p className="details-label">
          Description
        </p>
        <p className="details-info details-desc">
          {category.description}
        </p>
      </div>

      {/* ACTIONS */}
      <DetailsActions
        item={category}
        actions={config?.actions ?? []}
        wrapperClasses="details-cols-2 mt-5"
      />

    </div>
  );
}