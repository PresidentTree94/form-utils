// Describes how a single form field behaves and how its value is parsed.
export type FieldConfig<Value, Option = Value> = {
  label?: string;
  type?: string;
  required?: boolean;
  options?: Option[];
  multi?: boolean;
  defaultOption?: string;
  parse?: (raw: string | string[]) => Value | Value[]; // Custom parser override
};

// Maps each key of an object T to a FieldConfig describing that field.
export type Schema<T extends object> = {
  [K in keyof T]: FieldConfig<T[K], T[K] extends (infer U)[] ? U : T[K]>;
};

// A live form element: config + current value + setter.
export type FormElement<Value> = FieldConfig<Value, Value extends (infer Option)[] ? Option : Value> & {
  value: Value;
  setValue: (value: string | string[]) => void;
};