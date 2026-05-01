import { useState } from "react";
export function useFormState(initial) {
    const [form, setForm] = useState(initial);
    const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
    const updateMany = (values) => setForm(prev => ({ ...prev, ...values }));
    const reset = () => setForm(initial);
    return { form, update, updateMany, reset };
}
