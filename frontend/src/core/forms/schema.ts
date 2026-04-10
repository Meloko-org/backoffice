import type {
  FormSchema,
  InputFieldSchema,
  TextareaFieldSchema,
  SelectFieldSchema,
  CheckboxFieldSchema,
  FileFieldSchema,
  RadioGroupFieldSchema,
  CheckboxGroupFieldSchema,
  DateFieldSchema,
} from "./types";

export const field = {
  input: <TValues>(
    config: Omit<InputFieldSchema<TValues>, "type">
  ): InputFieldSchema<TValues> => ({
    ...config,
    type: "input",
  }),

  textarea: <TValues>(
    config: Omit<TextareaFieldSchema<TValues>, "type">
  ): TextareaFieldSchema<TValues> => ({
    ...config,
    type: "textarea",
  }),

  select: <TValues>(
    config: Omit<SelectFieldSchema<TValues>, "type">
  ): SelectFieldSchema<TValues> => ({
    ...config,
    type: "select",
  }),

  checkbox: <TValues>(
    config: Omit<CheckboxFieldSchema<TValues>, "type">
  ): CheckboxFieldSchema<TValues> => ({
    ...config,
    type: "checkbox",
  }),

  file: <TValues>(
    config: Omit<FileFieldSchema<TValues>, "type">
  ): FileFieldSchema<TValues> => ({
    ...config,
    type: "file"
  }),

  date: <TValues>(
    config: Omit<DateFieldSchema<TValues>, "type">
  ): DateFieldSchema<TValues> => ({
    ...config,
    type: "date"
  }),

  radioGroup: <TValues>(
    config: Omit<RadioGroupFieldSchema<TValues>, "type">
  ): RadioGroupFieldSchema<TValues> => ({
    ...config,
    type: "radio-group",
  }),

  checkboxGroup: <TValues>(
    config: Omit<CheckboxGroupFieldSchema<TValues>, "type">
  ): CheckboxGroupFieldSchema<TValues> => ({
    ...config,
    type: "checkbox-group",
  }),

};



export function defineFormSchema<TValues>(
  schema: FormSchema<TValues>
): FormSchema<TValues> {
  return schema;
}
