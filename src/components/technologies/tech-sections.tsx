import type { ReactNode } from "react";
import { CtaCentered } from "@/components/sections/cta";
import { ButtonLink } from "@/components/ui/button";
import { Highlight } from "@/components/ui/layout";
import type { TitleSegment } from "@/content/technologies";

/** Renders title segments, with `accent` segments in orange. */
export function TechTitle({ segments }: { segments: TitleSegment[] }) {
  return segments.map((segment) =>
    segment.accent ? <Highlight key={segment.text}>{segment.text}</Highlight> : segment.text,
  );
}

/** Closing CTA shared by the technologies overview and detail pages. */
export function TechCta({
  description,
  secondary,
}: {
  description: ReactNode;
  secondary: { label: string; href: string };
}) {
  return (
    <CtaCentered
      title={
        <>
          Ready To Build Something That <Highlight>Scales?</Highlight>
        </>
      }
      description={description}
      actions={
        <>
          <ButtonLink href="/contact-us/contact-us">Get in Touch</ButtonLink>
          <ButtonLink href={secondary.href} variant="outline">
            {secondary.label}
          </ButtonLink>
        </>
      }
    />
  );
}
