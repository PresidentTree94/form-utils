export function buildFormElements(form, update, schema) {
    const result = {};
    for (const key in schema) {
        const config = schema[key];
        result[key] = {
            ...config,
            value: form[key],
            setValue: (value) => update(key, value)
        };
    }
    return result;
}
