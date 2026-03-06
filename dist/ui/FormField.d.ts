import { BoundField } from "../core/types";
export declare function FormField<T, K extends keyof T>({ field, className }: {
    field: BoundField<T, K>;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
