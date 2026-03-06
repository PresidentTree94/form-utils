import { useState } from "react";

export function useFormState<T>(initial: T) {
  const [form, setForm] = useState<T>(initial);

  const update = <K extends keyof T>(key: K, value: T[K]) => setForm(prev => ({ ...prev, [key]: value }));

  const patch = (newValues: Partial<T>) => setForm(prev => ({ ...prev, ...newValues }));

  const reset = () => setForm(initial);
  
  return { form, update, patch, reset };
}