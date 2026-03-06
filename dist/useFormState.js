import { useCallback, useState } from "react";
export function useFormState(initial) {
    const [form, setForm] = useState(initial);
    const update = useCallback((key, value) => setForm(prev => ({ ...prev, [key]: value })), []);
    const patch = useCallback((newValues) => setForm(prev => ({ ...prev, ...newValues })), []);
    const reset = useCallback(() => setForm({ ...initial }), []);
    return { form, update, patch, reset };
}
