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

export function renderActiveMarket(isActive: boolean) {
  let badgeClass = "bg-primary w-12";
  let badgeLabel = "actif";

  if (!isActive) {
    badgeClass = "bg-danger w-18";
    badgeLabel = "non actif";
  }

  return (
    <div className={`${badgeClass} rounded-lg px-2 text-center`}>
      {badgeLabel}
    </div>
  )
}

export function renderSocialConnected(isConnected: boolean) {
  let badgeClass = "bg-primary w-20";
  let badgeLabel = "connecté";

  if (!isConnected) {
    badgeClass = "bg-danger w-24";
    badgeLabel = "non connecté";
  }

  return (
    <div className={`${badgeClass} rounded-lg px-2 text-center`}>
      {badgeLabel}
    </div>
  )
}