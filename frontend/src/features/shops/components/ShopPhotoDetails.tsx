import { ImageOff } from "lucide-react";
import type { ModelInfoContext } from "../../../layouts/admin/contexts/AdminInfoContext"

type Props = {
  context: Extract<ModelInfoContext, { type: "shopPhotos"}>
}


export default function ShopPhotoDetails({ context }: Props) {

  const photos = context.data.photos;

  return (
    <div className="bloc-details">

      {photos.length === 0 && (
        <p>Aucune photo disponible</p>
      )}
      
      <div className="flex flex-wrap">
        {photos.map((photo) => (
          <div className="w-50 h-50 rounded-lg overflow-hidden no-pict m-2">
            {photo ? (
              <img
                src={photo}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-1 text-neutral-400 h-full">
                <ImageOff className="w-6 h-6" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}