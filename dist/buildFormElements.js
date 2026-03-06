export function buildFormElements(form, update, schema) {
    const fields = {};
    for (const key in schema) {
        const k = key;
        fields[k] = {
            ...schema[k],
            value: form[k],
            setValue: (value) => update(k, value)
        };
    }
    return fields;
}
