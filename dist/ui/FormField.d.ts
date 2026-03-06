import { BoundField } from "../core/types";
export declare function FormField<T, K extends keyof T>({ field, labelClassName, inputClassName }: {
    field: BoundField<T, K>;
    labelClassName?: string;
    inputClassName?: string;
}): import("react/jsx-runtime").JSX.Element;
