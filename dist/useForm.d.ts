import { Schema, BoundField } from "./types";
export declare function useForm<T extends object>(initial: T, schema: Schema<T> | (() => Schema<T>)): {
    form: T;
    fields: { [K in keyof T]: BoundField<T, K>; };
    setField: <K_1 extends keyof T>(key: K_1, value: T[K_1]) => void;
    patch: (values: Partial<T>) => void;
    reset: () => void;
};
