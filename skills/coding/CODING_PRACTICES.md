# Coding Practices for Agents

This document describes code practices that coding agents should follow when working in this repository.

---

## 1. Props: Define type/interface, then destructure inside the component

- **Always** define a dedicated props type or interface (e.g. `ComponentNameProps`).
- **Do not** destructure props in the function signature. Declare the parameter as `props: ComponentNameProps` (or `props: Props`), then destructure inside the component body.

### ✅ Preferred

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  const { label, onClick, disabled = false } = props;
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

### ❌ Avoid

```tsx
export default function Button({ label, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

### Why

- Keeps the component signature stable and easy to read.
- Makes it clear what the component receives (single `props` object).
- Destructuring in one place inside the component makes default values and renames consistent.

---

## 2. Use pnpm (if possible)

- Prefer **pnpm** for installing dependencies and running scripts when the project supports it.
- Use `pnpm install`, `pnpm add`, `pnpm run build`, etc., instead of npm or yarn when a `pnpm-lock.yaml` exists or the project docs specify pnpm.
- If the environment or project does not support pnpm, use the lockfile and package manager already in use (e.g. npm, yarn).

### Examples

```bash
pnpm install
pnpm add some-package
pnpm run dev
pnpm run build
```

---

## 3. Commit messages

- **Follow Conventional Commits** format (e.g. `feat:`, `fix:`, `refactor:`).
- **Describe only the core change or problem solved.**
- The commit message must be **2–3 sentences maximum**.
- **Do not use bullet points** in the message body.
- Keep the message **concise and focused on the main change**.

### ✅ Preferred

```
feat: add payment QR modal for course enrollment

Users can now scan a QR code or upload a screenshot to confirm payment. Modal supports both flows from the course list.
```

### ❌ Avoid

```
Updates to the app

- Added new payment flow
- Fixed bug in modal
- Updated dependencies
- Refactored course list component
```

### Why

- Conventional Commits enable consistent changelogs and automated tooling.
- Short, focused messages make history scannable and reviews easier.

---

## 4. Follow SOLID principles

Always try to design components and modules using **SOLID principles**. Code should follow single responsibility, be open for extension but closed for modification, and maintain proper abstraction and dependency management to keep the system maintainable and scalable.

---

## 5. Prefer alias imports

Always prefer using the **`@` alias for imports** whenever possible. Avoid deep relative imports (like `../../../`) because they reduce readability and make refactoring harder.

---

## 6. README file naming convention

README files should follow the **UPPERCASE SNAKE_CASE** naming convention when they are specific to a module or feature.

Examples:

- `README.md` (root level)
- `COURSE_MODULE_README.md`
- `PAYMENT_FLOW_README.md`

---

## 7. Extract sections into separate components (same file)

- For **distinct UI sections** (e.g. a message banner, a button group, or a repeated block), extract them into a **separate component in the same file** when it improves readability.
- Keep the helper component **below** the main exported component; use a clear, descriptive name (e.g. `ScormPostCloseRefreshMessage`, `ViewTrialButton`).
- Prefer this over long inline JSX so the main component stays focused and the file stays navigable.

### ✅ Preferred

```tsx
function CourseInfoUserEnrolled(props: CourseInfoUserEnrolledProps) {
  const { hasScormPopupBeenClosed } = props;
  return (
    <>
      {hasScormPopupBeenClosed && <ScormPostCloseRefreshMessage />}
      <CourseRefreshButton onClick={reloadCurrentRoute} label="Refresh" />
    </>
  );
}

function ScormPostCloseRefreshMessage() {
  return (
    <Alert>
      <AlertDescription>
        If your progress hasn’t updated after closing the course, use Refresh to reload (allow ~5 sec for sync).
      </AlertDescription>
    </Alert>
  );
}

export default CourseInfoUserEnrolled;
```

### ❌ Avoid

```tsx
function CourseInfoUserEnrolled(props: CourseInfoUserEnrolledProps) {
  return (
    <>
      {hasScormPopupBeenClosed && (
        <Alert>
          <AlertDescription>
            If your progress hasn’t updated after closing the course, use Refresh to reload (allow ~5 sec for sync).
          </AlertDescription>
        </Alert>
      )}
      <CourseRefreshButton ... />
    </>
  );
}
```

### Why

- Keeps the main component easier to scan and reason about.
- Gives the section a clear name and a single place to change.
- Avoids creating extra files for small, file-local UI pieces.

---

## 8. Prefer early returns

- **Use early returns** to handle invalid inputs, edge cases, and guard conditions at the top of the function.
- **Avoid deep nesting** of `if`/`else`; keep the main (“happy path”) logic at the top level.
- Return as soon as a condition fails or a branch is complete so the rest of the function reads linearly.

### ✅ Preferred

```tsx
function loadCourse(id: string | null) {
  if (!id) return null;
  const course = getCourse(id);
  if (!course) return null;
  return <CourseView course={course} />;
}
```

```tsx
function submitForm(data: FormData) {
  if (!data.email) {
    setError("Email is required");
    return;
  }
  if (!isValid(data.email)) {
    setError("Invalid email");
    return;
  }
  await save(data);
}
```

### ❌ Avoid

```tsx
function loadCourse(id: string | null) {
  if (id) {
    const course = getCourse(id);
    if (course) {
      return <CourseView course={course} />;
    }
  }
  return null;
}
```

```tsx
function submitForm(data: FormData) {
  if (data.email) {
    if (isValid(data.email)) {
      await save(data);
    } else {
      setError("Invalid email");
    }
  } else {
    setError("Email is required");
  }
}
```

### Why

- Reduces cognitive load and nesting; the main flow is easier to follow.
- Fail-fast behavior makes invalid states obvious and keeps error handling in one place.
- Fewer nested braces improve readability and reduce the risk of logic errors.

---

## 9. Use the `cn` utility extensively for class names

- **Always** use the **`cn`** utility (from `@/lib/utils`) for composing and conditioning `className` values in JSX/TSX.
- Prefer `cn(...)` over raw string concatenation, template literals, or manual conditionals for combining base classes with conditional or variant classes.
- Use `cn` for any non-trivial `className` (multiple classes, conditionals, or merged props like `className` from parent).

### ✅ Preferred

```tsx
import { cn } from "@/lib/utils";

<div className={cn("base-class", isActive && "active-class", className)} />
<Button className={cn("rounded-lg", variant === "outline" && "border-2")} />
```

### ❌ Avoid

```tsx
<div className={`base-class ${isActive ? "active-class" : ""} ${className ?? ""}`} />
<Button className={"rounded-lg" + (variant === "outline" ? " border-2" : "")} />
```

### Why

- Keeps class composition consistent and readable across the codebase.
- Handles conditional classes, undefined/null, and tailwind merge behavior in one place.
- Reduces duplication and avoids brittle string concatenation.

---

## Summary

| Practice | Rule |
|----------|------|
| Props    | Use `props: Props` (or `props: ComponentNameProps`) in the signature; destructure inside the component. |
| Package manager | Use pnpm when possible (e.g. when `pnpm-lock.yaml` is present). |
| Commit messages | Use Conventional Commits; 2–3 sentences max; no bullet points; focus on the core change. |
| SOLID principles | Design components and modules following SOLID for maintainable, scalable architecture. |
| Alias imports | Prefer the `@` alias over deep relative paths to improve readability and refactorability. |
| README naming | Use UPPERCASE_SNAKE_CASE for module- or feature-specific README files. |
| Extract sections | Extract distinct UI sections into a separate component in the same file for cleaner, more readable code. |
| Early returns | Use early returns for guards and edge cases; avoid deep nesting so the main logic stays linear and readable. |
| `cn` utility | Use `cn` from `@/lib/utils` extensively for all non-trivial `className` composition (conditionals, variants, merging). |
