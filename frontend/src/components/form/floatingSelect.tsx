type FloatingSelectProps = {
	label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  disabled?: boolean;
	required?: boolean;
  error?: string;
}

export function FloatingSelect({
  label,
  value,
  options,
  onChange,
  disabled = false,
	required,
  error,
}: FloatingSelectProps) {
  const hasValue = value !== "";

  return (
    <div className="relative">
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`
          peer w-full rounded-md border bg-white px-3 pt-5 pb-2 text-sm
          focus:outline-none focus:ring-2
          ${error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-indigo-500"}
          ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}
        `}
      >
        <option value="" />
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <label
        className={`
          absolute left-3 transition-all pointer-events-none text-gray-500
          ${
            hasValue
              ? "top-1 text-sm"
              : "top-3 text-md"
          }
          peer-focus:top-1
          peer-focus:text-sm
          peer-focus:text-indigo-600
        `}
      >
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {error && (
        <p className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
