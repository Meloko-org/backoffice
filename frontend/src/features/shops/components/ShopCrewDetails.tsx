import { ImageOff } from "lucide-react";
import type { ModelInfoContext } from "../../../layouts/admin/contexts/AdminInfoContext"

type Props = {
  context: Extract<ModelInfoContext, { type: "shopCrew"}>
}


export default function ShopCrewDetails({ context }: Props) {

 

  const crew = context.data.crew;
 console.log("crew context :", crew)

  return (
    <div className="bloc-details">

    {crew.map((m) => (
      <div className="bloc p-4">
        <div className="grid grid-cols-4 gap-3">
          <div className="w-20 h-20 rounded-lg overflow-hidden no-pict mb-2">
            {m.photo ? (
              <img
                src={m.photo}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-1 text-neutral-400 h-full">
                <ImageOff className="w-6 h-6" />
              </div>
            )}
          </div>
          <div className="col-span-3">
            <h2>{m.forname}</h2>
            <p className="slug">
              {m.role.toUpperCase()}
            </p>
            <p className="">
              {m.description}
            </p>
          </div>
        </div>
      </div>
    ))}
      
      
    </div>
  )
}