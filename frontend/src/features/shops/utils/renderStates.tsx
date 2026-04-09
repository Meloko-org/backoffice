import { Check, Cross } from "lucide-react";

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