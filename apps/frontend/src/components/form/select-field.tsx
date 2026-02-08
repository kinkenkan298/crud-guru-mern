import { useFieldContext } from "@/hooks/form";
import React from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SelectFieldProps {
  label: string;
  selectLabel?: string;
  data: { label: string; value: string }[];
  description?: string;
}

export default function SelectField({
  label,
  selectLabel,
  data,
  description,
}: React.ComponentPropsWithRef<"select"> & SelectFieldProps) {
  const { name, state, handleChange, handleBlur } = useFieldContext<string>();
  const isInvalid = state.meta.isTouched && !state.meta.isValid;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Select
        value={state.value ?? ""}
        onValueChange={(value) => handleChange(value as string)}
      >
        <SelectTrigger id={name} onBlur={handleBlur}>
          <SelectValue placeholder={selectLabel ? selectLabel : label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data.map((d, _) => (
              <SelectItem key={d.value} value={d.value}>
                {d.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {description && <FieldDescription>{description}</FieldDescription>}
      {isInvalid && <FieldError errors={state.meta.errors} />}
    </Field>
  );
}
