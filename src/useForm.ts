import { useState, useMemo } from "react";
import { Schema, BoundField } from "./types";

export function useForm<T extends object>(initial: T, schema: Schema<T>) {
  const [form, setForm] = useState<T>(initial);

  const setField = <K extends keyof T>(key: K, value: T[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const patch = (values: Partial<T>) => {
    setForm(prev => ({ ...prev, ...values }));
  };

  const reset = () => setForm(initial);

  const fields = useMemo(() => {
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
  }, []);

  return { form, fields, setField, patch, reset };
}