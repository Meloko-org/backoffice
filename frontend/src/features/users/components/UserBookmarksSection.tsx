import { EyeButton } from "../../../components/admin/buttons/EyeButton";
import type { Bookmark } from "../types/user"

type Props = {
  bookmarks: Bookmark[];
}

export default function UserBookmarksSection({ bookmarks }:  Props) {

  return (
    <>
      <h2>Favoris</h2>
      <div className="bloc relative">
        {bookmarks.map((bmk) => (
          <div className="flex flex-row items-center pl-3 mb-1 rounded-md bg-(--first-plan-bg)">
            <p className="text-md font-medium">{bmk.name}</p>
            <EyeButton
              onClick={() => {}}
              extraClasses="ml-5"
            />
          </div>
        ))}

      </div>
    </>
  )
}