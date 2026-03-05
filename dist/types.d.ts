export type FieldConfig<T, K extends keyof T> = {
    label: string;
    type?: string;
    options?: T[K][];
} & Record<string, any>;
export type Schema<T> = {
    [K in keyof T]: FieldConfig<T, K>;
};
