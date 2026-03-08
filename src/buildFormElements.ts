import { Schema, FormElement } from "./types";

export function buildFormElements<T extends object>(
  form: T,
  update: <K extends keyof T>(key: K, value: T[K]) => void,
  schema: Schema<T>
): { [K in keyof T]: FormElement<T[K]> } {
  const result = {} as { [K in keyof T]: FormElement<T[K]> };

  for (const key in schema) {
    const config = schema[key];
    result[key] = {
      ...config,
      value: form[key],
      setValue: (value) => update(key, value)
    };
  }

  return result;
}