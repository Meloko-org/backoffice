import { TagCategoryBadge } from "../../../features/tagCategories/components/TagCategoryBadge";
import type { FieldOption } from "../types";

type CheckboxOption = {
  label: string;
  value: string;
};

type CheckboxGroupProps = {
  label: string;
  options: FieldOption[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
};

export default function CheckboxGroup({
  label,
  options,
  value,
  onChange,
  error,
  required,
  disabled,
}: CheckboxGroupProps) {

  const handleToggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-neutral-500">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {options.map((option) => (
          <label key={option.value} style={{ display: "flex", gap: 8 }} className="flex items-center gap-2 text-black font-medium">
            <input
              type="checkbox"
              checked={value.includes(option.value)}
              onChange={() => handleToggle(option.value)}
            />

            {option.color || option.description ? (
              <TagCategoryBadge
                label={option.label}
                color={option.color}
                description={option.description}
              />
            ) : (
              option.label
            )}
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
