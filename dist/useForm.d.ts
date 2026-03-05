import { FieldConfig, Schema } from "./types";
export declare function useForm<T extends object>(initial: T, schema: Schema<T>): {
    form: T;
    fields: {
        [K in keyof T]: FieldConfig<T, K> & {
            value: T[K];
            setValue: (value: T[K]) => void;
        };
    };
    update: <K extends keyof T>(key: K, value: T[K]) => void;
    patch: (values: Partial<T>) => void;
    reset: () => void;
    setForm: React.Dispatch<React.SetStateAction<T>>;
};
