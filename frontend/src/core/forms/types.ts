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


/* Props de base pour tout élément de formulaire */
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

/* Props des input */
export type InputFieldSchema<TValues> =  BaseFieldSchema<TValues> & {
  type: "input";
  floating?: boolean;
  inputType?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  min?: number;
  max?: number;
  step?: number;
};

/* Props des textarea */
export type TextareaFieldSchema<TValues> = BaseFieldSchema<TValues> & {
  type: "textarea";
  floating?: boolean;
  rows?: number;
};

/* Props des select */
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

/* Props des checkbox */
export type CheckboxFieldSchema<TValues> =
  BaseFieldSchema<TValues> & {
    type: "checkbox";
  };


/* Props des File Upload */
export type FileFieldSchema<TValues> =
  BaseFieldSchema<TValues> & {
    type: "file";
    accept?: string;
  };

/* Props des Date */
export type DateFieldSchema<TValues> =
  BaseFieldSchema<TValues> & {
    type: "date";
    min?: string;
    max?: string;
  };





export type FormFieldSchema<TValues> =
  | InputFieldSchema<TValues>
  | SelectFieldSchema<TValues>
  | TextareaFieldSchema<TValues>
  | CheckboxFieldSchema<TValues>
  | FileFieldSchema<TValues>
  | DateFieldSchema<TValues>;




export type FormSectionSchema<TValues> = {
  title: string;
  fields: Record<keyof TValues, FormFieldSchema<TValues>>;
};

export type FormSchema<TValues> = {
  sections: FormSectionSchema<TValues>[];
};
