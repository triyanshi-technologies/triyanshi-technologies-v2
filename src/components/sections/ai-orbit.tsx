import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type OrbitNode = { label: string; icon: ReactNode };

const POSITIONS = ["top-[1%] left-1/2", "top-[35%] left-[84%]", "top-[69%] left-1/2", "top-[35%] left-[16%]"];

/**
 * Slowly rotating diagram: four labelled nodes orbit the Triyanshi mark.
 * Nodes counter-rotate so their labels stay upright. Motion stops for
 * users who prefer reduced motion.
 */
export function AiOrbit({ nodes }: { nodes: [OrbitNode, OrbitNode, OrbitNode, OrbitNode] }) {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-56 items-center justify-center sm:max-w-75 md:max-w-100">
      <div className="absolute top-[35%] left-1/2 z-3 flex size-14 -translate-1/2 items-center justify-center rounded-full border-3 border-primary bg-ink shadow-[0_0_25px_rgb(255_153_51/0.35)] sm:size-18">
        <Image
          src="/assets/favicon_v2.webp"
          alt="Triyanshi Logo"
          width={40}
          height={40}
          className="h-auto w-7.5 sm:w-10"
        />
      </div>

      <div className="absolute inset-0 z-1 origin-[50%_35%] animate-orbit-slow motion-reduce:animate-none">
        <svg
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle cx="200" cy="140" r="140" className="stroke-line" strokeWidth="2" strokeDasharray="6 6" />
        </svg>
        {nodes.map((node, i) => (
          <div
            key={node.label}
            className={cn(
              "absolute z-4 flex w-27 animate-orbit-counter items-center gap-1.5 rounded-2xl bg-white px-2.5 py-1.5 text-left text-xs leading-tight font-semibold text-ink shadow-sm transition-shadow hover:shadow-lg motion-reduce:-translate-1/2 motion-reduce:animate-none sm:w-28 sm:gap-2 md:w-34 md:px-3.5 md:py-2",
              POSITIONS[i],
            )}
          >
            <span
              aria-hidden="true"
              className="flex size-5.5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary sm:size-6.5 [&_svg]:size-3"
            >
              {node.icon}
            </span>
            <span>{node.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
