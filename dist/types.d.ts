export type FieldConfig<T> = {
    label: string;
    options?: T[];
    [key: string]: unknown;
};
export type Schema<T> = {
    [K in keyof T]: FieldConfig<T[K]>;
};
export type BoundField<T, K extends keyof T> = FieldConfig<T[K]> & {
    value: T[K];
    setValue: (value: T[K] | string) => void;
};
