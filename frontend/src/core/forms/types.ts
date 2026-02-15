export type FieldOption = {
  value: string;
  label: string;
};

export type FormContext<TValues> = {
  values: TValues;
  mode: "create" | "edit";
};


export type FieldCondition<TValues> = (
  context: FormContext<TValues>
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

  /**
   * Valeur calculée automatiquement
   */
  compute?: (context: FormContext<TValues>) => any;

  /**
   * Dépendances déclenchant le recalcul
   */
  computeDeps?: (keyof TValues)[];

};

export type InputFieldSchema<TValues> =  BaseFieldSchema<TValues> & {
  type: "input";
  floating?: boolean;
};

export type TextareaFieldSchema<TValues> = BaseFieldSchema<TValues> & {
  type: "textarea";
  floating?: boolean;
  rows?: number;
};

export type SelectFieldSchema<TValues> = BaseFieldSchema<TValues> & {
  type: "select";
  floating?: boolean;

  options?:
    | FieldOption[]
    | AsyncOptionsLoader<TValues>;
  
  /**
   * Dépendances déclenchant le reload des options async
   */
  optionsDeps?: (keyof TValues)[];
};

export type FormFieldSchema<TValues> =
  | InputFieldSchema<TValues>
  | SelectFieldSchema<TValues>
  | TextareaFieldSchema<TValues>;


export type FormSectionSchema<TValues> = {
  title: string;
  fields: Record<keyof TValues, FormFieldSchema<TValues>>;
};

export type FormSchema<TValues> = {
  sections: FormSectionSchema<TValues>[];
};
