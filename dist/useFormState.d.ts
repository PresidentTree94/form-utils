export default function useFormState<T>(initial: T): {
    form: T;
    update: (key: keyof T, value: any) => void;
    reset: () => void;
    setForm: import("react").Dispatch<import("react").SetStateAction<T>>;
};
