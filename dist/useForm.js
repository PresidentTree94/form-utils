import { useMemo } from "react";
import { useFormState } from "./useFormState";
import { buildFormElements } from "./buildFormElements";
export function useForm(initial, schema) {
    const { form, update, patch, reset, setForm } = useFormState(initial);
    const fields = useMemo(() => buildFormElements(form, update, schema), [form, update, schema]);
    return { form, fields, update, patch, reset, setForm };
}
