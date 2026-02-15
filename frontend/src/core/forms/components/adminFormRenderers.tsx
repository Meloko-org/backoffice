import Input from "./input";
import FloatingInput from "./floatingInput";
import Textarea from "./textarea";
import FloatingTextarea from "./floatingTextarea";
import Select from "./select";
import FloatingSelect from "./floatingSelect";
import type { FieldRenderer } from "../FormRenderer";



export const adminFormRenderers = {
  input: ({
    field,
    name,
    value,
    error,
    disabled,
    setValue,
    setFieldTouched,
  }) =>
    field.floating ? (
      <FloatingInput
        key={String(name)}
        label={field.label}
        value={value}
        required={field.required}
        disabled={disabled}
        error={error}
        onChange={(v) => setValue(name, v)}
      />
    ) : (
      <Input
        key={String(name)}
        label={field.label}
        value={value}
        required={field.required}
        disabled={disabled}
        error={error}
        onChange={(v) => setValue(name, v)}
        onBlur={() => setFieldTouched(name)}
      />
    ),

  textarea: (context) => {    // utilisation du narrowing ici pour TS comprenne que field est bien un TextareaFieldSchema
    const { field, name, value, error, disabled, setValue, setFieldTouched } = context;

    if (field.type !== "textarea") return null;

    return field.floating ? (
      <FloatingTextarea
        key={String(name)}
        label={field.label}
        value={value}
        rows={field.rows}
        required={field.required}
        disabled={disabled}
        error={error}
        onChange={(v) => setValue(name, v)}
      />
    ) : (
      <Textarea
        key={String(name)}
        label={field.label}
        value={value}
        rows={field.rows}
        required={field.required}
        disabled={disabled}
        error={error}
        onChange={(v) => setValue(name, v)}
        onBlur={() => setFieldTouched(name)}
      />
    );
  },

  select: (context) => {

    const {field,
    name,
    value,
    error,
    disabled,
    asyncOptions,
    asyncLoading,
    setValue} = context;

    if (field.type !== "select") return null;

    const options =
      typeof field.options === "function"
        ? asyncOptions[name] || []
        : field.options || [];

    const isLoading = asyncLoading[name];

    return field.floating ? (
      <FloatingSelect
        key={String(name)}
        label={field.label}
        value={value}
        required={field.required}
        disabled={disabled || isLoading}
        options={options}
        error={error}
        onChange={(v) => setValue(name, v)}
      />
    ) : (
      <Select
        key={String(name)}
        label={field.label}
        value={value}
        required={field.required}
        disabled={disabled || isLoading}
        options={options}
        error={error}
        onChange={(v) => setValue(name, v)}
      />
    );
  },
} satisfies Record<string, FieldRenderer<any>>;
