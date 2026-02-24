import type { FieldOption, FormFieldSchema, FormSchema } from "./types";
import { useFormEngine } from "./useFormEngine";

import FormSection from "./layout/FormSection";
import { AnimatedButton } from "../../components/global/buttons/AnimatedButton";
import type { ApiResponse, ApiSuccessResponse } from "../../types/global.types";


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
  onSubmit: (values: TValues) => Promise<ApiResponse<any>>;
  onSuccess?: (response: ApiSuccessResponse<any>) => void;
  renderers: Record<string, FieldRenderer<TValues>>;
};

export function AdminForm<TValues extends Record<string, any>>({
  schema,
  initialValues,
  mode = "create",
  submitLabel = "Enregistrer",
  onSubmit,
  onSuccess,
  renderers,
}: AdminFormProps<TValues>) {

  const {
    values,
    errors,
    globalError,
    globalWarnings,
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
    onSuccess,
  });

  // vérifie s'il y a bien une section définie comme AlertContainer
  const hasAlertSection = schema.sections.some(s => s.isAlertContainer);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="space-y-6 max-w-2xl"
    >

      {schema.sections.map((section, sectionIndex) => {

        const sectionVisible = section.isVisible?.({ values, mode }) ?? true;
        if (!sectionVisible) return null;

        const sectionEnabled = section.isEnabled?.({ values, mode }) ?? true;

        return (
          <FormSection
            key={sectionIndex}
            title={section.title}
            globalError={
              globalError
                ? { message: globalError }
                : undefined
            }
            globalWarnings={globalWarnings}
            isAlertContainer={hasAlertSection ? section.isAlertContainer : sectionIndex === 0}
          >
            <div 
              className={`
                  space-y-4
                  transition-all duration-300 
                  ${!sectionEnabled
                    ? "opacity-40 pointer-events-none blur-[1px] scale-[0.99]"
                    : "opacity-100 scale-100"
                  }
                `}
            >
              {Object.entries(section.fields).map(([key, field]) => {
                const name = key as keyof TValues;

                if (!isFieldVisible(name)) return null;
                if (!field) return null;

                const renderer = renderers[field.type];

                if (!renderer) return null;

                return renderer({
                  field,
                  name,
                  value: values[name] ?? "",
                  error: errors[name],
                  disabled: loading || !sectionEnabled || isFieldDisabled(name),
                  loading,
                  asyncOptions,
                  asyncLoading,
                  setValue,
                  setFieldTouched,
                });

              })}
            </div>

          </FormSection>
        )  
      })} 

      <div className="flex justify-end pr-3">
        <AnimatedButton
          type="submit"
          loading={loading}
        >
          {submitLabel}
        </AnimatedButton>
      </div>

    </form>
  );
}
