import { useEffect, useMemo, useState } from "react";
import DetailsActions from "../../../components/admin/details/DetailsActions";
import type { ProductCategory } from "../types/category";
import { ImageOff } from "lucide-react";
import { getCategoryById } from "../api/categories.api";
import { useCategoryActionsContext } from "../hooks/useCategoryActionContext";
import Loader from "../../../components/admin/Loader";
import { categoryActions } from "../config/categoryActionsRegistry";


type Props = {
	id: string;
}


export default function CategoryDetails({
	id,
}: Props) {

	const [ category, setCategory ] = useState<ProductCategory | null>(null)

  useEffect(() => {
    getCategoryById(id).then(setCategory)
  }, [id])

  const ctx = useCategoryActionsContext();

  const actions = useMemo(() => {
    if (!category) return [];
    return categoryActions.getActions(category, ctx, "details")
  }, [category, ctx])


  if (!category) {
    return (
      <Loader />
    )
  }

	const imageUrl = category?.image; 
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
        actions={actions}
        wrapperClasses="details-cols-2 mt-5"
      />

    </div>
  );
}