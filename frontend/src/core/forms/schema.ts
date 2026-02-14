import type {
  FormSchema,
  InputFieldSchema,
  SelectFieldSchema,
} from "./types";

export const field = {
  input: <TValues>(
    config: Omit<InputFieldSchema<TValues>, "type">
  ): InputFieldSchema<TValues> => ({
    ...config,
    type: "input",
  }),

  floatingInput: <TValues>(
    config: Omit<InputFieldSchema<TValues>, "type">
  ): InputFieldSchema<TValues> => ({
    ...config,
    type: "floating-input",
  }),

  select: <TValues>(
    config: Omit<SelectFieldSchema<TValues>, "type">
  ): SelectFieldSchema<TValues> => ({
    ...config,
    type: "select",
  }),

  floatingSelect: <TValues>(
    config: Omit<SelectFieldSchema<TValues>, "type">
  ): SelectFieldSchema<TValues> => ({
    ...config,
    type: "floating-select",
  }),
};

export function defineFormSchema<TValues>(
  schema: FormSchema<TValues>
): FormSchema<TValues> {
  return schema;
}
