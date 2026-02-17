import type { FieldOption, FormFieldSchema, FormSchema } from "./types";
import { useFormEngine } from "./useFormEngine";

import FormSection from "./layout/FormSection";


export type FieldRendererContext<TValues> = {
  field: FormFieldSchema<TValues>;
  name: keyof TValues;
  value: any;
  error?: string;
  disabled: boolean;
  loading: boolean;
  asyncOptions: Partial<Record<keyof TValues, FieldOption[]>>;
  asyncLoading: Partial<Record<keyof TValues, boolean>>;
  setValue: (name: keyof TValues, value: any) => void;
  setFieldTouched: (name: keyof TValues) => void;
};

export type FieldRenderer<TValues> = (
  context: FieldRendererContext<TValues>
) => React.ReactNode;


type AdminFormProps<TValues extends Record<string, any>> = {
  schema: FormSchema<TValues>;
  initialValues?: Partial<TValues>;
  mode?: "create" | "edit";
  submitLabel?: string;
  onSubmit: (values: TValues) => Promise<void>;
  renderers: Record<string, FieldRenderer<TValues>>;
};

export function AdminForm<TValues extends Record<string, any>>({
  schema,
  initialValues,
  mode = "create",
  submitLabel = "Enregistrer",
  onSubmit,
  renderers,
}: AdminFormProps<TValues>) {

  const {
    values,
    errors,
    globalError,
    loading,
    asyncOptions,
    asyncLoading,
    setValue,
    setFieldTouched,
    isFieldVisible,
    isFieldDisabled,
    submit,
  } = useFormEngine<TValues>({
    schema,
    initialValues,
    mode,
    onSubmit,
  });

  console.log("RENDERER :", values)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="space-y-6 max-w-2xl"
    >
      {schema.sections.map((section, sectionIndex) => (

        <FormSection
          key={sectionIndex}
          title={section.title}
          globalError={
            globalError
              ? { message: globalError }
              : undefined
          }
        >
          {Object.entries(section.fields).map(([key, field]) => {
            const name = key as keyof TValues;

            console.log("Checking async fields...");

            if (!isFieldVisible(name)) return null;

            const renderer = renderers[field.type];

            if (!renderer) return null;

            return renderer({
              field,
              name,
              value: values[name] ?? "",
              error: errors[name],
              disabled: loading || isFieldDisabled(name),
              loading,
              asyncOptions,
              asyncLoading,
              setValue,
              setFieldTouched,
            });

          })}
        </FormSection>
      ))}

      <div className="flex justify-end pr-3">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
        >
          {loading ? "Envoi..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
