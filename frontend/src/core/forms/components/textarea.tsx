type TextareaProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  onBlur?: () => void;
  rows?: number;
};

export default function Textarea({
  label,
  value,
  onChange,
  required,
  disabled,
  error,
  onBlur,
  rows = 4,
}: TextareaProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-neutral-500">
        {label}
        {required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>

      <textarea
        value={value}
        disabled={disabled}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`
          w-full px-3 py-2 text-sm resize-none
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
