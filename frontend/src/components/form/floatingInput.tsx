type FloatingInputProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}

export default function FloatingInput({
  label,
  value,
  onChange,
  required,
  disabled,
  error,
}: FloatingInputProps) {

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        disabled={disabled}
        className={`
            peer w-full border rounded-md pr-3 pt-5 pb-2 text-sm pl-4
            focus:outline-none focus:ring-2 
            ${error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-indigo-500"}
            ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}
          `}
      />
      <label
        className="
          absolute left-3 top-1 text-gray-500 text-sm
          transition-all
          peer-placeholder-shown:top-3
          peer-placeholder-shown:text-base
          peer-focus:top-1
          peer-focus:text-sm
          peer-focus:text-indigo-600
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
