import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
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

const person = "rgb(255 255 255 / 0.6)";
const bubble =
  "opacity-0 scale-40 transition-[opacity,scale] duration-350 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-100 group-hover:opacity-100";
const dot = "fill-primary opacity-0";

function CoffeeButton() {
  return (
    <Link
      href="/contact-us/contact-us"
      className="group relative z-1 inline-flex min-w-64 flex-col items-center gap-5 overflow-hidden rounded-3xl border border-primary/25 bg-primary/4 px-9 py-7 text-center text-white shadow-[0_8px_32px_rgb(0_0_0/0.3),inset_0_1px_1px_rgb(255_255_255/0.05)] backdrop-blur-md transition-all duration-400 hover:border-primary/60 hover:bg-primary/9 hover:shadow-[0_12px_40px_rgb(255_153_51/0.18),inset_0_1px_1px_rgb(255_255_255/0.1)] max-sm:w-full max-sm:py-3 max-sm:pr-6 max-sm:pl-4"
    >
      <svg viewBox="0 0 100 50" fill="none" aria-hidden="true" className="block h-auto w-75 max-w-full">
        {/* Two people */}
        <path d="M16 42c0-5 3.5-9 8.5-9s8.5 4 8.5 9" stroke={person} strokeWidth="2" strokeLinecap="round" />
        <circle cx="24.5" cy="21" r="5.5" stroke={person} strokeWidth="2" />
        <path d="M84 42c0-5-3.5-9-8.5-9s-8.5 4-8.5 9" stroke={person} strokeWidth="2" strokeLinecap="round" />
        <circle cx="75.5" cy="21" r="5.5" stroke={person} strokeWidth="2" />

        {/* Coffee cup with rising steam */}
        <g className="[transform-origin:50px_36px] scale-78">
          <path
            d="M44 29h12v6c0 2.5-2 4.5-4.5 4.5h-3c-2.5 0-4.5-2-4.5-4.5v-6z"
            className="stroke-primary"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M56 31.5h2.5c1.1 0 2 .9 2 2s-.9 2-2 2H56"
            className="stroke-primary"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="40"
            y1="42.5"
            x2="60"
            y2="42.5"
            className="stroke-primary"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M47 24.5c.3-1.8-.3-3-.5-4.2s.3-3 .5-4.2"
            className="origin-bottom animate-steam stroke-accent [animation-delay:0.3s]"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M50 25.5c.3-2-.3-3.3-.5-4.5s.3-3.3.5-4.5"
            className="origin-bottom animate-steam stroke-accent [animation-delay:0.8s]"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M53 24.5c.3-1.8-.3-3-.5-4.2s.3-3 .5-4.2"
            className="origin-bottom animate-steam stroke-accent"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>

        {/* Typing bubbles (appear on hover; dots type left→right / right→left) */}
        <g className={`${bubble} [transform-origin:21px_12px]`}>
          <rect
            x="18"
            y="2"
            width="14"
            height="8"
            rx="4"
            className="fill-primary/15 stroke-primary"
            strokeWidth="1"
          />
          <polygon
            points="23,10 21,12 25,10"
            className="fill-primary stroke-primary"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          <circle cx="21.5" cy="6" r="0.8" className={`${dot} group-hover:animate-typing-1`} />
          <circle cx="25" cy="6" r="0.8" className={`${dot} group-hover:animate-typing-2`} />
          <circle cx="28.5" cy="6" r="0.8" className={`${dot} group-hover:animate-typing-3`} />
        </g>
        <g className={`${bubble} [transform-origin:79px_12px]`}>
          <rect
            x="68"
            y="2"
            width="14"
            height="8"
            rx="4"
            className="fill-primary/15 stroke-primary"
            strokeWidth="1"
          />
          <polygon
            points="77,10 79,12 75,10"
            className="fill-primary stroke-primary"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          <circle cx="71.5" cy="6" r="0.8" className={`${dot} group-hover:animate-typing-3`} />
          <circle cx="75" cy="6" r="0.8" className={`${dot} group-hover:animate-typing-2`} />
          <circle cx="78.5" cy="6" r="0.8" className={`${dot} group-hover:animate-typing-1`} />
        </g>
      </svg>

      <span className="text-2xl leading-tight font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-primary">
        Let&apos;s Talk
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-radial from-primary/12 to-transparent to-60% opacity-0 transition-opacity duration-400 group-hover:opacity-100"
      />
    </Link>
  );
}
