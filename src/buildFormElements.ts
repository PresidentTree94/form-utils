import { Schema, BoundField } from "./types";

export function buildFormElements<T extends object>(
  form: T,
  update: <K extends keyof T>(key: K, value: T[K]) => void,
  schema: Schema<T>
): {
  [K in keyof T]: BoundField<T, K>;
} {

  const fields = {} as { [K in keyof T]: BoundField<T, K> };

  for (const key in schema) {
    fields[key] = {
      ...schema[key],
      value: form[key],
      setValue: (value) => update(key, value)
    };
  }

  return fields;
}