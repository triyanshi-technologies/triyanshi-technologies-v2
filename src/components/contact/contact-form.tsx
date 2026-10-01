"use client";

import { submitContact } from "@/lib/api";
import { useFormSubmit } from "@/lib/use-form-submit";
import { Button } from "@/components/ui/button";
import { Field, FormError, Input, Textarea } from "@/components/ui/form-fields";
import { FormSuccess } from "@/components/ui/form-success";

const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "E-mail Address", type: "email", autoComplete: "email", inputMode: "email" },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
] as const;

/** Contact page form → POST /api/contact on the API server. */
export function ContactForm() {
  const { pending, error, submitted, formProps } = useFormSubmit(submitContact);

  if (submitted) {
    const email = submitted.email?.trim();
    return (
      <FormSuccess
        title="Message Received!"
        message="Thanks for reaching out - we read every message ourselves."
        note={email && `We'll reply to ${email}.`}
      />
    );
  }

  return (
    <form
      method="post"
      className="grid gap-4"
      aria-describedby={error ? "contact-form-error" : undefined}
      {...formProps}
    >
      {FIELDS.map(({ name, label, ...input }) => (
        <Field key={name} id={`contact-${name}`} label={`${label} *`} hideLabel>
          <Input
            id={`contact-${name}`}
            name={name}
            placeholder={`${label} *`}
            size="lg"
            required
            {...input}
          />
        </Field>
      ))}
      <Field id="contact-message" label="Message *" hideLabel>
        <Textarea id="contact-message" name="message" placeholder="Message *" size="lg" required />
      </Field>
      <Button
        type="submit"
        loading={pending}
        loadingText="Sending Message..."
        className="mt-2 w-full md:w-fit"
      >
        Send Message
      </Button>
      <FormError id="contact-form-error">{error}</FormError>
    </form>
  );
}
