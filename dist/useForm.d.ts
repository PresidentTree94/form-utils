import { Schema } from "./types";
export declare function useForm<T extends object>(initial: T, schema: Schema<T>): {
    form: T;
    elements: { [K in keyof T]: import("./types").FormElement<T[K]>; };
    update: <K_1 extends keyof T>(key: K_1, value: T[K_1]) => void;
    updateMany: (values: Partial<T>) => void;
    reset: () => void;
};
