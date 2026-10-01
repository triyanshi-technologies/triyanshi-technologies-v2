import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Badge, Section } from "@/components/ui/layout";
import { cardHoverDark } from "@/lib/hover";

const icon = {
  width: 28,
  height: 28,
  viewBox: "0 0 32 32",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const FEATURES: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: "Business First",
    text: "Every solution starts with your business goals, not just technology.",
    icon: (
      <svg {...icon}>
        <circle cx="16" cy="16" r="9.25" />
        <circle cx="16" cy="16" r="4.2" />
        <path d="m22.25 9.75 4.5-4.5" />
        <path d="m24.2 5.25 2.55 0 0 2.55" />
      </svg>
    ),
  },
  {
    title: "Built to Scale",
    text: "Modern architecture designed for growth, performance, and flexibility.",
    icon: (
      <svg {...icon}>
        <path d="m16 5 10 5.5-10 5.5L6 10.5 16 5Z" />
        <path d="m6 15.75 10 5.5 10-5.5" />
        <path d="m6 21 10 5.5 10-5.5" />
      </svg>
    ),
  },
  {
    title: "Long-Term Partnership",
    text: "From strategy to continuous improvement, we're invested in your success.",
    icon: (
      <svg {...icon}>
        <circle cx="10.5" cy="12" r="3.25" />
        <circle cx="21.5" cy="12" r="3.25" />
        <circle cx="16" cy="10" r="3.25" />
        <path d="M5.5 24c.75-3.05 2.95-4.85 5.45-4.85" />
        <path d="M21.05 19.15c2.5 0 4.7 1.8 5.45 4.85" />
        <path d="M10.4 24.2c.95-3.2 3.1-5.2 5.6-5.2s4.65 2 5.6 5.2" />
      </svg>
    ),
  },
];

const tile = "relative overflow-hidden rounded-2xl";
const darkSurface = "bg-ink-deep bg-linear-to-b from-white/2 to-transparent";

/** "Who We Are" bento grid: intro tile with stat card, tall image, three feature tiles. */
export function AboutBento() {
  return (
    <Section id="about" tone="light">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1.2fr] xl:grid-rows-[minmax(360px,auto)_auto]">
        {/* Intro tile */}
        <Reveal
          className={`${tile} flex flex-col justify-center border border-primary/16 bg-ink-deep p-11 tone-dark shadow-[0_20px_50px_rgb(0_0_0/0.18)] max-sm:p-8 sm:col-span-2 xl:col-span-3`}
        >
          {/* Warm glow, arc and dotted texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-radial-[circle_at_left_bottom] from-primary/14 to-transparent to-42%"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[12%] -bottom-[30%] left-[32%] h-65 rounded-[50%] border-t border-primary/20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(255_153_51/0.08)_1px,transparent_1px)] [mask-image:linear-gradient(to_left,transparent_25%,rgb(0_0_0/0.9)_80%)] bg-size-[10px_10px] opacity-35"
          />

          <div className="relative z-1 grid gap-6 xl:grid-cols-[minmax(0,1.72fr)_18.25rem] xl:items-stretch xl:gap-6.5">
            <div className="flex flex-col justify-center gap-5.5">
              <Badge className="mb-0 tracking-widest uppercase">Who We Are</Badge>
              <h2 className="text-heading-md font-extrabold text-white">
                Technology Built <br />
                Around <em className="text-primary not-italic">Your Business</em>
              </h2>
              <p className="max-w-140 text-base leading-7 max-sm:max-w-none">
                We partner with ambitious businesses to solve complex challenges through commerce, enterprise
                software, AI, and compliance. Combining strategy with engineering excellence, we build
                scalable technology that drives growth, improves efficiency, and creates lasting value.
              </p>
              <ButtonLink
                href="/contact-us/contact-us"
                variant="solid"
                size="lg"
                className="self-start max-sm:w-full max-sm:justify-between"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6" />
                  <path d="M23 11h-6" />
                </svg>
                <span>Talk to Our Team</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="ml-0.5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </ButtonLink>
            </div>

            <StatCard />
          </div>
        </Reveal>

        {/* Tall image tile */}
        <Reveal
          className={`${tile} group min-h-80 max-sm:aspect-[1023/1537] max-sm:min-h-65 sm:col-start-2 sm:row-span-3 sm:row-start-2 sm:min-h-85 xl:col-start-4 xl:row-span-2 xl:row-start-1`}
        >
          <Image
            src="/assets/innovation-image-1.webp"
            alt="Triyanshi Technologies project showcase"
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-104"
          />
        </Reveal>

        {/* Feature tiles */}
        {FEATURES.map((feature) => (
          <Reveal
            key={feature.title}
            className={`${tile} ${darkSurface} flex min-h-66.5 flex-col gap-3 border border-primary/14 px-6 pt-7 pb-7 tone-dark shadow-[0_16px_36px_rgb(0_0_0/0.12)] ${cardHoverDark} sm:col-start-1 xl:col-start-auto`}
          >
            <div
              aria-hidden="true"
              className="flex size-17 shrink-0 items-center justify-center rounded-full border border-primary/18 bg-primary/8 bg-radial-[circle_at_30%_30%] from-primary/20 via-primary/5 via-58% to-transparent text-primary"
            >
              {feature.icon}
            </div>
            <h3 className="text-base leading-snug text-white">{feature.title}</h3>
            <span aria-hidden="true" className="h-0.5 w-9.5 bg-primary" />
            <p className="text-sm leading-6 text-white/78">{feature.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function StatCard() {
  return (
    <Reveal
      className={`${darkSurface} relative flex min-h-full w-full flex-col justify-end gap-1.5 overflow-hidden rounded-2xl border border-primary/18 px-6 pt-34 pb-6.5 shadow-[0_20px_50px_rgb(0_0_0/0.18)] max-sm:min-h-0 max-sm:pt-14 max-sm:pr-4.5 max-sm:pb-5 max-sm:pl-7 xl:w-[min(100%,18.25rem)] xl:justify-self-end xl:pt-7.5`}
    >
      {/* Decorative growth-chart medallion */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[30%] left-1/2 size-34.5 -translate-x-1/2 text-primary/86 opacity-96 select-none max-sm:top-[23%] max-sm:ml-6.25 max-sm:size-22 max-sm:translate-x-0 xl:top-4"
      >
        <svg viewBox="0 0 64 64" fill="none" className="size-full">
          <circle
            cx="32"
            cy="32"
            r="24.8"
            stroke="rgb(255 255 255 / 0.14)"
            strokeWidth="1.1"
            strokeDasharray="2.1 3.2"
          />
          <g transform="translate(32 32) scale(0.45) translate(-32.5 -31)" fill="currentColor">
            <path d="M63.0000496,58.0088005H3.8378508c-0.4902,0-0.9677-0.1943016-1.3125-0.5331993 c-0.3447001-0.3389015-0.5341001-0.7871017-0.5341001-1.2647018V5c0-0.5478001-0.4434-0.9912-0.9912-0.9912 c-0.5479,0-0.9913,0.4433999-0.9913,0.9912v51.2108994c0,1.0137024,0.4004,1.964901,1.127,2.6777992 c0.7207,0.7109032,1.6807001,1.1025009,2.7021,1.1025009h59.1621971c0.5477982,0,0.9911995-0.4432983,0.9911995-0.9911995 C63.9912491,58.4522018,63.5478477,58.0088005,63.0000496,58.0088005z" />
            <path d="M10.0000505,49.0116997c0.2656002,0,0.5312004-0.1044998,0.7293997-0.3105011L25.77635,33.0401001L36.47855,42.3623009 c0.2352982,0.205101,0.5565987,0.2880974,0.8592987,0.2294998c0.3067017-0.0596008,0.5684013-0.2588005,0.7089996-0.5381012 l12.0554008-24.0026989l1.2453995,5.5368996c0.1133118,0.5009995,0.5576019,0.8418007,1.0508003,0.8418007 c0.0781021,0,0.1581993-0.0088005,0.2373009-0.0264015c0.5810013-0.1308002,0.9453011-0.7080002,0.8153992-1.2880993l-1.7998009-8 c-0.0692978-0.3076-0.2705002-0.5692997-0.5487976-0.7167997C50.8222504,14.25,50.4921494,14.2314997,50.201149,14.3506002 l-8.2001915,3.2617006c-0.5527077,0.2196999-0.8232079,0.8466988-0.6025085,1.3993988 c0.2206993,0.5536995,0.847599,0.825201,1.3994026,0.6026001l5.316597-2.1145L36.8242493,39.9804993l-10.446291-9.0986996 c-0.4043083-0.3544006-1.0186081-0.3270988-1.3936081,0.0615997L9.2705507,47.2988014 c-0.3867998,0.4034004-0.3740997,1.0439987,0.0283003,1.4306984C9.4951506,48.9179993,9.7480507,49.0116997,10.0000505,49.0116997z" />
          </g>
        </svg>
      </span>

      <span className="relative z-1 block text-heading-xl leading-none font-extrabold text-cyan">250+</span>
      <span className="relative z-1 block text-sm leading-snug font-bold text-white">Projects Delivered</span>
      <span aria-hidden="true" className="relative z-1 mt-3.5 mb-3 h-px w-full bg-white/14">
        <span className="absolute top-1/2 left-0 h-0.5 w-10.5 -translate-y-1/2 bg-primary" />
      </span>
      <p className="relative z-1 text-sm leading-[1.7] text-white/72 max-sm:max-w-72">
        Delivering impact. Driving growth. Building long-term partnerships.
      </p>
    </Reveal>
  );
}
