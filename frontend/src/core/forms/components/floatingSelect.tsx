type FloatingSelectProps = {
	label: string;
  disabled?: boolean;
	required?: boolean;
  error?: string;
  options: { value: string; label: string }[];
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange"> & {
  value: string;
  onChange: (value: string) => void;
};


export default function FloatingSelect({
  label,
  disabled = false,
	required,
  error,
  options,
  value,
  onChange,
  ...rest
}: FloatingSelectProps) {
  const hasValue = value !== "";

  return (
    <div className="relative">
      <select {...rest}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`
          peer w-full px-3 pt-5 pb-2 text-sm
          focus:outline-none focus:ring-0
          ${error && "border-danger focus:ring-danger"}
          ${disabled ? "cursor-not-allowed" : ""}
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
          absolute left-3 transition-all pointer-events-none text-neutral-500
          ${
            hasValue
              ? "top-1 text-sm"
              : "top-3 text-md"
          }
          peer-focus:top-1
          peer-focus:text-sm
          peer-focus:text-primary
        `}
      >
        {label}{required && <span className="text-danger ml-1">*</span>}
      </label>

      {error && (
        <p className="mt-1 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
