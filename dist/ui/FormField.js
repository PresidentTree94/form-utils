import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function FormField({ field, className = "form-field" }) {
    const { label, type = "text", value, setValue, options } = field;
    let input;
    switch (type) {
        case "select":
            input = (_jsx("select", { value: String(value), onChange: e => setValue(e.target.value), children: options === null || options === void 0 ? void 0 : options.map(opt => _jsx("option", { value: String(opt), children: String(opt) }, String(opt))) }));
            break;
        case "number":
            input = (_jsx("input", { type: "number", value: Number(value), onChange: e => setValue(Number(e.target.value)) }));
            break;
        default:
            input = (_jsx("input", { type: type, value: String(value), onChange: e => setValue(e.target.value) }));
    }
    return (_jsxs("div", { className: `${className || ""}`, children: [_jsx("label", { children: label }), input] }));
}
