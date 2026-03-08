import { useState, useEffect, useMemo } from "react";
export function useForm(initial, schema) {
    const [form, setForm] = useState(initial);
    const schemaInput = useMemo(() => {
        return typeof schema === "function" ? schema() : schema;
    }, [schema]);
    const [config, setConfig] = useState(schemaInput);
    useEffect(() => {
        setConfig(schemaInput);
    }, [schemaInput]);
    const setField = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };
    const patch = (values) => {
        setForm(prev => ({ ...prev, ...values }));
    };
    const reset = () => setForm(initial);
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
