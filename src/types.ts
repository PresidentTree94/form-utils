export type FieldConfig<Value> = {
  label?: string;
  type?: string;
  required?: boolean;
  options?: Value[];
  multi?: boolean;
  parse?: (raw: string | string[]) => Value | Value[];
};

export type Schema<T extends object> = {
  [K in keyof T]: FieldConfig<T[K]>;
};

export type FormElement<Value> = FieldConfig<Value> & {
  value: Value;
  setValue: (value: string | string[]) => void;
};