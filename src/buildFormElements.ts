import { FieldConfig, Schema, BoundField } from "./types";

export function buildFormElements<T extends object>(
  form: T,
  update: <K extends keyof T>(key: K, value: T[K]) => void,
  schema: Schema<T>
): {
  [K in keyof T]: BoundField<T, K>;
} {
  const entries = Object.entries(schema) as [keyof T, FieldConfig<T, keyof T>][];
  return Object.fromEntries(
    entries.map(([key, config]) => [
      key,
      {
        ...config,
        value: form[key],
        setValue: (value: T[typeof key]) => update(key, value)
      }
    ])
  ) as any;
}