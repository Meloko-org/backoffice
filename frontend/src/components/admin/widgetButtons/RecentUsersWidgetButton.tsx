type Props = {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    isProducer: boolean;
  }
  onClick: () => void;
  extraClasses?: string;
}


export default function RecentUserswidgetButton({
  user,
  onClick,
  extraClasses
}: Props) {

  return (
    <button
      onClick={onClick}
      className={`
        panel-list-btn
        ${extraClasses}
      `}
    >
      <div className="flex justify-between items-center w-full">
        <span className={`${user.isProducer ? "text-success" :""} font-medium`}>
          #{user.name}
        </span>
        <span className="text-gray-400 text-xs">
          {new Date(user.createdAt).toLocaleDateString()}
        </span>
      </div>
    </button>
  )
}