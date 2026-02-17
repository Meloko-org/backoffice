import Input from "./input";
import FloatingInput from "./floatingInput";
import Textarea from "./textarea";
import FloatingTextarea from "./floatingTextarea";
import Select from "./select";
import FloatingSelect from "./floatingSelect";
import type { FieldRenderer } from "../FormRenderer";
import Checkbox from "./checkbox";
import FileUpload from "./fileUpload";
import RadioGroup from "./radioGroup";
import CheckboxGroup from "./checkboxGroup";



export const adminFormRenderers = {
  input: (context) => {
    const {
      field,
      name,
      value,
      error,
      disabled,
      setValue,
      setFieldTouched,
    } = context;

    if (field.type !== "input") return;

    return field.floating ? (
      <FloatingInput
        key={String(name)}
        label={field.label}
        value={value}
        type={field.inputType ?? "text"}
        min={field.min}
        max={field.max}
        step={field.step}
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
        type={field.inputType ?? "text"}
        min={field.min}
        max={field.max}
        step={field.step}
        required={field.required}
        disabled={disabled}
        error={error}
        onChange={(v) => setValue(name, v)}
        onBlur={() => setFieldTouched(name)}
      />
    )
  },
    

  textarea: (context) => {    // utilisation du narrowing ici pour que TS comprenne que field est bien un TextareaFieldSchema
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

  checkbox: (context) => {

    const {
      field,
      name,
      value,
      error,
      disabled,
      setValue,
    } = context;

    if (field.type !== "checkbox") return null;

    return (
      <Checkbox
        key={String(name)}
        label={field.label}
        value={value}
        checked={Boolean(value)}
        disabled={disabled}
        error={error}
        onChange={(v) => setValue(name, v)}
      />
    );
  },

  file: (context) => {
    const { field, name, value, error, disabled, setValue } = context;

    if (field.type !== "file") return;

    return (
      <FileUpload
        key={String(name)}
        label={field.label}
        value={value}
        accept={field.accept}
        disabled={disabled}
        error={error}
        onChange={(url) => setValue(name, url)}
      />
    );
  },


  date: (context) => {
    const {
      field,
      name,
      value,
      error,
      disabled,
      setValue,
      setFieldTouched,
    } = context;

    if (field.type !== "date") return;

    return (
      <Input
        key={String(name)}
        label={field.label}
        type="date"
        value={value ?? ""}
        min={field.min}
        max={field.max}
        required={field.required}
        disabled={disabled}
        error={error}
        onChange={(v) => setValue(name, v)}
        onBlur={() => setFieldTouched(name)}
      />
    );
  },

  "radio-group": (context) => {
    const { 
      field, 
      name, 
      value, 
      error, 
      disabled,
      asyncOptions,
      asyncLoading, 
      setValue 
    } = context;

    if (field.type !== "radio-group") return null;

    const options =
      typeof field.options === "function"
        ? asyncOptions[name] || []
        : field.options || [];

    const isLoading = asyncLoading[name];

    return (
      <RadioGroup
        key={String(name)}
        label={field.label}
        value={value ?? ""}
        required={field.required}
        disabled={disabled || isLoading}
        error={error}
        options={options}
        name={String(name)}
        onChange={(v) => setValue(name, v)}
      />
    );
  },

  "checkbox-group": (context) => {
    const { 
      field, 
      name, 
      value, 
      error, 
      disabled,
      asyncOptions,
      asyncLoading, 
      setValue 
    } = context;

    if (field.type !== "checkbox-group") return null;

    console.log("checkbox-group renderer", name, field.options);

    const options =
      typeof field.options === "function"
        ? asyncOptions[name] || []
        : field.options || [];

    
    console.log("asyncOptions for", name, asyncOptions[name]);

    const isLoading = asyncLoading[name];

    return (
      <CheckboxGroup
        key={String(name)}
        label={field.label}
        value={value ?? []}
        required={field.required}
        disabled={disabled || isLoading}
        error={error}
        options={options}
        onChange={(v) => setValue(name, v)}
      />
    );
  },



} satisfies Record<string, FieldRenderer<any>>;
