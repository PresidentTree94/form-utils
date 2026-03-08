import { useFormState } from "./useFormState";
import { buildFormElements } from "./buildFormElements";
import { Schema } from "./types";

export function useForm<T extends object>(
  initial: T,
  schema: Schema<T>
) {
  const { form, update, updateMany, reset } = useFormState(initial);

  const elements = buildFormElements(form, update, schema);

  return { form, elements, update, updateMany, reset };
}