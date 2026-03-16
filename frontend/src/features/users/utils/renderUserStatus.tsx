import type { User } from "../types/user";

export function renderUserStatus(user: User) {

  let stickerClass = "sticker-success";

  if (user.isDeleted) stickerClass = "sticker-alert";
  else if (user.isSuspended) stickerClass = "sticker-warning";

  return (
    <div className="table-status">
      <div className={`sticker ${stickerClass}`}></div>
    </div>
  );
}