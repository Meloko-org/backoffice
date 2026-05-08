import { useNavigate } from "react-router-dom";
import type { UserCard } from "../../../types/admin"

type Props = {
  user: UserCard;
  extraClasses?: string;
}

export default function Usercard({ user, extraClasses }: Props) {

  const navigate = useNavigate();

  const colorClass = user.type === "user" ? "text-success" : "text-warning";

  const handleLink = () => {
    const path = user.type === "user"
      ? `/admin/users/${user.id}`
      : `/admin/producers?search=${user.firstname}`;

    navigate(path);
  }

  return (
    <button 
      onClick={handleLink}
      className={`
          ${extraClasses}
          rounded-lg p-2 btn-card
        `}
    >
      <div className="flex justify-center items-center p-1 user">

        <div className="h-11 w-11">
          <img
            src={user?.avatar || "/images/avatar.svg"}
            onError={(e) => {
              e.currentTarget.src = "/images/avatar.svg"
            }}
            alt="Meloko"
            className="h-full w-full object-fill rounded-full"
          />
        </div>
        <div className="ml-4 text-left pr-5">
          <div className={`${colorClass} text-lg font-semibold`}>{user.firstname} {user.lastname}</div>
          <div className="text-xs text-neutral-400 capitalize">{user.email}</div>
        </div>

      </div>

    </button>
  )
}