export declare function useFormState<T extends object>(initial: T): {
    form: T;
    update: <K extends keyof T>(key: K, value: T[K]) => void;
    updateMany: (values: Partial<T>) => void;
    reset: () => void;
};
