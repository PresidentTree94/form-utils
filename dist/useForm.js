import { useFormState } from "./useFormState";
import { buildFormElements } from "./buildFormElements";
// Full form system: state + typed elements + update helpers.
export function useForm(initial, schema) {
    const { form, update, updateMany, reset } = useFormState(initial);
    const elements = buildFormElements(form, update, schema);
    return { form, elements, update, updateMany, reset };
}
