import { useState, useMemo } from "react";
export function useForm(initial, schema) {
    const [form, setForm] = useState(initial);
    const [config, setConfig] = useState(schema);
    const setField = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };
    const patch = (values) => {
        setForm(prev => ({ ...prev, ...values }));
    };
    const reset = () => setForm(initial);
    const setFieldConfig = (key, config) => {
        setConfig(prev => ({ ...prev, [key]: { ...prev[key], ...config } }));
    };
    const fields = useMemo(() => {
        const result = {};
        for (const key in config) {
            const typedKey = key;
            result[typedKey] = {
                ...config[typedKey],
                value: form[typedKey],
                setValue: (value) => setField(typedKey, value)
            };
        }
        return result;
    }, [form, config]);
    return { form, fields, setField, patch, reset, setFieldConfig };
}
