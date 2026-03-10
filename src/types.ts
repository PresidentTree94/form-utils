export type FieldConfig<Value, Option = Value> = {
  label?: string;
  type?: string;
  required?: boolean;
  options?: Option[];
  multi?: boolean;
  parse?: (raw: string | string[]) => Value | Value[];
};

export type Schema<T extends object> = {
  [K in keyof T]: FieldConfig<T[K], T[K] extends (infer U)[] ? U : T[K]>;
};

/*
export type Schema<T extends object> = {
  [K in keyof T]: T[K] extends (infer U)[]
    ? FieldConfig<T[K], U>
    : FieldConfig<T[K]>;
};
*/

export type FormElement<Value> = FieldConfig<Value, Value extends (infer Option)[] ? Option : Value> & {
    value: Value;
    setValue: (value: string | string[]) => void;
};

/*
export type FormElement<Value, Option = Value> = FieldConfig<Value, Option> & {
  value: Value;
  setValue: (value: string | string[]) => void;
};
*/