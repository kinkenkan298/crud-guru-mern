import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { lazy } from "react";

const TextField = lazy(() => import("@/components/form/text-field"));
const SelectField = lazy(() => import("@/components/form/select-field"));

export const { useFormContext, fieldContext, useFieldContext, formContext } =
  createFormHookContexts();
export const { useAppForm, withFieldGroup, withForm } = createFormHook({
  fieldComponents: {
    TextField,
    SelectField,
  },
  formComponents: {},
  fieldContext,
  formContext,
});
