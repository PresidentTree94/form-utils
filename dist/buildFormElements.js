function interParse(config, raw) {
    if (!config.defaultOption && config.options) {
        const raws = Array.isArray(raw) ? raw : [raw];
        if (config.options) {
            return raws
                .map(r => config.options.find(o => String(o) === r))
                .filter(Boolean);
        }
        return raws;
    }
    if (config.options) {
        const match = config.options.find(o => String(o) === raw);
        if (match)
            return match;
    }
    switch (config.type) {
        case "number":
            return Number(raw);
        default: // text, url
            return raw;
    }
}
export function buildFormElements(form, update, schema) {
    const result = {};
    for (const key in schema) {
        const config = schema[key];
        result[key] = {
            ...config,
            value: form[key],
            setValue: (raw) => {
                const value = config.parse ? config.parse(raw) : interParse(config, raw);
                update(key, value);
            }
        };
    }
    return result;
}
