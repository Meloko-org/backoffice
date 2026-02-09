import React from "react";

type IconButtonProps = {
	iconOn: React.ReactNode;
	iconOff: React.ReactNode;
	onClick?: () => void;
	ariaLabel?: string;
	className?: string;
	isOn: boolean;
}


export default function SwapIconButton({ iconOff, iconOn, onClick, ariaLabel, className, isOn}: IconButtonProps) {

	return (
		<button
			onClick={onClick}
			className={`flex items-center justify-center rounded-full p-2 focus:outline-none cursor-pointer ${className || ''}`}
			aria-label={ariaLabel}
		>
			<div className="relative flex items-center justify-center h-6 w-6">
				<span className={`absolute transition-opacity transform duration-300 ${isOn ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`} >
					{iconOn}
				</span>
				<span className={`absolute transition-opacity transform duration-300 ${isOn ? 'opacity-1000 scale-100' : 'opacity-0 scale-0'}`} >
					{iconOff}
				</span>
			</div>
		</button>
	)
}

