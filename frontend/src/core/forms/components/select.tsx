import type { FieldOption } from "../types";

type SelectProps = {
  label: string;
  disabled?: boolean;
	required?: boolean;
  error?: string;
  options: FieldOption[];
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange"> & {
  value: string;
  onChange: (value: string) => void;
};

export default function Select({
  label,
  disabled = false,
	required,
  error,
  options,
  value,
  onChange,
  ...rest
}: SelectProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-neutral-500">
        {label}{required && <span className="text-danger ml-1">*</span>}
      </label>

      <select {...rest}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full px-3 py-2 text-sm 
          focus:outline-none focus:ring-0
          ${error && "border-danger focus:ring-danger"}
          ${disabled ? "cursor-not-allowed" : ""}
        `}
      >
        <option value="">— Sélectionner —</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
