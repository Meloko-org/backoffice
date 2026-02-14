import { useEffect, useMemo, useState } from "react";
import type {
  FormSchema,
  FieldOption,
  FormFieldSchema,
} from "./types";

type UseFormEngineProps<TValues> = {
  schema: FormSchema<TValues>;
  initialValues?: Partial<TValues>;
  mode?: "create" | "edit";

  onSubmit: (values: TValues) => Promise<void>;
};

type FieldErrors<TValues> = Partial<Record<keyof TValues, string>>;


/* type guard: confirme qu'on est bien sur un field de type select ou floatingSelect */ 
function isSelectField<TValues>(
  field: FormFieldSchema<TValues>
): field is Extract<FormFieldSchema<TValues>, { type: "select" | "floating-select" }> {
  return field.type === "select" || field.type === "floating-select";
}


export function useFormEngine<TValues extends Record<string, any>>({
  schema,
  initialValues,
  mode = "create",
  onSubmit,
}: UseFormEngineProps<TValues>) {
  /* ---------------- STATE ---------------- */

  const [values, setValues] = useState<TValues>(() => {
    const defaults: any = {};

    schema.sections.forEach((section) => {
      Object.entries(section.fields).forEach(([key, field]) => {
        defaults[key] =
          initialValues?.[key as keyof TValues] ??
          field.defaultValue ??
          "";
      });
    });

    return defaults;
  });

  const [errors, setErrors] = useState<FieldErrors<TValues>>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof TValues, boolean>>
  >({});

  const [globalError, setGlobalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [asyncOptions, setAsyncOptions] = useState<
    Partial<Record<keyof TValues, FieldOption[]>>
  >({});

  const [asyncLoading, setAsyncLoading] = useState<
    Partial<Record<keyof TValues, boolean>>
  >({});

  /* ---------------- HELPERS ---------------- */

  const getFieldSchema = (
    name: keyof TValues
  ): FormFieldSchema<TValues> | undefined => {
    for (const section of schema.sections) {
      if (section.fields[name]) {
        return section.fields[name];
      }
    }
    return undefined;
  };

  /* ---------------- CONDITION ---------------- */

  const isFieldVisible = (name: keyof TValues) => {
    const field = getFieldSchema(name);
    if (!field?.condition) return true;
    return field.condition(values);
  };

  const isFieldDisabled = (name: keyof TValues) => {
    const field = getFieldSchema(name);
    if (!field?.disabled) return false;

    if (typeof field.disabled === "boolean") return field.disabled;
    return field.disabled(values);
  };

    /* ---------------- VALIDATION ---------------- */

  const validateField = (
    name: keyof TValues,
    value: any
  ): string | null => {
    const field = getFieldSchema(name);
    if (!field) return null;

    if (!isFieldVisible(name)) return null;

    if (field.required && (!value || value === "")) {
      return "Ce champ est requis.";
    }

    if (field.validate) {
      return field.validate(value, values);
    }

    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: FieldErrors<TValues> = {};

    Object.keys(values).forEach((key) => {
      const name = key as keyof TValues;
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    /* ---------------- CHANGE ---------------- */

  const setValue = (name: keyof TValues, value: any) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error || undefined,
      }));
    }
  };

  const setFieldTouched = (name: keyof TValues) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validateField(name, values[name]);
    setErrors((prev) => ({
      ...prev,
      [name]: error || undefined,
    }));
  };

    /* ---------------- ASYNC OPTIONS ---------------- */

  useEffect(() => {
    schema.sections.forEach((section) => {
      Object.entries(section.fields).forEach(([key, field]) => {
        
        if (isSelectField(field) && typeof field.options === "function") {
          const name = key as keyof TValues;

          setAsyncLoading((prev) => ({
            ...prev,
            [name]: true,
          }));

          field
            .options(values)
            .then((opts) => {
              setAsyncOptions((prev) => ({
                ...prev,
                [name]: opts,
              }));
            })
            .finally(() => {
              setAsyncLoading((prev) => ({
                ...prev,
                [name]: false,
              }));
            });
        }
      });
    });
  }, [schema, values]);

    /* ---------------- SUBMIT ---------------- */

  const submit = async () => {
    setGlobalError(null);

    const isValid = validateForm();
    if (!isValid) return;

    try {
      setLoading(true);
      await onSubmit(values);
    } catch (error: any) {
      if (error?.fieldErrors) {
        setErrors(error.fieldErrors);
      }

      if (error?.message) {
        setGlobalError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

    return {
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
  };
}

