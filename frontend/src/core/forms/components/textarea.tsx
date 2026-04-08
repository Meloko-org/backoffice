type TextareaProps = {
  label: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  rows?: number;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange"> & {
  value: string;
  onChange: (value: string) => void;
}; 

export default function Textarea({
  label,
  required,
  disabled,
  error,
  value,
  onChange,
  rows = 4,
  ...rest
}: TextareaProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-neutral-500">
        {label}
        {required && (
          <span className="text-danger ml-1">*</span>
        )}
      </label>

      <textarea {...rest}
        value={value}
        disabled={disabled}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full px-3 py-2 text-sm resize-none
          focus:outline-none focus:ring-0
          ${error && "border-danger focus:ring-danger"}
          ${disabled ? "cursor-not-allowed" : ""}
        `}
      />

      {error && (
        <p className="mt-1 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
