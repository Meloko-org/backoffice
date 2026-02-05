export type FormField =
  | {
      name: string;
      label: string;
      type: "input";
      required?: boolean;
			disabled?: boolean;
    }
	| {
      name: string;
      label: string;
      type: "floating-input";
      required?: boolean;
			disabled?: boolean;
    }
  | {
      name: string;
      label: string;
      type: "select";
      options: { value: string; label: string }[];
      required?: boolean;
			disabled?: boolean;
    }
	| {
      name: string;
      label: string;
      type: "floating-select";
      options: { value: string; label: string }[];
      required?: boolean;
			disabled?: boolean;
    };
