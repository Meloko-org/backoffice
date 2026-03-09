import { ImageOff } from "lucide-react";
import type { ProductFamily } from "../types/family";
import { rightPanelRegistry } from "../../../layouts/admin/config/rightPanelRegistry";
import DetailsActions from "../../../components/admin/details/DetailsActions";


type Props = {
	family: ProductFamily;
}


export default function FamilyDetails({
	family,
}: Props) {

	if (!family) return null;

  const config = rightPanelRegistry.family;

	const imageUrl = family.image; 
  const hasImage = Boolean(imageUrl);


  return (
    <div className="bloc-details">

      {/* IMAGE */}
      <div className="details-image-ctn">
        <div className="details-image">
          {hasImage ? (
            <img
              src={imageUrl!}
              alt={family.name}
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
          <p className="details-info">{family.name}</p>
        </div>

        <div>
          <p className="details-label">
            Slug
          </p>
          <p className="details-info slug">
            {family.slug}
          </p>
        </div>

        {family.category?.name && (
          <div>
            <p className="details-label">
              Catégorie
            </p>
            <p className="details-info">{family.category.name}</p>
          </div>
        )}

        <div>
          <p className="details-label">
            Type de produits
          </p>
          <p className="details-info">
            {family.productsTypes.map((type) => (
              <span key={type}>{type}</span>
            ))}
          </p>
        </div>

        {family.description && (
          <div>
            <p className="details-label">
              Description
            </p>
            <p className="details-info">
              {family.description}
            </p>
          </div>
        )}

        <div>
          <p className="details-label">
            Tags
          </p>
          {family.tagCategories && family.tagCategories.map((tag) => (
            <p 
              key={tag._id} 
              className="details-info text-black slug"
              style={{ backgroundColor: `${tag.color}`}}
            >
              {tag.name}
            </p>
          ))}
          
        </div>



      {/* ACTIONS */}
      <DetailsActions
        item={family}
        actions={config?.actions ?? []}
        wrapperClasses="details-cols-2 mt-5"
      />

    </div>
  );
}