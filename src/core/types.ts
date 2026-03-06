export type FieldConfig<T, K extends keyof T> = {
  label: string;
  type?: string;
  options?: T[K][];
} & Record<string, any>;

export type Schema<T> = {
  [K in keyof T]: FieldConfig<T, K>;
};

export type BoundField<T, K extends keyof T> = FieldConfig<T, K> & {
  value: T[K];
  setValue: (value: T[K]) => void;
};