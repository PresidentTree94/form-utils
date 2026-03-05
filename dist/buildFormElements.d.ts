import { FieldConfig, Schema } from "./types";
export declare function buildFormElements<T extends object>(form: T, update: <K extends keyof T>(key: K, value: T[K]) => void, schema: Schema<T>): {
    [K in keyof T]: FieldConfig<T, K> & {
        value: T[K];
        setValue: (value: T[K]) => void;
    };
};
