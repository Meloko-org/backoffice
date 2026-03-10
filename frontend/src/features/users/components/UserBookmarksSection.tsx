import { useNavigate } from "react-router-dom";
import { EyeButton } from "../../../components/admin/buttons/EyeButton";
import type { Bookmark } from "../types/user"

type Props = {
  bookmarks: Bookmark[];
}

export default function UserBookmarksSection({ bookmarks }:  Props) {

  const navigate = useNavigate();

  return (
    <>
      <h2>Favoris</h2>
      <div className="bloc">
        {bookmarks.length > 0 && bookmarks.map((bmk) => (
          <div key={bmk._id} className="bookmark-raw">
            <div className="flex flex-row items-center rounded-md bg-(--first-plan-bg) pl-3 h-6">
              <p className="text-md font-medium m-0">{bmk.name}</p>
              <EyeButton
                onClick={() => {}}
                extraClasses="ml-5 px-2 py-1"
              />
            </div>
            <div className="grow"></div>
          </div>
        ))}

      </div>
    </>
  )
}