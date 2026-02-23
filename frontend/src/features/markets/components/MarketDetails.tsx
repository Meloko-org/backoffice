import { ImageOff, Pencil, Trash2 } from "lucide-react";
import { useConfirm } from "../../../layouts/admin/contexts/ConfirmContext";
import type { Market } from "../types/markets";

type Props = {
	market: Market;
	onEdit?: (market: Market) => void;
  onDelete?: (market: Market) => void;
}


export default function FamilyDetails({
	market,
	onEdit,
	onDelete,
}: Props) {

	if (!market) return null;

  const { confirm } = useConfirm();


	const imageUrl = market.image; 
  const hasImage = Boolean(imageUrl);

  const handleDelete = () => {
    confirm({
      title: "Supprimer le point de vente",
      description: "Cette action est irréversible.",
      onConfirm: async () => {
        // await deleteMarket(market._id);
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
            alt={market.name}
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
          <p className="detail-info font-medium">{market.name}</p>
        </div>

        <div>
          <p className="detail-label text-xs uppercase tracking-wide ">
            Slug
          </p>
          <p className="detail-info slug font-mono text-xs px-2 py-1 rounded inline-block">
            {market.slug}
          </p>
        </div>

        {market.address && (
          <div>
            <p className="detail-label text-xs uppercase tracking-wide">
              Adresse
            </p>
            <div>
              <p className="detail-info ">{market.address.addres1}</p>
              <p className="detail-info ">{market.address.address2}</p>
              <div className="space-x-3">
                <span className="detail-info ">{market.address.postalCode}</span>
                <span className="detail-info ">{market.address.city}</span>
              </div>
            </div>

            <div className="flex justify-between gap-x-4">
              <div className="flex items-center w-full gap-x-2">
                <div className="detail-label text-xs uppercase tracking-wide">Latitude</div>
                <div className="detail-info">{market.address.latitude.toString()}</div>
              </div>
              <div className="flex items-center w-full gap-x-2">
                <div className="detail-label text-xs uppercase tracking-wide">Longitude</div>
                <div className="detail-info ">{market.address.longitude.toString()}</div>
              </div>
            </div>

          </div>
        )}



                

        {market.description && (
          <div>
            <p className="detail-label text-xs uppercase tracking-wide">
              Description
            </p>
            <p className="detail-info leading-relaxed">
              {market.description}
            </p>
          </div>
        )}

        


      </div>

      {/* ACTIONS */}
      {(onEdit || onDelete) && (
        <div className="pt-2 flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(market)}
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