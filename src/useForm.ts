import { useState, useMemo } from "react";
import { Schema, BoundField } from "./types";

export function useForm<T extends object>(initialForm: T, initialSchema?: Schema<T>) {
  const [form, setForm] = useState<T>(initialForm);
  const [schema, setSchema] = useState<Schema<T> | undefined>(initialSchema);

  const setField = <K extends keyof T>(key: K, value: T[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const patch = (values: Partial<T>) => {
    setForm(prev => ({ ...prev, ...values }));
  };

  const reset = () => setForm(initialForm);

  const fields = useMemo(() => {
    if (!schema) return undefined;

    const result = {} as { [K in keyof T]: BoundField<T, K> };

    for (const key in schema) {
      const typedKey = key as keyof T;

      result[typedKey] = {
        ...schema[typedKey],
        value: form[typedKey],
        setValue: (value) => setField(typedKey, value)
      };
    }

    return result;
  }, [form, schema]);

  return { form, fields, setField, patch, reset, setSchema };
}