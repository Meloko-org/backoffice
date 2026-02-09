import { useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  icon: ReactNode;
  label?: string;
  onClick?: () => void;
  isActive?: boolean;
  showTooltip?: boolean;
	tooltips?: string;
};

export default function SidebarIconButton({
  icon,
  label,
  onClick,
  isActive = false,
  showTooltip = false,
	tooltips,
}: Props) {

	const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

	console.log("coords :", coords)
	console.log(" BUTTON tooltip :", showTooltip)

  return (
		<div className="relative group" >
			<button
				onClick={onClick}
				className={`
					flex items-center gap-3
					w-full rounded-md px-2 h-10
					cursor-pointer
					transition-colors
					text-(--sidebar-item-color)
				hover:bg-black/5 dark:hover:bg-white/10
					${isActive ? "text-(--sidebar-item-active)" : ""}
				`}
				onMouseEnter={(e) => {
					if (!showTooltip) return;
					const rect = e.currentTarget.getBoundingClientRect();
					setCoords({
						top: rect.top + rect.height / 2,
						left: rect.right + 12,
					});
				}}
				onMouseLeave={() => setCoords(null)}
			>
				<div className="flex items-center gap-3">
					<span className="flex h-5 w-5 shrink-0 items-center justify-center leading-none">
						{icon}
					</span>

					{label && <span className="whitespace-nowrap leading-none">{label}</span>}
				</div>
			</button>

			{/* Tooltip */}
			{showTooltip && tooltips && coords && 
				createPortal(
				<div
					className="
						pointer-events-none
						fixed z-1000
						whitespace-nowrap
						rounded-md px-2 py-1 text-sm
						dark:bg-black dark:text-white
						bg-white text-black
						shadow-lg
					"
					style={{ 
						top: coords.top, 
						left: coords.left, 
						transform: "translateY(-50%)" }}
				>
					{tooltips}
				</div>,
				document.getElementById("tooltip-root")!
			)} 
		</div>
  );
}
