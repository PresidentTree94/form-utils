import { useState, useMemo } from "react";
export function useForm(initial, initialSchema) {
    const [form, setForm] = useState(initial);
    const [schema, setSchema] = useState(initialSchema);
    const setField = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };
    const patch = (values) => {
        setForm(prev => ({ ...prev, ...values }));
    };
    const reset = () => setForm(initial);
    const fields = useMemo(() => {
        if (!schema)
            return undefined;
        const result = {};
        for (const key in schema) {
            const typedKey = key;
            result[typedKey] = {
                ...schema[typedKey],
                value: form[typedKey],
                setValue: (value) => setField(typedKey, value)
            };
        }
        return result;
    }, [form, schema, setField]);
    return { form, fields, setField, patch, reset, setSchema };
}
