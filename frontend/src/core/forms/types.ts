export type FieldOption = {
  value: string;
  label: string;
};

export type FieldCondition<TValues> = (
  values: TValues
) => boolean;

export type FieldValidator<TValues> = (
  value: any,
  values: TValues
) => string | null;

export type AsyncOptionsLoader<TValues> = (
  values: TValues
) => Promise<FieldOption[]>;

export type BaseFieldSchema<TValues> = {
  label: string;

  required?: boolean;

  defaultValue?: any;

  /**
   * Champ visible uniquement si condition = true
   */
  condition?: FieldCondition<TValues>;

  /**
   * Permet de désactiver dynamiquement un champ
   */
  disabled?: boolean | FieldCondition<TValues>;

  /**
   * Validation custom
   */
  validate?: FieldValidator<TValues>;
};

export type InputFieldSchema<TValues> = BaseFieldSchema<TValues> & {
  type: "input" | "floating-input";
};

export type SelectFieldSchema<TValues> = BaseFieldSchema<TValues> & {
  type: "select" | "floating-select";

  options?:
    | FieldOption[]
    | AsyncOptionsLoader<TValues>;
};

export type FormFieldSchema<TValues> =
  | InputFieldSchema<TValues>
  | SelectFieldSchema<TValues>;

export type FormSectionSchema<TValues> = {
  title: string;
  fields: Record<keyof TValues, FormFieldSchema<TValues>>;
};

export type FormSchema<TValues> = {
  sections: FormSectionSchema<TValues>[];
};
