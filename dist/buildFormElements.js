// Default parser used when no custom config.parse is provided.
function interParse(config, raw) {
    if (config.multi) {
        // Multi-select: normalize to array of raw strings
        const raws = Array.isArray(raw) ? raw : [raw];
        if (config.options) {
            return raws
                .map(r => config.options.find(o => String(o) === r))
                .filter(Boolean);
        }
        return raws;
    }
    // Single value: match against options if provided
    if (config.options) {
        const match = config.options.find(o => String(o) === raw);
        if (match)
            return match;
    }
    // Fallback parsing based on field type
    switch (config.type) {
        case "number":
            return Number(raw);
        default: // text, url
            return raw;
    }
}
// Turns form state + schema into a set of typed form elements with setters.
export function buildFormElements(form, update, schema) {
    const result = {};
    for (const key in schema) {
        const config = schema[key];
        result[key] = {
            ...config,
            value: form[key],
            setValue: (raw) => {
                // Use custom parser if present, otherwise fallback parser
                const value = config.parse ? config.parse(raw) : interParse(config, raw);
                update(key, value);
            }
        };
    }
    return result;
}
