export type FieldConfig<T> = {
  label: string;
  type?: string;
  required?: boolean;
  options?: (T extends (infer U)[] ? U : T)[];
  [key: string]: unknown;
};

export type Schema<T> = {
  [K in keyof T]: FieldConfig<T[K]>;
};

export type BoundField<T, K extends keyof T> = FieldConfig<T[K]> & {
  value: T[K];
  setValue: (value: T[K]) => void;
  setOptions: (options: FieldConfig<T[K]>["options"]) => void;
};