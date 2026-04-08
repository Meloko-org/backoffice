type FloatingTextareaProps = {
  label: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  rows?: number;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange"> & {
  value: string;
  onChange: (value: string) => void;
}; 

export default function FloatingTextarea({
  label,
  required,
  disabled,
  error,
  value,
  onChange,
  rows = 4,
  ...rest
}: FloatingTextareaProps) {

  return (
    <div className="relative">
      <textarea {...rest}
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        disabled={disabled}
        className={`
          peer w-full pr-3 pt-5 pb-2 text-sm pl-4 resize-none
          focus:outline-none focus:ring-0
          ${error && "border-danger focus:ring-danger"}
          ${disabled ? "cursor-not-allowed" : ""}
        `}
      />

      <label
        className="
          absolute left-3 top-1 text-neutral-500 text-sm
          transition-all
          peer-placeholder-shown:top-3
          peer-placeholder-shown:text-base
          peer-focus:top-1
          peer-focus:text-sm
          peer-focus:text-primary
        "
      >
        {label}
        {required && (
          <span className="text-danger ml-1">*</span>
        )}
      </label>

      {error && (
        <p className="mt-1 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
