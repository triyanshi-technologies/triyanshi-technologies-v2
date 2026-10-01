import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Container } from "@/components/ui/layout";
import { RollingNumber } from "@/components/ui/rolling-number";

const STATS = [
  { value: 250, suffix: "+", label: "Solutions Delivered" },
  { value: 15, suffix: "+", label: "Countries Served" },
  { value: 30, suffix: "+", label: "Long-Term Client Partnerships" },
  { value: 99, suffix: "%", label: "On Time Execution" },
];

/** Black stats card overlapping the bottom of the hero, with rolling counters. */
export function StatsStrip() {
  return (
    <Container className="relative">
      <RevealGroup className="relative z-10 -mt-16 grid gap-8 rounded-xl bg-black py-12 text-primary shadow-xl max-sm:-mt-6 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <RevealItem key={stat.label} className="p-4 text-center">
            <RollingNumber
              value={stat.value}
              suffix={stat.suffix}
              delay={i * 120}
              className="mb-2 flex items-end justify-center text-3xl font-bold tabular-nums"
            />
            <span className="block text-base font-medium tracking-wider uppercase opacity-90">
              {stat.label}
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    </Container>
  );
}
