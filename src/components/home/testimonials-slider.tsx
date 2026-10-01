"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";
import type { Testimonial } from "@/content/testimonials";
import { cx } from "@/lib/cx";
import { iconButtonHover } from "@/lib/hover";

const AUTOPLAY_MS = 4500;
const SWIPE_PX = 50;

const PLATFORM_LOGOS = {
  shopify: { src: "/assets/platforms/shopify.svg", alt: "Shopify", width: 500, height: 143 },
  bigcommerce: { src: "/assets/platforms/bigcommerce.svg", alt: "BigCommerce", width: 490, height: 118 },
  volusion: { src: "/assets/platforms/volusion.svg", alt: "Volusion", width: 380, height: 80 },
};

/*
 * Screen corners measured on the laptop photo, as fractions of the screen box:
 * top-left, top-right, bottom-right, bottom-left. Screenshots are warped onto
 * this quad with a projective transform so they follow the photo's perspective.
 */
const SCREEN_QUAD: [number, number][] = [
  [0.0745, 0.0453],
  [1, 0],
  [0.9068, 1],
  [0, 0.8314],
];

/** Projective transform (unit square -> quad), scaled to a w×h box, as CSS matrix3d. */
function quadMatrix(w: number, h: number) {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = SCREEN_QUAD.map(([fx, fy]) => [fx * w, fy * h]) as [
    [number, number],
    [number, number],
    [number, number],
    [number, number],
  ];
  const dx1 = x1 - x2,
    dx2 = x3 - x2,
    dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2,
    dy2 = y3 - y2,
    dy3 = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / den;
  const k = (dx1 * dy3 - dx3 * dy1) / den;
  const a = x1 - x0 + g * x1,
    b = x3 - x0 + k * x3;
  const d = y1 - y0 + g * y1,
    e = y3 - y0 + k * y3;
  return `matrix3d(${a / w},${d / w},0,${g / w},${b / h},${e / h},0,${k / h},0,0,1,0,${x0},${y0},0,1)`;
}

export function TestimonialsSlider({
  testimonials,
  intro,
}: {
  testimonials: Testimonial[];
  intro: React.ReactNode;
}) {
  const count = testimonials.length;
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback((delta: number) => setCurrent((i) => (i + delta + count) % count), [count]);

  /** User navigation: move and restart the autoplay countdown. */
  const navigate = (update: () => void) => {
    update();
    setTimerKey((k) => k + 1);
  };

  // Autoplay only while the section is on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!!entry?.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || count < 2) return;
    const timer = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [visible, count, go, timerKey]);

  // Perspective-warp the screenshots onto the laptop screen.
  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) return;
    const apply = () => {
      if (screen.clientWidth && screen.clientHeight)
        screen.style.setProperty("--warp", quadMatrix(screen.clientWidth, screen.clientHeight));
    };
    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(screen);
    return () => observer.disconnect();
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    const t = e.changedTouches[0];
    touchStart.current = null;
    if (!start || !t) return;
    const dx = t.clientX - start.x;
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(t.clientY - start.y))
      navigate(() => go(dx < 0 ? 1 : -1));
  };

  return (
    <div
      ref={sectionRef}
      className="mx-auto grid max-w-300 items-center gap-y-6 px-3.5 sm:px-5 lg:grid-cols-[1fr_0.95fr] lg:gap-x-11 lg:gap-y-6.5 xl:gap-x-16"
    >
      {/* Left: heading + card */}
      <div className="lg:col-start-1 lg:row-start-1">
        {intro}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
          className="relative w-full touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} active={i === current} index={i} total={count} />
          ))}
        </div>
      </div>

      {/* Right: laptop mockup */}
      <div className="relative flex flex-col lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 max-lg:hidden">
          <div className="absolute -top-[12%] -left-[8%] size-110 rounded-full border border-primary/12">
            <div className="absolute inset-8.5 rounded-full border border-primary/5 bg-primary/25" />
          </div>
          <div className="absolute -top-[8%] -right-[8%] h-27.5 w-35 bg-[radial-gradient(rgb(255_153_51/0.15)_2px,transparent_2px)] bg-size-[16px_16px]" />
        </div>

        <div className="relative z-1 w-full overflow-hidden rounded-3xl border border-line bg-white shadow-[0_20px_40px_rgb(0_0_0/0.06)]">
          <div className="relative w-full overflow-hidden">
            <Image
              src="/assets/Side-angle laptop_ blank screen.webp"
              alt="Laptop displaying client storefront"
              width={4543}
              height={3687}
              sizes="(min-width: 1024px) 560px, 100vw"
              className="block h-auto w-full select-none"
            />
            <div
              ref={screenRef}
              className="absolute top-[12.48%] left-[37.86%] h-[59.83%] w-[53.16%] overflow-hidden bg-ink-deep [clip-path:polygon(7.45%_4.53%,100%_0%,90.68%_100%,0%_83.14%)]"
            >
              {testimonials.map((t, i) => (
                <Image
                  key={t.screenshot}
                  src={t.screenshot}
                  alt={`${t.company.name} website preview`}
                  width={1904}
                  height={945}
                  sizes="(min-width: 1024px) 300px, 55vw"
                  className={cx(
                    "absolute inset-0 size-full origin-top-left [transform:var(--warp)] object-fill object-top transition-opacity duration-500",
                    i === current ? "visible opacity-100" : "invisible opacity-0",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4.5 lg:col-start-1 lg:row-start-2">
        <ArrowButton label="Previous testimonial" onClick={() => navigate(() => go(-1))} direction="prev" />
        <div className="flex items-center justify-center gap-2.5">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current || undefined}
              onClick={() => navigate(() => setCurrent(i))}
              className="inline-flex size-6 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span
                className={cx(
                  "size-2.75 rounded-full transition-[background-color,scale] duration-300",
                  i === current ? "scale-135 bg-primary" : "bg-line",
                )}
              />
            </button>
          ))}
        </div>
        <ArrowButton label="Next testimonial" onClick={() => navigate(() => go(1))} direction="next" />
      </div>
    </div>
  );
}

function ArrowButton({
  label,
  onClick,
  direction,
}: {
  label: string;
  onClick: () => void;
  direction: "prev" | "next";
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cx(
        "flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        iconButtonHover,
      )}
    >
      <ChevronDownIcon
        size={18}
        strokeWidth={2}
        className={direction === "prev" ? "rotate-90" : "-rotate-90"}
      />
    </button>
  );
}

type CardProps = { testimonial: Testimonial; active: boolean; index: number; total: number };

function TestimonialCard({ testimonial: t, active, index, total }: CardProps) {
  const platform = t.platform && PLATFORM_LOGOS[t.platform];

  return (
    <article
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}`}
      aria-hidden={!active}
      className={cx(
        "rounded-2xl border border-line bg-white px-5 pt-6 pb-5 shadow-sm sm:px-6 sm:pt-7 sm:pb-5.5 lg:px-8 lg:pt-8.5 lg:pb-7",
        active ? "block animate-card-in" : "hidden",
      )}
    >
      <svg
        viewBox="0 -0.5 17 17"
        aria-hidden="true"
        className="mb-2.5 block size-9 -scale-y-100 fill-current text-primary sm:size-8.75"
      >
        <g transform="translate(1, 1)">
          <path d="M15,13.969 C15.552,13.969 16,13.534 16,13 C16,12.466 15.552,12.031 15,12.031 C12.243,12.031 11,10.83 11,8.124 L11,6.906 L14.441,6.906 C15.271,6.906 15.947,6.301 15.947,5.468 L15.947,1.512 C15.947,0.678 15.271,0 14.441,0 L10.506,0 C9.676,0 9,0.678 9,1.512 L9,8.124 C9,11.899 11.141,13.969 15,13.969 L15,13.969 Z" />
          <path d="M6,13.969 C6.552,13.969 7,13.534 7,13 C7,12.466 6.552,12.031 6,12.031 C3.243,12.031 2,10.83 2,8.124 L2,6.947 L5.467,6.947 C6.301,6.947 6.979,6.271 6.979,5.441 L6.979,1.505 C6.979,0.675 6.301,-0.001 5.467,-0.001 L1.512,-0.001 C0.678,-0.001 0,0.675 0,1.505 L0,8.123 C0,11.899 2.141,13.969 6,13.969 L6,13.969 Z" />
        </g>
      </svg>

      <div
        role="img"
        aria-label={`${t.rating} out of 5 stars`}
        className="mb-4.5 block leading-none tracking-[2px]"
      >
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={cx("inline-block text-2xl text-star", i >= t.rating && "opacity-25")}
          >
            ★
          </span>
        ))}
      </div>

      <p className="mb-6 text-sm leading-7 text-ink sm:text-base">{t.quote}</p>

      <div className="flex items-center gap-3.5 border-t border-line pt-5">
        <div
          aria-hidden="true"
          style={{ background: t.avatarColor }}
          className="flex size-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white shadow-[0_6px_16px_rgb(0_0_0/0.15)] sm:size-14 sm:text-xl"
        >
          {t.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-ink">{t.name}</h3>
          <p className="mt-0.5 text-xs font-medium">{t.role}</p>
        </div>
        <Image
          src={t.company.logo}
          alt={t.company.name}
          width={120}
          height={32}
          className="ml-auto h-auto max-h-6.5 w-auto max-w-30 shrink-0 object-contain sm:max-h-8"
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-5 sm:gap-2.5">
        {platform && (
          <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/8 px-3.5 py-1.25 sm:px-4 sm:py-1.5">
            <Image
              src={platform.src}
              alt={platform.alt}
              width={platform.width}
              height={platform.height}
              unoptimized
              className="block h-4 w-auto sm:h-5"
            />
          </span>
        )}
        {t.badges.map((badge) => {
          const label = typeof badge === "string" ? badge : badge.label;
          return (
            <span
              key={label}
              className={cx(
                "inline-flex items-center rounded-full border border-primary/25 bg-primary/8 px-3 py-1.25 text-xs leading-none whitespace-nowrap sm:px-4 sm:py-2",
                typeof badge === "string" ? "font-semibold text-primary-text" : "font-bold text-black",
              )}
            >
              {label}
            </span>
          );
        })}
      </div>
    </article>
  );
}
