export type FieldConfig<Value> = {
  label?: string;
  type?: string;
  required?: boolean;
  options?: Value[];
  parse?: (raw: string) => Value;
};

export type Schema<T extends object> = {
  [K in keyof T]: FieldConfig<T[K]>;
};

export type FormElement<Value> = FieldConfig<Value> & {
  value: Value;
  setValue: (value: string) => void;
};