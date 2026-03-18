import { useFormState } from "./useFormState";
import { buildFormElements } from "./buildFormElements";
export function useForm(initial, schema) {
    const { form, update, updateMany, reset } = useFormState(initial);
    const elements = buildFormElements(form, update, schema);
    return { form, elements, update, updateMany, reset };
}
