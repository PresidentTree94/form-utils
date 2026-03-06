import { Schema, BoundField } from "./types";
export declare function buildFormElements<T extends object>(form: T, update: <K extends keyof T>(key: K, value: T[K]) => void, schema: Schema<T>): {
    [K in keyof T]: BoundField<T, K>;
};
