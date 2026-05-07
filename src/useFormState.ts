import { useState } from "react";

// Simple React state wrapper for form objects.
export function useFormState<T extends object>(initial: T) {
  const [form, setForm] = useState<T>(initial);

  const update = <K extends keyof T>(key: K, value: T[K]) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const updateMany = (values: Partial<T>) =>
    setForm(prev => ({ ...prev, ...values }));

  const reset = () => setForm(initial);

  return { form, update, updateMany, reset };
}