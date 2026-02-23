type FloatingInputProps = {
  label: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  value: string;
  onChange: (value: string) => void;
}; 

export default function FloatingInput({
  label,
  required,
  disabled,
  error,
  value,
  onChange,
  ...rest
}: FloatingInputProps) {

  return (
    <div className="relative">
      <input {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className={`
            peer w-full pr-3 pt-5 pb-2 text-sm pl-4
            focus:outline-none focus:ring-0 
            ${error && "border-red-500 focus:ring-red-500"}
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
