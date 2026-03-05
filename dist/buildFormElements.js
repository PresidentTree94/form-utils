export default function buildFormElements(form, update, schema) {
    return Object.fromEntries(Object.entries(schema).map(([key, config]) => [
        key,
        {
            ...config,
            value: form[key],
            setValue: (value) => update(key, value),
        }
    ]));
}
