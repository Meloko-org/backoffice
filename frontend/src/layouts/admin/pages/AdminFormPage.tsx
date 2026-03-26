import { useEffect, useState } from "react";
import type { AdminModels } from "../registries/admin/adminModels";
import { adminRegistry } from "../registries/admin/adminRegistry";
import Loader from "../../../components/admin/Loader";
import { AdminForm } from "../../../core/forms/FormRenderer";
import { adminFormRenderers } from "../../../core/forms/components/adminFormRenderers";
import { hasForm } from "../../../guards/AdminFormGuard";



type Props<K extends keyof AdminModels> = {
  model: K;
  mode: "create" | "edit";
  id?: string;
};

export default function AdminFormPage<K extends keyof AdminModels>({
  model,
  mode,
  id,
}: Props<K>) {
  const admin = adminRegistry.get(model);

  if (!hasForm(admin)) {
    throw new Error(`No form defined for model "${String(model)}"`);
  }


  /* ========================= */
  /* LOADERS                   */
  /* ========================= */

  const [dynamicData, setDynamicData] = useState<Record<string, any>>({});

  useEffect(() => {
    const loaders = admin.form?.loaders;
    if (!loaders) return;

    const load = async () => {
      const entries = await Promise.all(
        Object.entries(loaders).map(async ([key, fn]) => {
          const data = await fn();
          return [key, data];
        })
      );

      setDynamicData(Object.fromEntries(entries));
    };

    load();
  }, [admin.form]);


  const {
    schema,
    defaultValues,
    getOne,
    create,
    update,
    onSuccess,
    useContext,
  } = admin.form;


  const baseCtx = useContext?.() ?? {};
  const ctx = {
    ...baseCtx,
    ...dynamicData,
  }


  /* ========================= */
  /* DATA (EDIT MODE)          */
  /* ========================= */

  const [initialValues, setInitialValues] = useState<any>(defaultValues);
  const [loading, setLoading] = useState(mode === "edit");

  useEffect(() => {
    if (mode === "edit" && id && getOne) {
      setLoading(true);

      getOne(id)
        .then((data) => {
          setInitialValues(data);
        })
        .finally(() => setLoading(false));
    }
  }, [mode, id, getOne]);




  if (loading) return <Loader />;



  /* ========================= */
  /* SUBMIT */
  /* ========================= */

  const handleSubmit = async (values: any) => {
    if (mode === "create") {
      if (!create) throw new Error("No create function defined");
      return create(values);
    }

    if (!update || !id) {
      throw new Error("No update function defined");
    }

    return update(id, values);
  };


  /* ========================= */
  /* UI */
  /* ========================= */

  return (
    <div className="p-8">
      <div className="mx-auto max-w-3xl">
        <AdminForm<any, any>
          schema={schema}
          ctx={ctx}
          initialValues={initialValues}
          mode={mode}
          onSubmit={handleSubmit}
          onSuccess={onSuccess}
          renderers={adminFormRenderers}
        />
      </div>
    </div>
  );
}