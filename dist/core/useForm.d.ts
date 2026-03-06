import { Schema, BoundField } from "./types";
export declare function useForm<T extends object>(initial: T, schema: Schema<T>): {
    form: T;
    fields: {
        [K in keyof T]: BoundField<T, K>;
    };
    update: <K extends keyof T>(key: K, value: T[K]) => void;
    patch: (values: Partial<T>) => void;
    reset: () => void;
};
