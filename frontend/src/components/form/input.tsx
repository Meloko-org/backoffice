type InputProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
	disabled?: boolean;
	error?: string;
};

export function Input({
  label,
  value,
  onChange,
  required,
	disabled,
	error,
}: InputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`
						w-full rounded-md border border-gray-300
          px-3 py-2 text-sm
          focus:outline-none focus:ring-2 
          focus:border-indigo-500
					${error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-indigo-500"}
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
