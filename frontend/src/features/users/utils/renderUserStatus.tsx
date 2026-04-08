import type { OwnerFromProducer } from "../../producers/types/producer";
import type { User } from "../types/user";

export function renderUserStatus(user: User | OwnerFromProducer) {

  let stickerClass = "sticker-success";

  if (user.isDeleted) stickerClass = "sticker-alert";
  else if (user.isSuspended) stickerClass = "sticker-warning";

  return (
    <div className={`sticker ${stickerClass}`}></div>
  );
}