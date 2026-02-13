import { useEffect, useState } from "react";

type UseCrudFormOptions<TFormValues, TPayload> = {
  mode: "create" | "edit";
  id?: string;

  defaultValues: TFormValues;

  fetchById?: (id: string) => Promise<any>;
  mapToFormValues?: (data: any) => TFormValues;

  mapToPayload: (values: TFormValues) => TPayload;

  createAction: (payload: TPayload) => Promise<unknown>;
  updateAction?: (id: string, payload: TPayload) => Promise<unknown>;

	validate?: (values: TFormValues) => Record<string, string>;

  onSuccess?: () => void;

	resetOnSuccess?: boolean;
};


export function useCrudForm<TFormValues, TPayload>({
  mode,
  id,
  defaultValues,
  fetchById,
  mapToFormValues,
  mapToPayload,
  createAction,
  updateAction,
	validate,
  onSuccess,
	resetOnSuccess,
}: UseCrudFormOptions<TFormValues, TPayload>) {
  const isEdit = mode === "edit";

  const [values, setValues] = useState<TFormValues>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<any>();
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit || !id || !fetchById || !mapToFormValues) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const data = await fetchById(id);
        const formValues = mapToFormValues(data);
        setValues(formValues);
      } catch (err) {
        setGlobalError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [isEdit, id]);

  const handleSubmit = async () => {
  // 🔹 validation si fournie
  if (validate) {
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }
  }

  try {
    const payload = mapToPayload(values);

    if (isEdit && id && updateAction) {
      await updateAction(id, payload);
    } else {
      await createAction(payload);

			// ✅ reset auto seulement en create
      if (!isEdit && resetOnSuccess) {
        setValues(defaultValues);
        setErrors({});
      }
    }

    onSuccess?.();
  } catch (err) {
    setGlobalError(err);
  }
};


  return {
    values,
    setValues,
    errors,
    setErrors,
    globalError,
    loading,
    handleSubmit,
    isEdit,
  };
}
