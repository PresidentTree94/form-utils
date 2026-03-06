import { useMemo } from "react";
import { Schema, BoundField } from "./types";
import { useFormState } from "./useFormState";
import { buildFormElements } from "./buildFormElements";

export function useForm<T extends object>(
  initial: T,
  schema: Schema<T>
): {
  form: T;
  fields: {
    [K in keyof T]: BoundField<T, K>;
  };
  update: <K extends keyof T>(key: K, value: T[K]) => void;
  patch: (values: Partial<T>) => void;
  reset: () => void;
} {
  const { form, update, patch, reset } = useFormState(initial);

  const fields = useMemo(() => buildFormElements(form, update, schema), [form, update, schema]);

  return { form, fields, update, patch, reset };
}