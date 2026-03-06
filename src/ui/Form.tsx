import { BoundField } from "../core/types";
import { FormField } from "./FormField";

export function Form<T extends object>({
  fields,
  onSubmit,
  children
}: {
  fields: {
    [K in keyof T]: BoundField<T, K>;
  };
  onSubmit?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit?.(); }}>
      {Object.entries(fields).map(([key, field]) => (
        <FormField key={key} field={field as any} />
      ))}
      {children}
    </form>
  );
}
