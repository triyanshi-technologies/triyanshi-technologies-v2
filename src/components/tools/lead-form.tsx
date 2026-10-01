"use client";

import { useState, type HTMLAttributes, type HTMLInputAutoCompleteAttribute } from "react";
import { Button } from "@/components/ui/button";
import { Field, FormError, Input, Select, Textarea } from "@/components/ui/form-fields";
import { FormSuccess } from "@/components/ui/form-success";
import { ArrowRightIcon } from "@/components/ui/icons";
import { submitLead } from "@/lib/api";
import { arrowNudge } from "@/lib/hover";
import { useFormSubmit } from "@/lib/use-form-submit";

export type LeadField = {
  name: string;
  label: string;
  type?: "text" | "email" | "url" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  /** Options for `type: "select"` (value = label). */
  options?: string[];
};

type LeadFormProps = {
  /** Tool id sent as `source` to POST /api/leads. */
  source: string;
  /** Prefix for field ids, unique per page. */
  idPrefix: string;
  fields: LeadField[];
  /** Hidden field carrying the tool's results, so the team sees what the visitor saw. */
  summary?: { name: string; value: string };
  /**
   * Values the tool fills in for the visitor (e.g. the graded URL). Whenever
   * they change they overwrite those fields; the visitor can still edit them.
   */
  prefill?: Record<string, string>;
  submitLabel: string;
  success: { title: string; message: string; note: (email: string) => string };
  className?: string;
};

/** Lead capture form shared by the tools: validates, posts to /api/leads, then shows a success panel. */
export function LeadForm({
  source,
  idPrefix,
  fields,
  summary,
  prefill,
  submitLabel,
  success,
  className,
}: LeadFormProps) {
  const { pending, error, submitted, formProps } = useFormSubmit((data) => submitLead(data, source));
  const errorId = `${idPrefix}-error`;

  // Prefilled fields are controlled; re-sync them when the tool's values change.
  const prefillKey = JSON.stringify(prefill ?? {});
  const [synced, setSynced] = useState<Record<string, string>>(() => prefill ?? {});
  const [syncedKey, setSyncedKey] = useState(prefillKey);
  if (prefillKey !== syncedKey) {
    setSyncedKey(prefillKey);
    setSynced((current) => ({ ...current, ...prefill }));
  }
  const valueProps = (name: string) =>
    name in synced
      ? {
          value: synced[name],
          onChange: (e: { target: { value: string } }) =>
            setSynced((current) => ({ ...current, [name]: e.target.value })),
        }
      : {};

  if (submitted) {
    const email = submitted.email;
    return (
      <FormSuccess title={success.title} message={success.message} note={email && success.note(email)} />
    );
  }

  return (
    <form
      noValidate
      className={className ?? "grid gap-4.5"}
      aria-describedby={error ? errorId : undefined}
      {...formProps}
    >
      {fields.map(({ name, label, type = "text", required, options, ...rest }) => {
        const id = `${idPrefix}-${name}`;
        const common = { id, name, required, ...valueProps(name) };
        return (
          <Field key={name} id={id} label={label} required={required}>
            {type === "textarea" ? (
              <Textarea {...common} placeholder={rest.placeholder} />
            ) : type === "select" ? (
              <Select {...common} {...(name in synced ? {} : { defaultValue: options?.[0] })}>
                {options?.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Select>
            ) : (
              <Input {...common} type={type} {...rest} />
            )}
          </Field>
        );
      })}
      {summary && <input type="hidden" name={summary.name} value={summary.value} />}
      <Button
        type="submit"
        loading={pending}
        loadingText="Submitting Request..."
        className="mt-1.5 w-full sm:w-fit"
      >
        {submitLabel} <ArrowRightIcon size={16} className={arrowNudge} />
      </Button>
      <FormError id={errorId}>{error}</FormError>
    </form>
  );
}
