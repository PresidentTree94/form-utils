import { Schema, FormElement, FieldConfig } from "./types";

function interParse<Value, Option>(config: FieldConfig<Value, Option>, raw: string | string[]): Value | Value[] {
  if (!config.defaultOption && config.options) {
    const raws = Array.isArray(raw) ? raw : [raw];

    if (config.options) {
      return raws
        .map(r => config.options!.find(o => String(o) === r))
        .filter(Boolean) as Value[];
    }

    return raws as Value[];
  }
  
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
      setValue: (raw: string | string[]) => {
        const value = config.parse ? config.parse(raw) : interParse(config, raw);
        update(key, value as T[typeof key]);
      }
    };
  }

  return result;
}