import type {
  CheckboxFieldSchema,
  FileFieldSchema,
  FormSchema,
  InputFieldSchema,
  SelectFieldSchema,
  TextareaFieldSchema,
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
  })



};



export function defineFormSchema<TValues>(
  schema: FormSchema<TValues>
): FormSchema<TValues> {
  return schema;
}
