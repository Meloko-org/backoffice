import type { FieldOption } from "../types";

// type RadioOption = {
//   label: string;
//   value: string;
// };

type RadioGroupProps = {
  label: string;
  options: FieldOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  name: string; // important pour le group
};

export default function RadioGroup({
  label,
  options,
  value,
  onChange,
  error,
  required,
  disabled,
  name,
}: RadioGroupProps) {

  console.log("value :", label, value)
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-neutral-500">
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </div>

      <div className="flex gap-4">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center gap-2 text-sm cursor-pointer ${
              disabled ? "cursor-not-allowed opacity-60" : ""
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              disabled={disabled}
              className="accent-black"
            />
            {option.label}
          </label>
        ))}
      </div>

      {error && (
        <p className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
