import FloatingInput from "../../../components/form/floatingInput";
import { FloatingSelect } from "../../../components/form/floatingSelect";
import FormSection from "../../../components/form/FormSection";
import { Input } from "../../../components/form/input";
import { Select } from "../../../components/form/select";
import type { FormField } from "../../../types/form/fieldConfig.type";
import type { ApiError } from "../../../types/global.types";


type CategoryFormProps<TValues> = {
  fields: FormField[];
  values: TValues;
  onChange: (name: keyof TValues, value: any) => void;
  onSubmit: (values: TValues) => void;
  submitLabel: string;
	errors?: Record<string, string>;
  globalError?: ApiError;
};


export function CategoryForm<TValues extends Record<string, any>>({
  fields,
  values,
  onChange,
  onSubmit,
  submitLabel,
	errors,
  globalError,
}: CategoryFormProps<TValues>) {

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
      className="space-y-6 max-w-2xl"
    >
      <FormSection title="Informations générales" globalError={globalError}>
        {fields.map((field) => {

					const error = errors && errors[field.name];

          if (field.type === "input") {
            return (
              <Input
                key={field.name}
                label={field.label}
                value={values[field.name] ?? ""}
                required={field.required}
								disabled={field.disabled}
                onChange={(v) => onChange(field.name as keyof TValues, v)}
								error={error}
              />
            );
          }

					if (field.type === "floating-input") {
            return (
              <FloatingInput
                key={field.name}
                label={field.label}
                value={values[field.name] ?? ""}
                required={field.required}
								disabled={field.disabled}
                onChange={(v) => onChange(field.name as keyof TValues, v)}
								error={error}
              />
            );
          }

          if (field.type === "select") {
            return (
              <Select
                key={field.name}
                label={field.label}
								disabled={field.disabled}
                required={field.required}
                value={values[field.name] ?? ""}
                options={field.options}
                onChange={(v) => onChange(field.name as keyof TValues, v)}
								error={error}
              />
            );
          }

					if (field.type === "floating-select") {
            return (
              <FloatingSelect
                key={field.name}
                label={field.label}
								disabled={field.disabled}
                required={field.required}
                value={values[field.name] ?? ""}
                options={field.options}
                onChange={(v) => onChange(field.name as keyof TValues, v)}
								error={error}
              />
            );
          }

          return null;
        })}
      </FormSection>

      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-primary"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
