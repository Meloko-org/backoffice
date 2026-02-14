import React from "react";
import type { FormSchema } from "./types";
import { useFormEngine } from "./useFormEngine";

import Input from "./components/input";
import { Select } from "./components/select";
import FloatingInput from "./components/floatingInput";
import { FloatingSelect } from "./components/floatingSelect";
import FormSection from "./layout/FormSection";

type AdminFormProps<TValues extends Record<string, any>> = {
  schema: FormSchema<TValues>;
  initialValues?: Partial<TValues>;
  mode?: "create" | "edit";
  submitLabel?: string;

  onSubmit: (values: TValues) => Promise<void>;
};

export function AdminForm<TValues extends Record<string, any>>({
  schema,
  initialValues,
  mode = "create",
  submitLabel = "Enregistrer",
  onSubmit,
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
          {Object.entries(section.fields).map(
            ([key, field]) => {
              const name = key as keyof TValues;

              if (!isFieldVisible(name)) return null;

              const value = values[name] ?? "";
              const error = errors[name];
              const disabled =
                loading || isFieldDisabled(name);

              /* -------- INPUT -------- */

              if (field.type === "input") {
                return (
                  <Input
                    key={key}
                    label={field.label}
                    value={value}
                    required={field.required}
                    disabled={disabled}
                    error={error}
                    onChange={(v) => setValue(name, v)}
                    onBlur={() =>
                      setFieldTouched(name)
                    }
                  />
                );
              }

              if (field.type === "floating-input") {
                return (
                  <FloatingInput
                    key={key}
                    label={field.label}
                    value={value}
                    required={field.required}
                    disabled={disabled}
                    error={error}
                    onChange={(v) => setValue(name, v)}
                  />
                );
              }

              /* -------- SELECT -------- */

              if (
                field.type === "select" ||
                field.type === "floating-select"
              ) {
                const options =
                  typeof field.options === "function"
                    ? asyncOptions[name] || []
                    : field.options || [];

                const isLoading =
                  asyncLoading[name];

                if (field.type === "select") {
                  return (
                    <Select
                      key={key}
                      label={field.label}
                      value={value}
                      required={field.required}
                      disabled={
                        disabled || isLoading
                      }
                      options={options}
                      error={error}
                      onChange={(v) =>
                        setValue(name, v)
                      }
                    />
                  );
                }

                return (
                  <FloatingSelect
                    key={key}
                    label={field.label}
                    value={value}
                    required={field.required}
                    disabled={
                      disabled || isLoading
                    }
                    options={options}
                    error={error}
                    onChange={(v) =>
                      setValue(name, v)
                    }
                  />
                );
              }

              return null;
            }
          )}
        </FormSection>
      ))}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
        >
          {loading ? "Enregistrement..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
