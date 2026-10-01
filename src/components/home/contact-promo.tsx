import { Reveal } from "@/components/motion/reveal";
import { CoffeeButton } from "@/components/ui/coffee-button";
import { Container } from "@/components/ui/layout";

/** "Still Scrolling?" contact callout with the animated coffee-chat button. */
export function ContactPromo() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-ink-raised to-ink pt-10 pb-12 tone-dark shadow-[inset_0_1px_0_rgb(255_255_255/0.05),inset_0_-1px_0_rgb(255_255_255/0.05),0_24px_50px_rgb(0_0_0/0.22)] md:pt-12 md:pb-14">
      {/* Warm glows + faint centre sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-[circle_at_18%_18%] from-primary/9 to-transparent to-28%"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-[circle_at_82%_52%] from-primary/5 to-transparent to-26%"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent from-35% via-primary/3 to-transparent to-65%"
      />

      <Container>
        <Reveal className="relative z-1 grid items-center gap-8 py-9 md:grid-cols-[minmax(0,1fr)_minmax(0,0.65fr)]">
          <div>
            <h2 className="mb-3 max-w-125 text-heading-xl leading-[1.03] text-white max-md:max-w-none md:text-display">
              Still <span className="text-primary italic">Scrolling?</span> Looks Like We&apos;re a{" "}
              <span className="text-primary italic">Match</span>
            </h2>
            <p className="mb-4 max-w-148 text-base leading-7">
              Slide into our inbox. We promise we don&apos;t bite.
            </p>
            <p className="inline-flex items-center gap-3 rounded-r-lg border-l-2 border-primary bg-linear-to-r from-primary/9 to-transparent to-80% py-2.5 pr-4.5 pl-3.5 text-sm tracking-wide text-white/60">
              Still got questions, ideas, or just want to explore what&apos;s possible?
              {/* <span className="font-semibold whitespace-nowrap text-primary">Let&apos;s Talk</span> */}
            </p>
          </div>

          <div className="relative z-1 grid w-full justify-items-center gap-3.5 md:justify-self-end">
            <CoffeeButton />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
