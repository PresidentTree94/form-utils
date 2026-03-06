import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
export function FormField({ field, labelClassName, inputClassName }) {
    const { label, type, value, setValue, options } = field;
    let input;
    switch (type) {
        case "single-select":
        case "multi-select":
            input = (_jsx("select", { ...(type === "single-select" ? {} : { multiple: true }), className: inputClassName, value: String(value), onChange: e => setValue(e.target.value), children: options === null || options === void 0 ? void 0 : options.map(opt => _jsx("option", { value: String(opt), children: String(opt) }, String(opt))) }));
            break;
        case "number":
            input = (_jsx("input", { type: "number", className: inputClassName, value: Number(value), onChange: e => setValue(Number(e.target.value)) }));
            break;
        default:
            input = (_jsx("input", { type: type, className: inputClassName, value: String(value), onChange: e => setValue(e.target.value) }));
    }
    return (_jsxs(_Fragment, { children: [_jsx("label", { className: labelClassName, children: label }), input] }));
}
