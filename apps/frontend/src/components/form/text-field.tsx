import { useFieldContext } from "@/hooks/form";
import React from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export default function TextField({
  label,
  description,
  ...props
}: React.ComponentPropsWithRef<"input"> & {
  label: string;
  description?: string;
}) {
  const field = useFieldContext<string>();
  const isInvalid = !field.state.meta.isValid && field.state.meta.isTouched;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value ?? ""}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
        {...props}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
