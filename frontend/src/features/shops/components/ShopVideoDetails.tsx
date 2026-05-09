import type { ModelInfoContext } from "../../../layouts/admin/contexts/RightPanelContext";

type Props = {
  context: Extract<ModelInfoContext, { type: "shopVideos"}>
}


export default function ShopVideoDetails({ context }: Props) {

  const videos = context.data.videos;

  return (
    <div className="bloc-details">
      {videos.length === 0 && (
        <p className="w-full text-center mt-5">Aucune vidéo disponible</p>
      )}

      <div className="space-y-4">
        {videos.map((url) => (
          <div className="aspect-video">
            <video
              key={url}
              src={url}
              controls
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  )
}