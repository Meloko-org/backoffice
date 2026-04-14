type Props = {
  label: string;
  info: string;
  onClick: () => void;
  extraClasses?: string;
  textClasses?: string;
}

export function WithInfoButton({
  label,
  info,
  onClick,
  extraClasses,
  textClasses,
}: Props) {

  return (
    <button
      onClick={onClick}
      className={`${extraClasses}`}
    >
      <div className={`
          ${textClasses}
          flex flex-row justify-between w-full
        `}>
        <span>{label}</span>
        <span>{info}</span> 
      </div>
    </button>
  )
}