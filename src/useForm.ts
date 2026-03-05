import { useMemo } from "react";
import { FieldConfig, Schema } from "./types";
import { useFormState } from "./useFormState";
import { buildFormElements } from "./buildFormElements";

export function useForm<T extends object>(
  initial: T,
  schema: Schema<T>
): {
  form: T;
  fields: {
    [K in keyof T]: FieldConfig<T, K> & {
      value: T[K];
      setValue: (value: T[K]) => void;
    };
  };
  update: <K extends keyof T>(key: K, value: T[K]) => void;
  patch: (values: Partial<T>) => void;
  reset: () => void;
  setForm: React.Dispatch<React.SetStateAction<T>>;
} {
  const { form, update, patch, reset, setForm } = useFormState(initial);

  const fields = useMemo(
    () => buildFormElements(form, update, schema),
    [form, update, schema]
  );

  return { form, fields, update, patch, reset, setForm };
}