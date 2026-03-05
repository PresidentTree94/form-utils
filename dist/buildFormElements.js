export function buildFormElements(form, update, schema) {
    const entries = Object.entries(schema);
    return Object.fromEntries(entries.map(([key, config]) => [
        key,
        {
            ...config,
            value: form[key],
            setValue: (value) => update(key, value)
        }
    ]));
}
