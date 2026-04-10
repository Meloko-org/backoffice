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
  style: "list" | "flat";
};

export default function CheckboxGroup({
  label,
  options,
  value,
  onChange,
  error,
  required,
  disabled,
  style,
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
        {required && <span className="text-danger ml-1">*</span>}
      </div>

      <div className={
        style === "flat" 
          ? "flex flex-wrap gap-4 justify-center" 
          : "flex flex-col gap-y-2"
        }
      >
        {options.map((option) => (
          <label 
            key={option.value} 
            style={{ display: "flex", gap: 8 }} 
            className="flex items-center gap-2 text-(--first-text) font-medium"
          >
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
        <p className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
