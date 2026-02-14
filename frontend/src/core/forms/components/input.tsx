type InputProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
	disabled?: boolean;
	error?: string;
  onBlur?: () => void;
};

export default function Input({
  label,
  value,
  onChange,
  required,
	disabled,
	error,
  onBlur,
}: InputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-neutral-500">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`
					w-full px-3 py-2 text-sm
          focus:outline-none focus:ring-0 
					${error && "border-red-500 focus:ring-red-500"}
          ${disabled ? "cursor-not-allowed" : ""}
					`}
      />
			{error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
