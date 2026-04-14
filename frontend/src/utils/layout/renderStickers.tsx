export function renderBoolSticker(value: boolean) {
  let stickerClass ="sticker-success";

  if (!value) stickerClass = "sticker-alert"

  return (
    <div className={`sticker ${stickerClass}`}></div>
  )
} 

