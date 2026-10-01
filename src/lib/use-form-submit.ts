"use client";

import { useState, type FormEvent } from "react";
import type { FormPayload } from "./api";

/*
 * Shared submit flow for the contact and tool lead forms:
 * validate → send → show success (or the server's error message).
 *
 * Fields stay uncontrolled. Invalid ones get `aria-invalid`, which the
 * form-field styles paint red; typing in a field clears it again.
 */

/** Catches what bare `required` misses (whitespace-only values) and reuses native format checks. */
function validateRequired(form: HTMLFormElement) {
  const fields = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
    "[required]",
  );
  let firstInvalid: (typeof fields)[number] | null = null;
  for (const field of fields) {
    const invalid = !field.value.trim() || !field.checkValidity();
    field.toggleAttribute("aria-invalid", invalid);
    if (invalid) firstInvalid ??= field;
  }
  if (!firstInvalid) return true;
  firstInvalid.reportValidity();
  firstInvalid.focus();
  return false;
}

function serialize(form: HTMLFormElement): FormPayload {
  const data: FormPayload = {};
  new FormData(form).forEach((value, key) => {
    if (typeof value === "string") data[key] = value.trim();
  });
  return data;
}

export function useFormSubmit(send: (data: FormPayload) => Promise<unknown>) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** The submitted values once the request succeeded (null until then). */
  const [submitted, setSubmitted] = useState<FormPayload | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (pending || !validateRequired(form)) return;

    const data = serialize(form);
    setError(null);
    setPending(true);
    try {
      await send(data);
      setSubmitted(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  function onInput(event: FormEvent<HTMLFormElement>) {
    (event.target as Element).removeAttribute("aria-invalid");
  }

  return { pending, error, submitted, formProps: { onSubmit, onInput } };
}
