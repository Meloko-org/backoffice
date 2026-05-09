import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ShopNoteDetail } from "../types/shop";
import { getShopNoteById } from "../api/shops.api";
import Loader from "../../../components/admin/Loader";
import { RatingStars } from "../../../components/global/RatingStars";
import { EyeButton } from "../../../components/admin/buttons/EyeButton";
import {  type WithId } from "../../../layouts/admin/contexts/RightPanelContext";

type Props = {
  context: WithId<"shopNote">
}

export default function ShopNoteDetails({ context }: Props) {
  const navigate = useNavigate();

  const { id } = context;

  const [ shopNote, setShopNote ] = useState<ShopNoteDetail | null>(null);

  useEffect(() => {
    getShopNoteById(id).then(setShopNote)
  }, [id])

  if (!shopNote) {
    return (
      <Loader />
    )
  }

  console.log("note :", shopNote)

  return (
    <div className="bloc-details mt-5">
      
      <div className="text-5xl text-center">
        {shopNote.note}
      </div>
      <div className="justify-self-center">
        <RatingStars rating={shopNote.note} />
      </div>
      <div className="justify-self-center">
        <p className="slug my-5">
          {shopNote.source === "purchase" ? "Achat" : "Visite touristique"}
        </p>
      </div>
      <div className="text-lg text-center">
        "{shopNote.comment}"
      </div>

      <div className="flex flex-row justify-end items-center mb-5">
        <p>{`${shopNote.user.firstname} ${shopNote.user.lastname}`}</p>
        <EyeButton
          onClick={() => navigate(`/admin/users/${shopNote.user._id}`)}
          extraClasses="ml-3"
        />
      </div>
    </div>
  )
}