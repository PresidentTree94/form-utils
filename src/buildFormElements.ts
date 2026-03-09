import { Schema, FormElement, FieldConfig } from "./types";

function interParse<Value>(config: FieldConfig<Value>, raw: string): Value {
  if (config.options) {
    const match = config.options.find(o => String(o) === raw);
    if (match) return match as Value;
  }

  switch (config.type) {
    case "number":
      return Number(raw) as Value;
    default: // text, url
      return raw as Value;
  }
}

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
      setValue: (raw: string) => {
        const value = config.parse ? config.parse(raw) : interParse(config, raw);
        update(key, value as T[typeof key]);
      }
    };
  }

  return result;
}