import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Section, SectionTitle } from "@/components/ui/layout";
import { getAppPartners } from "@/lib/home";
import { cn } from "@/lib/cn";
import { cardHover } from "@/lib/hover";
import { CarouselNav } from "./carousel-nav";

const GRID_ID = "apps-grid";

/** "Our eCommerce App Partners": 4-column grid on desktop, swipeable carousel below 1024px (Sanity: Homepage → App partners). */
export async function AppPartners() {
  const appPartners = await getAppPartners();
  if (!appPartners.length) return null;

  return (
    <Section id="apps" tone="light" aria-labelledby="apps-heading">
      <Reveal>
        <SectionTitle
          eyebrow="Our Affiliates"
          title={<span id="apps-heading">Our eCommerce App Partners</span>}
          description="Apps from our trusted partners, which we recommend and integrate to help your store grow."
          className="[&_p]:text-base"
        />
      </Reveal>

      <RevealGroup
        as="ul"
        id={GRID_ID}
        className="-mx-4 -mt-3 -mb-10 flex snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] gap-4 overflow-x-auto overscroll-x-contain px-4 pt-3 pb-10 lg:grid lg:grid-cols-4 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {appPartners.map((app) => (
          <RevealItem
            as="li"
            key={app.id}
            className={cn(
              "grid min-h-50 shrink-0 basis-[85%] snap-start content-between gap-4 rounded-xl border border-line bg-white p-5 sm:basis-[calc((100%-1rem)/2.3)] lg:min-h-0",
              cardHover,
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

      <CarouselNav targetId={GRID_ID} label="apps" className="lg:hidden" />
    </Section>
  );
}
