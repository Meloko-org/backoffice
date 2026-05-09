import type { Bookmark } from "../types/user"
import type { ShopCardData } from "../../../types/admin";
import ShopCard from "../../../components/admin/cards/ShopCard";

type Props = {
  bookmarks: Bookmark[];
}

export default function UserBookmarksSection({ bookmarks }:  Props) {

  let shops: ShopCardData[] = [];

  if (bookmarks.length > 0) {
    bookmarks.map((bmk) => {
      shops.push({
        id: bmk._id,
        name: bmk.name,
        logo: bmk.logo,
        city: bmk.city,
      })
  })}

  return (
    <>
      <h2>Favoris</h2>
      <div className="bloc space-y-1">
        { shops.length > 0 && shops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} extraClasses="w-full" />
          ))
        }
      </div>
    </>
  )
}