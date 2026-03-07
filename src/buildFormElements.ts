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
    const typedKey = key as keyof T;
    fields[typedKey] = {
      ...schema[typedKey],
      value: form[typedKey],
      setValue: (value: any) => update(typedKey, value)
    };
  }

  return fields;
}