type RadioOption = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  label: string;
  options: RadioOption[];
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
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-neutral-500">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
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
        <p className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
