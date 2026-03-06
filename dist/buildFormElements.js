export function buildFormElements(form, update, schema) {
    const fields = {};
    for (const key in schema) {
        fields[key] = {
            ...schema[key],
            value: form[key],
            setValue: (value) => update(key, value)
        };
    }
    return fields;
}
