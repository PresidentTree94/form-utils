import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FormField } from "./FormField";
export function Form({ fields, onSubmit, children }) {
    return (_jsxs("form", { onSubmit: e => { e.preventDefault(); onSubmit === null || onSubmit === void 0 ? void 0 : onSubmit(); }, children: [Object.entries(fields).map(([key, field]) => (_jsx(FormField, { field: field }, key))), children] }));
}
