import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ServiceProjectGrid } from "@/components/projects/service-project-grid";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, Highlight, Section, SectionTitle } from "@/components/ui/layout";
import { deliveryProcess, type ServiceContent } from "@/content/services";
import { cn } from "@/lib/cn";
import { cardHover } from "@/lib/hover";
import type { Project } from "@/lib/projects/types";

const liftCard = cn("rounded-xl border border-line bg-white", cardHover);

/** "What We Deliver": copy + stat cards, with a sticky "What is included" panel. */
export function ServiceOverview({ service }: { service: ServiceContent }) {
  return (
    <Section tone="light" aria-label="Service overview">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
        <Reveal>
          <h2 className="mb-4 text-heading-lg text-ink">
            What We <Highlight>Deliver</Highlight>
          </h2>
          <p className="leading-7">{service.body}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {service.stats.map((stat) => (
              <div key={stat.label} className={`${liftCard} p-5`}>
                <strong className="block text-2xl leading-tight text-primary">{stat.value}</strong>
                <span className="mt-1.5 block text-xs leading-snug font-semibold text-body">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal
          as="aside"
          aria-label="What is included"
          className={cn(
            "rounded-xl border border-primary/22 bg-white p-8 shadow-[0_14px_44px_rgb(0_0_0/0.06)] lg:sticky lg:top-[calc(var(--spacing-nav)+2rem)]",
            cardHover,
          )}
        >
          <h2 className="mb-4 text-lg text-ink">What is included</h2>
          <ul className="grid gap-3">
            {service.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3 leading-relaxed text-body">
                <span aria-hidden="true" className="mt-[0.55em] size-2 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

/** "Tools We Use" technology chips. */
export function ServiceStack({ stack }: { stack: string[] }) {
  return (
    <Section aria-label="Tools and technologies">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)]">
        <Reveal>
          <Eyebrow>Stack</Eyebrow>
          <h2 className="mb-4 text-heading-lg text-ink">
            Tools We <Highlight>Use</Highlight>
          </h2>
          <p className="max-w-130 leading-7">
            We pick the stack around your goals, existing systems, and long-term maintainability.
          </p>
        </Reveal>
        <Reveal as="ul" className="flex flex-wrap gap-2.5">
          {stack.map((tool) => (
            <li
              key={tool}
              className="inline-flex min-h-9 items-center rounded-full border border-primary/18 bg-primary/8 px-3.5 py-1.75 text-xs font-bold text-primary"
            >
              {tool}
            </li>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

/** "How We Work" three-step process. */
export function ServiceProcess() {
  return (
    <Section tone="light" aria-label="Delivery process">
      <Reveal>
        <SectionTitle
          eyebrow="Process"
          title={
            <>
              How We <Highlight>Work</Highlight>
            </>
          }
          className="mb-0"
        />
      </Reveal>
      <RevealGroup as="ol" className="mt-8 grid gap-6 md:grid-cols-3">
        {deliveryProcess.map((step, i) => (
          <RevealItem as="li" key={step.title} className={`${liftCard} p-7`}>
            <span className="mb-4 inline-flex size-10 items-center justify-center rounded-full bg-primary font-extrabold text-white">
              {i + 1}
            </span>
            <h3 className="mb-2 text-lg text-ink">{step.title}</h3>
            <p className="text-sm leading-relaxed">{step.text}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/** "Relevant Work" project cards for the service. */
export function ServiceProjects({ projects }: { projects: Project[] }) {
  return (
    <Section id="service-projects" aria-label="Relevant projects">
      <Reveal className="mb-8">
        <Eyebrow>Projects</Eyebrow>
        <h2 className="text-heading-lg text-ink">
          Relevant <Highlight>Work</Highlight>
        </h2>
      </Reveal>
      <ServiceProjectGrid projects={projects} />
      <div className="mt-8">
        <ButtonLink href="/contact-us/contact-us" variant="outlineDark">
          Discuss Similar Work
        </ButtonLink>
      </div>
    </Section>
  );
}
