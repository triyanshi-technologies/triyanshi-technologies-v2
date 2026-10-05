import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Section, SectionTitle } from "@/components/ui/layout";
import { getAppPartners } from "@/lib/home";
import { cn } from "@/lib/cn";
import { CarouselNav } from "./carousel-nav";
import { GridSpotlight } from "./grid-spotlight";

const GRID_ID = "apps-grid";

export async function AppPartners() {
  const appPartners = await getAppPartners();
  if (!appPartners.length) return null;

  return (
    <Section id="apps" tone="light" aria-labelledby="apps-heading">
      <Reveal>
        <SectionTitle
          eyebrow="Our Values Partnerships"
          title={<span id="apps-heading">Trusted Collaborations That Drive Success</span>}
          description="Apps from our trusted partners, which we recommend and integrate to help your store grow."
          className="[&_p]:text-base"
        />
      </Reveal>

      <RevealGroup
        as="ul"
        id={GRID_ID}
        className={cn(
          "-mx-4 flex snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] overflow-x-auto overscroll-x-contain px-4 [&::-webkit-scrollbar]:hidden",
          // Desktop: open grid divided by hairlines; an overlay in the section's
          // background fades the lines out towards the grid's outer edges.
          "lg:relative lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:p-0",
          "lg:after:pointer-events-none lg:after:absolute lg:after:inset-0 lg:after:content-['']",
          "lg:after:bg-[linear-gradient(to_bottom,var(--color-surface),transparent_2.5rem,transparent_calc(100%-2.5rem),var(--color-surface)),linear-gradient(to_right,var(--color-surface),transparent_2.5rem,transparent_calc(100%-2.5rem),var(--color-surface))]",
        )}
      >
        {appPartners.map((app) => (
          <RevealItem
            as="li"
            key={app.id}
            className={cn(
              "relative grid shrink-0 basis-[85%] snap-start content-start gap-4 px-6 py-8 sm:basis-[calc(100%/2.3)]",
              // Mobile carousel: a fading vertical divider between slides.
              "max-lg:before:absolute max-lg:before:inset-y-0 max-lg:before:right-0 max-lg:before:w-px max-lg:before:bg-linear-to-b max-lg:before:from-transparent max-lg:before:via-line max-lg:before:to-transparent max-lg:before:content-[''] max-lg:last:before:hidden",
              // Desktop grid: dividers between columns and rows only; they glow around the pointer.
              "lg:border-r-2 lg:border-b-2 lg:grid-spotlight lg:p-10 lg:nth-[4n]:border-r-0 lg:nth-last-[-n+4]:border-b-0",
            )}
          >
            <div className="flex min-w-0 items-center gap-3.5">
              <Image
                src={app.logo.src}
                alt=""
                width={56}
                height={56}
                className="size-14 shrink-0 rounded-lg border border-line bg-white object-cover"
                style={{ objectPosition: app.logo.position }}
              />
              <div className="flex min-w-0 flex-col">
                <h3 className="text-base leading-tight text-ink">{app.name}</h3>
                <span className="text-xs leading-snug font-semibold text-primary">{app.category}</span>
              </div>
            </div>
            <p className="text-sm leading-normal">{app.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <GridSpotlight targetId={GRID_ID} />
      <CarouselNav targetId={GRID_ID} label="apps" className="lg:hidden" />
    </Section>
  );
}
