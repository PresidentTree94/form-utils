function interParse(config, raw) {
    if (config.multi) {
        const raws = Array.isArray(raw) ? raw : [raw];
        if (config.options) {
            return raws
                .map(r => config.options.find(o => String(o) === r))
                .filter(Boolean);
        }
        return raws;
    }
    if (config.options) {
        const match = config.options.find(o => String(o) === raw);
        if (match)
            return match;
    }
    switch (config.type) {
        case "number":
            return Number(raw);
        default: // text, url
            return raw;
    }
}
export function buildFormElements(form, update, schema) {
    const result = {};
    for (const key in schema) {
        const config = schema[key];
        result[key] = {
            ...config,
            value: form[key],
            setValue: (raw) => {
                const value = config.parse ? config.parse(raw) : interParse(config, raw);
                update(key, value);
            }
        };
    }
    return result;
}
/*export function buildFormElements<T extends object>(
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
}*/
/*
export function buildFormElements<T extends object>(
  form: T,
  update: <K extends keyof T>(key: K, value: T[K]) => void,
  schema: Schema<T>
): {
  [K in keyof T]: T[K] extends (infer U)
    ? FormElement<T[K], U>
    : FormElement<T[K]>;
} {
  const result = {} as {
    [K in keyof T]: T[K] extends (infer U)
      ? FormElement<T[K], U>
      : FormElement<T[K]>;
  };

  for (const key in schema) {
    const k = key as keyof T;
    const config = schema[k] as any;

    result[k] = {
      ...config,
      value: form[k],
      setValue: (raw: string | string[]) => {
        const value = config.parse
          ? config.parse(raw)
          : interParse(config, raw);
        update(k, value as T[typeof k]);
      }
    } as any;
  }

  return result;
}
*/ 
