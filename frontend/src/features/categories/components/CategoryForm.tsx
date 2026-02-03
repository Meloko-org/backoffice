import { useEffect, useState } from "react";
import { getTypeNames } from "../../types/api/types.api";
import type { Type } from "../../types/types/type";
import type { CategoryPayload, ProductCategory } from "../types/category";


interface Props {
  initialValues?: ProductCategory;
  submitLabel: string;
  onSubmit: (payload: CategoryPayload) => void;
}

export function CategoryForm({
  initialValues,
  onSubmit,
  submitLabel,
}: Props) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [typeId, setTypeId] = useState(
    typeof initialValues?.type === "string"
      ? initialValues?.type
      : initialValues?.type?._id ?? ""
  );
  const [types, setTypes] = useState<Type[]>([]);

  useEffect(() => {
    getTypeNames().then((res) => {
      setTypes(res.data.name);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      type: typeId,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nom</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <label>Type</label>
        <select value={typeId} onChange={(e) => setTypeId(e.target.value)}>
          <option value="">-- Sélectionner un type --</option>
          {types.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">{submitLabel}</button>
    </form>
  );
}
