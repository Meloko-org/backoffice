import { Check, Cross, Eye, ShoppingBasket } from "lucide-react";

export function renderOpenState(isOpen: boolean) {
  let stickerClass = "sticker-success";

  if (!isOpen) stickerClass = "sticker-alert"

  return (
    <div className={`sticker ${stickerClass}`}></div>
  )
}

export function renderValidateState(isValidated: boolean) {
  let icon = <Cross className="text-danger" />

  if (isValidated) {
    icon = <Check className="text-primary" />
  }

  return icon;
}

export function renderSourceNote(source: "purchase" | "touristVisit") {
  let icon = (source === "purchase")
    ? <ShoppingBasket className="text-primary" />
    : <Eye className="text-success" />

  return icon;
}