# @presidenttree94/form-utils

A tiny, type‑safe form‑handling utility that turns form elements objects and schema into a fully typed form system with parsing and update helpers.

## The problem

Without this package, wiring up a form with multiple fields means juggling individual `useState` calls and manual `onChange` handlers for each one:

```tsx
function ProfileForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [role, setRole] = useState("viewer");

  const handleSubmit = () => {
    console.log({ name, age, role });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label>
        Age
        <input
          type="number"
          value={age}
          onChange={e => setAge(Number(e.target.value))}
        />
      </label>
      <label>
        Role
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      <button type="submit">Save</button>
    </form>
  );
}
```

This gets tedious fast — every field needs its own state, its own handler, and manual type coercion.

## Using `useForm`

`useForm` combines state management and element binding into a single call. You define a schema once, and each field gets a `value` and a `setValue` that handles parsing for you.

```tsx
import { useForm } from "@presidenttree94/form-utils";

type ProfileFormData = {
  name: string;
  age: number;
  role: string;
};

const ROLES = ["viewer", "editor", "admin"];

function ProfileForm() {
  const { form, elements, reset } = useForm<ProfileFormData>(
    { name: "", age: 0, role: "viewer" },
    {
      name: { label: "Name", type: "text" },
      age:  { label: "Age",  type: "number" },
      role: { label: "Role", options: ROLES, defaultOption: "Select a role" },
    }
  );

  const handleSubmit = () => {
    console.log(form); // { name: string, age: number, role: string }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {elements.name.label}
        <input
          type={elements.name.type}
          value={elements.name.value}
          onChange={e => elements.name.setValue(e.target.value)}
        />
      </label>
      <label>
        {elements.age.label}
        <input
          type={elements.age.type}
          value={elements.age.value}
          onChange={e => elements.age.setValue(e.target.value)}
        />
      </label>
      <label>
        {elements.role.label}
        <select
          value={elements.role.value}
          onChange={e => elements.role.setValue(e.target.value)}
        >
          <option disabled value="">{elements.role.defaultOption}</option>
          {elements.role.options?.map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={reset}>Reset</button>
    </form>
  );
}
```

`age` is automatically parsed as a `number` via the `type: "number"` config — no manual `Number()` calls needed.

## Using `useFormState` and `buildFormElements` separately

`useForm` is a convenience wrapper, but you can use the two underlying pieces independently. This is useful when you want to share form state across components or derive elements at a different point in your render tree.

```tsx
import { useFormState, buildFormElements } from "@presidenttree94/form-utils";

type ProfileFormData = {
  name: string;
  age: number;
  role: string;
};

const ROLES = ["viewer", "editor", "admin"];

const schema = {
  name: { label: "Name", type: "text" },
  age:  { label: "Age",  type: "number" },
  role: { label: "Role", options: ROLES },
};

function ProfileForm() {
  // Step 1: manage state
  const { form, update, updateMany, reset } = useFormState<ProfileFormData>({
    name: "",
    age: 0,
    role: "viewer",
  });

  // Bulk-update multiple fields at once (e.g. pre-filling from an API response)
  const prefill = () => updateMany({ name: "Alice", age: 30 });

  // Step 2: build elements when needed (e.g. passed down to a sub-component)
  const elements = buildFormElements(form, update, schema);

  const handleSubmit = () => {
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        {elements.name.label}
        <input
          type={elements.name.type}
          value={elements.name.value}
          onChange={e => elements.name.setValue(e.target.value)}
        />
      </label>
      <label>
        {elements.age.label}
        <input
          type={elements.age.type}
          value={elements.age.value}
          onChange={e => elements.age.setValue(e.target.value)}
        />
      </label>
      <label>
        {elements.role.label}
        <select
          value={elements.role.value}
          onChange={e => elements.role.setValue(e.target.value)}
        >
          {elements.role.options?.map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={prefill}>Pre-fill</button>
      <button type="button" onClick={reset}>Reset</button>
    </form>
  );
}
```

## API

### `useForm(initial, schema)`

Combines `useFormState` and `buildFormElements`. Returns `{ form, elements, update, updateMany, reset }`.

### `useFormState(initial)`

Manages form state. Returns:
- `form` — current values
- `update(key, value)` — update a single field
- `updateMany(partial)` — update multiple fields at once
- `reset()` — restore initial values

### `buildFormElements(form, update, schema)`

Builds a map of form elements from the current state, update function, and schema. Each element extends its `FieldConfig` with:
- `value` — the current field value
- `setValue(raw)` — parses the raw string input and calls `update`

### `FieldConfig`

| Property        | Type                                | Description                                      |
|-----------------|-------------------------------------|--------------------------------------------------|
| `label`         | `string`                            | Display label for the field                      |
| `type`          | `string`                            | Input type (`"text"`, `"number"`, etc.)          |
| `required`      | `boolean`                           | Whether the field is required                    |
| `options`       | `Option[]`                          | Available options for select fields              |
| `multi`         | `boolean`                           | Whether multiple selections are allowed          |
| `defaultOption` | `string`                            | Placeholder text for the default option          |
| `parse`         | `(raw: string \| string[]) => Value` | Custom parser, overrides the built-in type logic |