import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { CoffeeButton } from "@/components/ui/coffee-button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { cx } from "@/lib/cx";
import { arrowNudge, cardHover } from "@/lib/hover";

type CtaProps = { title: ReactNode; description: ReactNode };

/** Dark centered closing CTA (services, portfolio). */
export function CtaCentered({
  title,
  description,
  action = { label: "Start a Conversation", href: "/contact-us/contact-us" },
  actions,
}: CtaProps & {
  action?: { label: string; href: string };
  /** Custom buttons; replaces the single `action`. */
  actions?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-ink-raised to-ink py-20 text-center tone-dark">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-[circle_at_18%_18%] from-primary/9 to-transparent to-28%"
      />
      <Container className="relative">
        <Reveal as="h2" className="mb-4 text-heading-lg text-white">
          {title}
        </Reveal>
        <Reveal as="p" className="mx-auto mb-8 max-w-145 leading-7 text-white/70">
          {description}
        </Reveal>
        <Reveal className="flex flex-wrap justify-center gap-4">
          {actions ?? <ButtonLink href={action.href}>{action.label}</ButtonLink>}
        </Reveal>
      </Container>
    </section>
  );
}

/** Dark split CTA with the animated coffee button (eCommerce, Enterprise, Compliance). */
export function CtaSplit({
  title,
  description,
  buttonLabel,
  eyebrow = "Let's Build What's Next",
}: CtaProps & { buttonLabel?: string; eyebrow?: string | null }) {
  return (
    <section className="border-t border-white/8 bg-ink tone-dark">
      <Container>
        <Reveal className="grid items-center gap-10 py-8 md:grid-cols-2 md:gap-14">
          <div className="flex flex-col justify-center gap-3.5">
            {eyebrow && (
              <span className="text-xs font-bold tracking-wider text-primary uppercase">{eyebrow}</span>
            )}
            <h2 className="text-heading-lg leading-[1.3] text-white">{title}</h2>
            <p className="max-w-130 leading-7">{description}</p>
          </div>
          <div className="grid w-full justify-items-center md:justify-self-end">
            <CoffeeButton label={buttonLabel} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export type HubCard = { title: string; description: string; href: string };

/** Grouped grid of link cards (services and portfolio hubs). */
export function HubGrid({
  id,
  groups,
  linkLabel,
}: {
  id: string;
  groups: { title: string; cards: HubCard[] }[];
  linkLabel: string;
}) {
  return (
    <section id={id} className="bg-surface py-12">
      <Container className="space-y-14">
        {groups.map((group) => (
          <Reveal key={group.title}>
            <h2 className="mb-6 text-heading-lg text-ink">{group.title}</h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {group.cards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className={cx(
                    "group/link flex min-h-full flex-col rounded-xl border border-line bg-white p-7",
                    cardHover,
                  )}
                >
                  <span className="mb-2.5 text-lg leading-snug font-bold text-ink">{card.title}</span>
                  <span className="flex-1 text-sm leading-relaxed text-body">{card.description}</span>
                  <span className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 text-sm font-bold text-primary">
                    {linkLabel} <ArrowRightIcon size={13} strokeWidth={2.5} className={arrowNudge} />
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
