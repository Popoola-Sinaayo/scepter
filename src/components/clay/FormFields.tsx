import type { ReactNode } from "react";

export const inputClass =
  "w-full border border-ink/15 bg-paper px-5 py-4 text-base text-ink outline-none transition placeholder:text-ink/40 focus:border-burgundy aria-[invalid=true]:border-burgundy";

type Requirement = "required" | "optional" | "recommended";

type Option = string | { value: string; description?: string };

function optionValue(option: Option) {
  return typeof option === "string" ? option : option.value;
}

function Marker({ requirement }: { requirement: Requirement }) {
  if (requirement === "required") {
    return (
      <span aria-hidden className="ml-1 text-burgundy">
        *
      </span>
    );
  }
  return (
    <span className="ml-2 text-sm font-normal text-ink/45">
      ({requirement})
    </span>
  );
}

function ErrorText({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={`${id}-error`} className="mt-2 text-sm text-burgundy">
      {errors[0]}
    </p>
  );
}

const labelClass = "block text-[1.0625rem] font-bold leading-snug text-ink";
const hintClass = "mt-1 text-sm leading-6 text-ink/55";

export function FormSection({
  step,
  title,
  description,
  children,
}: {
  step: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-ink/10 pt-12 first:border-t-0 first:pt-0">
      <p className="eyebrow text-burgundy">Section {step}</p>
      <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-3 max-w-2xl text-base leading-7 text-ink/65">{description}</p> : null}
      <div className="mt-8 space-y-9">{children}</div>
    </section>
  );
}

type BaseFieldProps = {
  name: string;
  label: string;
  requirement?: Requirement;
  hint?: string;
  errors?: string[];
};

function FieldShell({
  name,
  label,
  requirement = "required",
  hint,
  errors,
  children,
}: BaseFieldProps & { children: ReactNode }) {
  return (
    <div data-invalid={errors?.length ? "" : undefined}>
      <label htmlFor={name} className={labelClass}>
        {label}
        <Marker requirement={requirement} />
      </label>
      {hint ? <p className={hintClass}>{hint}</p> : null}
      <div className="mt-3">{children}</div>
      <ErrorText id={name} errors={errors} />
    </div>
  );
}

function describedBy(name: string, errors?: string[]) {
  return errors?.length ? `${name}-error` : undefined;
}

export function TextField({
  type = "text",
  autoComplete,
  inputMode,
  min,
  max,
  maxLength = 200,
  placeholder,
  ...props
}: BaseFieldProps & {
  type?: "text" | "email" | "tel" | "number";
  autoComplete?: string;
  inputMode?: "numeric" | "tel" | "email" | "text";
  min?: number;
  max?: number;
  maxLength?: number;
  placeholder?: string;
}) {
  return (
    <FieldShell {...props}>
      <input
        id={props.name}
        name={props.name}
        type={type}
        autoComplete={autoComplete}
        inputMode={inputMode}
        min={min}
        max={max}
        maxLength={type === "number" ? undefined : maxLength}
        placeholder={placeholder}
        required={(props.requirement ?? "required") === "required"}
        aria-invalid={Boolean(props.errors?.length)}
        aria-describedby={describedBy(props.name, props.errors)}
        className={inputClass}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  rows = 4,
  maxLength = 2000,
  ...props
}: BaseFieldProps & { rows?: number; maxLength?: number }) {
  return (
    <FieldShell {...props}>
      <textarea
        id={props.name}
        name={props.name}
        rows={rows}
        maxLength={maxLength}
        required={(props.requirement ?? "required") === "required"}
        aria-invalid={Boolean(props.errors?.length)}
        aria-describedby={describedBy(props.name, props.errors)}
        className={`${inputClass} resize-y`}
      />
    </FieldShell>
  );
}

export function SelectField({
  options,
  placeholder = "Select an option",
  ...props
}: BaseFieldProps & { options: readonly string[]; placeholder?: string }) {
  return (
    <FieldShell {...props}>
      <select
        id={props.name}
        name={props.name}
        defaultValue=""
        required={(props.requirement ?? "required") === "required"}
        aria-invalid={Boolean(props.errors?.length)}
        aria-describedby={describedBy(props.name, props.errors)}
        className={`${inputClass} appearance-none bg-[url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='none' stroke='%2314161c' stroke-width='1.5' d='M1 1l5 5 5-5'/></svg>")] bg-[length:12px_8px] bg-[position:right_1.25rem_center] bg-no-repeat pr-12`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

export function ChoiceField({
  name,
  label,
  requirement = "required",
  hint,
  errors,
  options,
  type = "radio",
  layout = "inline",
  selected,
  maxSelected,
  onChange,
  children,
}: BaseFieldProps & {
  options: readonly Option[];
  type?: "radio" | "checkbox";
  layout?: "inline" | "grid" | "stack";
  /** Makes the group controlled. */
  selected?: readonly string[];
  /** With `selected`, disables the remaining checkboxes once this many are chosen. */
  maxSelected?: number;
  onChange?: (value: string, checked: boolean) => void;
  children?: ReactNode;
}) {
  const atLimit = selected !== undefined && maxSelected !== undefined && selected.length >= maxSelected;
  const layoutClass = {
    inline: "flex flex-wrap gap-3",
    grid: "grid gap-3 sm:grid-cols-2",
    stack: "grid gap-3",
  }[layout];

  return (
    <fieldset
      data-invalid={errors?.length ? "" : undefined}
      aria-describedby={describedBy(name, errors)}
    >
      <legend className={labelClass}>
        {label}
        <Marker requirement={requirement} />
      </legend>
      {hint ? <p className={hintClass}>{hint}</p> : null}
      <div className={`mt-4 ${layoutClass}`}>
        {options.map((option) => {
          const value = optionValue(option);
          const description = typeof option === "string" ? undefined : option.description;
          const controlled = selected !== undefined;
          return (
            <label
              key={value}
              className={`flex cursor-pointer items-start gap-3 border border-ink/15 bg-paper px-4 py-3.5 transition hover:border-burgundy/50 has-[:checked]:border-burgundy has-[:checked]:bg-cream has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-45 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-burgundy ${
                layout === "inline" ? "min-w-28" : ""
              } ${errors?.length ? "border-burgundy/60" : ""}`}
            >
              <input
                type={type}
                name={name}
                value={value}
                checked={controlled ? selected.includes(value) : undefined}
                disabled={atLimit && !selected?.includes(value) ? true : undefined}
                onChange={onChange ? (event) => onChange(value, event.currentTarget.checked) : undefined}
                aria-invalid={Boolean(errors?.length)}
                className="mt-1 size-4 shrink-0 accent-burgundy focus-visible:outline-none"
              />
              <span className="min-w-0">
                <span className="block text-base leading-6 text-ink">{value}</span>
                {description ? (
                  <span className="mt-0.5 block text-sm leading-5 text-ink/55">{description}</span>
                ) : null}
              </span>
            </label>
          );
        })}
      </div>
      <ErrorText id={name} errors={errors} />
      {children}
    </fieldset>
  );
}

export function ConsentField({
  name,
  statement,
  errors,
}: {
  name: string;
  statement: ReactNode;
  errors?: string[];
}) {
  return (
    <div data-invalid={errors?.length ? "" : undefined}>
      <label className="flex cursor-pointer items-start gap-4 border border-ink/15 bg-cream/60 p-5 has-[:checked]:border-burgundy">
        <input
          type="checkbox"
          name={name}
          value="yes"
          required
          aria-invalid={Boolean(errors?.length)}
          aria-describedby={describedBy(name, errors)}
          className="mt-1 size-5 shrink-0 accent-burgundy"
        />
        <span className="text-base leading-7 text-ink/80">
          {statement}
          <span aria-hidden className="ml-1 text-burgundy">
            *
          </span>
        </span>
      </label>
      <ErrorText id={name} errors={errors} />
    </div>
  );
}

export function Reveal({ show, children }: { show: boolean; children: ReactNode }) {
  if (!show) return null;
  return <div className="mt-6 border-l-2 border-burgundy/30 pl-5 sm:pl-6">{children}</div>;
}

export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="clay_hp">Leave this field empty</label>
      <input id="clay_hp" type="text" name="clay_hp" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
