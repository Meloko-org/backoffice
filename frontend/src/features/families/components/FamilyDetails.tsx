import { ImageOff } from "lucide-react";
import type { ProductFamily } from "../types/family";
import DetailsActions from "../../../components/admin/details/DetailsActions";
import { useEffect, useMemo, useState } from "react";
import { getFamilyById } from "../api/families.api";
import { useFamilyActionsContext } from "../hooks/useFamilyActionsContext";
import { familyActions } from "../config/familyActionsRegistry";
import Loader from "../../../components/admin/Loader";
import type { WithId } from "../../../layouts/admin/contexts/RightPanelContext";


type Props = {
	context: WithId<"family"> 
}


export default function FamilyDetails({
	context,
}: Props) {

  const { id } = context

	const [ family, setFamily ] = useState<ProductFamily | null>(null);

  useEffect(() => {
    getFamilyById(id).then(setFamily)
  }, [id])

  const ctx = useFamilyActionsContext();

  const actions = useMemo(() => {
    if (!family) return [];
    return familyActions.getActions(family, ctx, "details")
  }, [family, ctx])

  if (!family) {
    return (
      <Loader />
    )
  }

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
        actions={actions}
        wrapperClasses="details-cols-2 mt-5"
      />

    </div>
  );
}