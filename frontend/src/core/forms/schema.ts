import type {
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
};

export function defineFormSchema<TValues>(
  schema: FormSchema<TValues>
): FormSchema<TValues> {
  return schema;
}
