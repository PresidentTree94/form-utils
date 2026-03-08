import { useState, useEffect, useMemo } from "react";
export function useForm(initial, schema, dynamicConfig) {
    const [form, setForm] = useState(initial);
    const [config, setConfig] = useState(schema);
    const setField = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };
    const patch = (values) => {
        setForm(prev => ({ ...prev, ...values }));
    };
    const reset = () => setForm(initial);
    useEffect(() => {
        if (dynamicConfig) {
            setConfig(prev => {
                const updated = { ...prev };
                for (const key in dynamicConfig) {
                    const typedKey = key;
                    updated[typedKey] = {
                        ...updated[typedKey],
                        ...dynamicConfig[typedKey]
                    };
                }
                return updated;
            });
        }
    }, [dynamicConfig]);
    const fields = useMemo(() => {
        const result = {};
        for (const key in config) {
            const typedKey = key;
            result[typedKey] = {
                ...config[typedKey],
                value: form[typedKey],
                setValue: (value) => setField(typedKey, value),
            };
        }
        return result;
    }, [form, config]);
    return { form, fields, setField, patch, reset };
}
