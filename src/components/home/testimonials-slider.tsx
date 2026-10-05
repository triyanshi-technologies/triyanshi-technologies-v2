import Image from "next/image";
import type { Testimonial } from "@/lib/home/types";
import { cn } from "@/lib/cn";
import { MarqueeTrack } from "./marquee-track";

/** Keep in sync with TESTIMONIAL_PLATFORMS in studio/schemaTypes/home.ts. */
const PLATFORM_LOGOS = {
  shopify: { src: "/assets/platforms/shopify.svg", alt: "Shopify", width: 500, height: 143 },
  bigcommerce: { src: "/assets/platforms/bigcommerce.svg", alt: "BigCommerce", width: 490, height: 118 },
  volusion: { src: "/assets/platforms/volusion.svg", alt: "Volusion", width: 380, height: 80 },
};

/** Drift speed: a 384px card passes in about 9 seconds. */
const PX_PER_SECOND = 45;

/** Cards per copy needed to cover a wide (2400px) screen, so the loop never shows a gap. */
const MIN_CARDS = 6;

/** One full-width, draggable strip of testimonial cards drifting right (hover does not pause), with a play/pause button. */
export function TestimonialsMarquee({ testimonials }: { testimonials: Testimonial[] }) {
  const repeats = Math.ceil(MIN_CARDS / testimonials.length);
  const cards = Array.from({ length: repeats }, () => testimonials).flat();

  return (
    <MarqueeTrack pxPerSecond={PX_PER_SECOND} label="Customer testimonials">
      {/* Two identical copies; the track wraps at one copy (50%) for a seamless loop. */}
      {[0, 1].map((copy) => (
        // Trailing padding instead of a gap between copies keeps the halves exactly equal.
        <ul key={copy} aria-hidden={copy > 0 || undefined} className="flex shrink-0 gap-4 pr-4">
          {cards.map((t, i) => (
            // Repeats beyond the first pass are visual filler: hide them from screen readers.
            <li
              key={`${t.id}-${i}`}
              aria-hidden={i >= testimonials.length || undefined}
              className="flex w-80 shrink-0 sm:w-96"
            >
              <TestimonialCard testimonial={t} />
            </li>
          ))}
        </ul>
      ))}
    </MarqueeTrack>
  );
}

function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  const platform = t.platform && PLATFORM_LOGOS[t.platform];

  return (
    <article className="flex w-full flex-col rounded-2xl border border-line bg-white px-5 pt-6 pb-6 shadow-sm sm:px-6 sm:pt-7">
      {/* Who said it first: client, company and platform/badges. */}
      <div className="flex items-center gap-3.5">
        <div
          aria-hidden="true"
          style={{ background: t.avatarColor }}
          className="flex size-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white shadow-[0_6px_16px_rgb(0_0_0/0.15)]"
        >
          {t.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-ink">{t.name}</h3>
          <p className="mt-0.5 text-xs font-medium">{t.role}</p>
        </div>
        <Image
          src={t.company.logo.src}
          alt={t.company.logo.alt}
          width={120}
          height={32}
          className="ml-auto h-auto max-h-6.5 w-auto max-w-24 shrink-0 object-contain"
        />
      </div>

      {(platform || t.badges.length > 0) && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {platform && (
            <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/8 px-3.5 py-1.25">
              <Image
                src={platform.src}
                alt={platform.alt}
                width={platform.width}
                height={platform.height}
                unoptimized
                className="block h-4 w-auto"
              />
            </span>
          )}
          {t.badges.map((badge) => (
            <span
              key={badge.label}
              className={cn(
                "inline-flex items-center rounded-full border border-primary/25 bg-primary/8 px-3 py-1.25 text-xs leading-none whitespace-nowrap",
                badge.emphasis ? "font-bold text-black" : "font-semibold text-primary-text",
              )}
            >
              {badge.label}
            </span>
          ))}
        </div>
      )}
      <div className="mt-5 mb-3 flex items-center justify-between gap-4">
        <div role="img" aria-label={`${t.rating} out of 5 stars`} className="leading-none tracking-[2px]">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={cn("inline-block text-xl text-star", i >= t.rating && "opacity-25")}
            >
              ★
            </span>
          ))}
        </div>
        <svg
          viewBox="0 -0.5 17 17"
          aria-hidden="true"
          className="block size-8 -scale-y-100 fill-current text-primary"
        >
          <g transform="translate(1, 1)">
            <path d="M15,13.969 C15.552,13.969 16,13.534 16,13 C16,12.466 15.552,12.031 15,12.031 C12.243,12.031 11,10.83 11,8.124 L11,6.906 L14.441,6.906 C15.271,6.906 15.947,6.301 15.947,5.468 L15.947,1.512 C15.947,0.678 15.271,0 14.441,0 L10.506,0 C9.676,0 9,0.678 9,1.512 L9,8.124 C9,11.899 11.141,13.969 15,13.969 L15,13.969 Z" />
            <path d="M6,13.969 C6.552,13.969 7,13.534 7,13 C7,12.466 6.552,12.031 6,12.031 C3.243,12.031 2,10.83 2,8.124 L2,6.947 L5.467,6.947 C6.301,6.947 6.979,6.271 6.979,5.441 L6.979,1.505 C6.979,0.675 6.301,-0.001 5.467,-0.001 L1.512,-0.001 C0.678,-0.001 0,0.675 0,1.505 L0,8.123 C0,11.899 2.141,13.969 6,13.969 L6,13.969 Z" />
          </g>
        </svg>
      </div>

      <p className="text-sm leading-7 text-ink sm:text-base">{t.quote}</p>
    </article>
  );
}
