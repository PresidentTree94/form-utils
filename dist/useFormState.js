import { useState } from "react";
export function useFormState(initial) {
    const [form, setForm] = useState(initial);
    const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
    const patch = (newValues) => setForm(prev => ({ ...prev, ...newValues }));
    const reset = () => setForm(initial);
    return { form, update, patch, reset };
}
