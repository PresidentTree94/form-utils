export function buildFormElements(form, update, schema) {
    const fields = {};
    for (const key in schema) {
        const typedKey = key;
        fields[typedKey] = {
            ...schema[typedKey],
            value: form[typedKey],
            setValue: (value) => update(typedKey, value)
        };
    }
    return fields;
}
