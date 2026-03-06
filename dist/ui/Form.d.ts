import { BoundField } from "../core/types";
export declare function Form<T extends object>({ fields, onSubmit, children }: {
    fields: {
        [K in keyof T]: BoundField<T, K>;
    };
    onSubmit?: () => void;
    children?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
