import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/layout";
import { Container } from "@/components/ui/layout";
import { brandStripBottom, brandStripTop, type BrandLogo } from "@/content/brands";
import { cn } from "@/lib/cn";

const logoSize: Record<NonNullable<BrandLogo["shape"]> | "default", string> = {
  default: "max-h-10.5 max-w-33 md:max-h-12.5 md:max-w-42 lg:max-h-14 lg:max-w-47.5",
  icon: "max-h-9.5 max-w-15 md:max-h-11.5 md:max-w-18.5 lg:max-h-13 lg:max-w-21.5",
  wide: "max-h-8.5 max-w-37.5 md:max-h-10.5 md:max-w-49 lg:max-h-11.5 lg:max-w-55.5",
};

/** "Brands That Believe In Us" — two infinite logo strips scrolling in opposite directions. */
export function BrandMarquee() {
  return (
    <section className="overflow-hidden border-b border-black/5 bg-white pt-20 pb-12">
      <Container>
        <Reveal className="mb-12 text-center">
          <Eyebrow>Partnerships</Eyebrow>
          <h2 className="mb-8 text-heading-md text-ink">Brands That Believe In Us</h2>
        </Reveal>
        <MarqueeRow logos={brandStripTop} />
        <MarqueeRow logos={brandStripBottom} reverse />
      </Container>
    </section>
  );
}

function MarqueeRow({ logos, reverse = false }: { logos: BrandLogo[]; reverse?: boolean }) {
  return (
    <Reveal className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4">
      {/* Two identical copies; the animation shifts by one copy (50%) for a seamless loop. */}
      <div
        className={cn(
          "flex w-max items-center gap-4 will-change-transform hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy > 0 || undefined} className="flex shrink-0 items-center gap-4">
            {logos.map((logo) => (
              <li
                key={logo.file}
                className="flex h-18 w-40 shrink-0 items-center justify-center md:h-21 md:w-52.5 lg:h-24 lg:w-60"
              >
                <Image
                  src={`/assets/brands/${logo.file}`}
                  alt={copy === 0 ? logo.name : ""}
                  width={190}
                  height={56}
                  className={cn(
                    "h-auto w-auto object-contain opacity-60 grayscale transition duration-300 hover:scale-108 hover:opacity-100 hover:grayscale-0",
                    logoSize[logo.shape ?? "default"],
                  )}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </Reveal>
  );
}
