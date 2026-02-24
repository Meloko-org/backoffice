import { useEffect, useRef, useState } from "react";
import type {
  FormSchema,
  FieldOption,
  FormFieldSchema,
} from "./types";
import type { ApiResponse, ApiSuccessResponse, ApiWarning } from "../../types/global.types";

type UseFormEngineProps<TValues> = {
  schema: FormSchema<TValues>;
  initialValues?: Partial<TValues>;
  mode?: "create" | "edit";
  onSubmit: (values: TValues) => Promise<ApiResponse<any>>;
  onSuccess?: (response: ApiSuccessResponse<TValues>) => void;
};

type FieldErrors<TValues> = Partial<Record<keyof TValues, string>>;


export function useFormEngine<TValues extends Record<string, any>>({
  schema,
  initialValues,
  mode = "create",
  onSubmit,
  onSuccess,
}: UseFormEngineProps<TValues>) {

  /* ---------------- STATE ---------------- */
  const [values, setValues] = useState<TValues>(() => {
    const defaults: any = {};

    schema.sections.forEach((section) => {
      Object.entries(section.fields).forEach(([key, field]) => {
        defaults[key] =
          initialValues?.[key as keyof TValues] ??
          field?.defaultValue ??
          "";
      });
    });

    return defaults;
  });

  const prevValuesRef = useRef(values);


  const [errors, setErrors] = useState<FieldErrors<TValues>>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof TValues, boolean>>
  >({});

  const [globalError, setGlobalError] = useState<string | null>(null);
  const [globalWarnings, setGlobalWarnings] = useState<ApiWarning[]>([]); 
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

    return field.condition({
      values,
      mode,
    });
  };


  const isFieldDisabled = (name: keyof TValues) => {
    const field = getFieldSchema(name);
    if (!field?.disabled) return false;

    if (typeof field.disabled === "boolean") return field.disabled;

    return field.disabled({
      values,
      mode,
    });
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


  /* ---------------- COMPUTED FIELDS ---------------- */
  useEffect(() => {
    schema.sections.forEach((section) => {
      Object.entries(section.fields).forEach(([key, field]) => {
        if (!field?.compute || !field.computeDeps) return;

        const name = key as keyof TValues;

        const newValue = field.compute({
          values,
          mode,
        });

        if (values[name] !== newValue) {
          setValues((prev) => ({
            ...prev,
            [name]: newValue,
          }));
        }
      });
    });
  }, [
    // 👇 dépendances dynamiques
    ...schema.sections.flatMap((section) =>
      Object.values(section.fields)
        .filter((field) => field?.computeDeps)
        .flatMap((field) => field?.computeDeps!)
    ).map((dep) => values[dep]),
    mode,
  ]);


  /* ---------------- RESET INVISIBLE FIELDS ---------------- */
  useEffect(() => {
    schema.sections.forEach((section) => {
      Object.entries(section.fields).forEach(([key, field]) => {
        const name = key as keyof TValues;

        const visible = field?.condition
          ? field.condition({ values, mode })
          : true;

        if (!visible && values[name] !== undefined && values[name] !== "") {
          setValues((prev) => ({
            ...prev,
            [name]: field?.defaultValue ?? "",
          }));

          setErrors((prev) => ({
            ...prev,
            [name]: undefined,
          }));

          setTouched((prev) => ({
            ...prev,
            [name]: false,
          }));
        }
      });
    });
  }, [values, mode, schema]);




  /* ---------------- ASYNC OPTIONS ---------------- */
  useEffect(() => {
    schema.sections.forEach((section) => {
      Object.entries(section.fields).forEach(([key, field]) => {
        if (!field || !("options" in field)) return;
        if (typeof field.options !== "function") return;

        const name = key as keyof TValues;

        const deps = field.optionsDeps;

        let shouldReload = false;

        if (!deps) {
          // Pas de deps → reload à chaque changement de values
          shouldReload = true;
        } else {
          // Reload uniquement si une dépendance a changé
          const depChanged = deps.some(
            (dep) =>
              prevValuesRef.current?.[dep] !== values[dep]
          );

          const firstLoad = !asyncOptions[name];

          shouldReload = depChanged || firstLoad;
        }

        if (!shouldReload) return;

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
      });
    });

  }, [values, schema]);



  /* ---------------- RESET ---------------- */
  useEffect(() => {
    const prevValues = prevValuesRef.current;

    schema.sections.forEach((section) => {
      Object.entries(section.fields).forEach(([key, field]) => {
        if (!field?.dependsOn) return;

        const name = key as keyof TValues;

        const shouldReset = field.dependsOn.some(
          (dep) => prevValues?.[dep] !== values[dep]
        );

        if (!shouldReset) return;

        setValues((prev) => ({
          ...prev,
          [name]: field.defaultValue ?? "",
        }));

        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));

        setTouched((prev) => ({
          ...prev,
          [name]: false,
        }));
      });
    });
  }, [values, schema]);




  /* ---------------- SUBMIT ---------------- */
  const submit = async () => {
    if (loading) return;

    setGlobalError(null);
    setGlobalWarnings([]);

    const isValid = validateForm();
    if (!isValid) return;

    try {
      setLoading(true);
      const response = await onSubmit(values);

      if (response.success) {
        if (response.warnings?.length) {
          setGlobalWarnings(response.warnings);
        }

        onSuccess?.(response);
      }
      

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


  useEffect(() => {
    prevValuesRef.current = values;
  }, [values]);



  return {
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
  };
}

