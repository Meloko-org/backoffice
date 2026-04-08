/**
 * Ici on définit clairement label, error, required et disabled car on en a besoin dans le return.
 * Pour toutes les autres props possibles d'un HTMLInputElement, on fait hériter le composant Input
 * des attributs classiques d'un HTMLInputElement, sauf value et onChange, pour pouvoir les
 * customizer comme on veut. 
 */
type InputProps = {
  label: string;
	error?: string;
  required?: boolean;
  disabled?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  value: string;
  onChange: (value: string) => void;
};  

export default function Input({
  label,
	error,
  required,
  disabled,
  value, 
  onChange,
  ...rest
}: InputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-neutral-500">
        {label}
        {required && <span className="text-danger ml-1">*</span>}
      </label>

      <input {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
					w-full px-3 py-2 text-sm
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
