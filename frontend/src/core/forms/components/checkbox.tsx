type CheckboxProps = {
  label: string;
  checked: boolean;
  disabled?: boolean;
  error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  value: string;
  onChange: (value: boolean) => void;
}; 

export default function Checkbox({
  label,
  checked,
  disabled,
  error,
  value,
  onChange,
  ...rest
}: CheckboxProps) {
  return (
    <div className="space-y-1">
      <label className="flex items-center gap-2 text-sm text-neutral-500">
        <input {...rest}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        {label}
      </label>

      {error && (
        <p className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
