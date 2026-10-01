import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Eyebrow, Highlight, Section } from "@/components/ui/layout";

const icon = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "size-full",
} as const;

type Founder = {
  name: string;
  role: string;
  photo: string;
  linkedin: string;
  skills: { label: string; icon: ReactNode }[];
  bio: string;
};

const FOUNDERS: Founder[] = [
  {
    name: "Sagar Virani",
    role: "Co-Founder",
    photo: "/assets/co-founders/SAGAR_VIRANI.webp",
    linkedin: "https://in.linkedin.com/in/sagar-virani-2ab29b7",
    skills: [
      {
        label: "Business Strategy",
        icon: (
          <svg {...icon}>
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="3" />
            <path d="m16.7 7.3 3-3" />
            <path d="M18.8 4.3h.9v.9" />
          </svg>
        ),
      },
      {
        label: "Commerce & Growth",
        icon: (
          <svg {...icon}>
            <circle cx="9" cy="20" r="1.25" />
            <circle cx="18" cy="20" r="1.25" />
            <path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h9.8a1 1 0 0 0 1-.76L21 8H7" />
          </svg>
        ),
      },
      {
        label: "Client Success",
        icon: (
          <svg {...icon}>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      },
    ],
    bio: "Leads business strategy, client partnerships, and digital commerce initiatives, helping organizations accelerate growth through technology and long term strategic planning.",
  },
  {
    name: "Bhoomi Joshi",
    role: "Co-Founder",
    photo: "/assets/co-founders/BHOOMI_JOSHI.webp",
    linkedin: "https://in.linkedin.com/in/bhoomi-shukla",
    skills: [
      {
        label: "Technology & Architecture",
        icon: (
          <svg {...icon}>
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        ),
      },
      {
        label: "AI Solutions",
        icon: (
          <svg {...icon}>
            <rect x="7" y="7" width="10" height="10" rx="2" />
            <path d="M10 10h4v4h-4z" />
            <path d="M10 2v3M14 2v3M10 19v3M14 19v3" />
            <path d="M2 10h3M2 14h3M19 10h3M19 14h3" />
          </svg>
        ),
      },
      {
        label: "Product Engineering",
        icon: (
          <svg {...icon}>
            <path d="m12 3 7 4-7 4-7-4 7-4Z" />
            <path d="m5 12 7 4 7-4" />
            <path d="m5 17 7 4 7-4" />
          </svg>
        ),
      },
    ],
    bio: "Leads engineering, enterprise software architecture, and AI initiatives, delivering scalable, future ready technology solutions that solve complex business challenges.",
  },
];

/** "The People Behind Triyanshi" — co-founder cards. */
export function TeamSection() {
  return (
    <Section id="team" aria-labelledby="team-heading">
      <Reveal className="mb-11 text-center">
        <Eyebrow>The People Behind Triyanshi</Eyebrow>
        <h2 id="team-heading" className="mb-4 text-heading-lg">
          Partnerships Built on <Highlight>Trust</Highlight>
        </h2>
        <p className="mx-auto mt-4 max-w-224 text-base leading-7">
          Every successful technology partnership starts with the right people. As founders, we stay actively
          involved in every engagement, combining business strategy, engineering expertise, and hands on
          collaboration to deliver measurable outcomes.
        </p>
        <span aria-hidden="true" className="mx-auto mt-5.5 block h-0.5 w-18 rounded-full bg-primary" />
      </Reveal>

      <RevealGroup
        as="ul"
        aria-label="Co-founders"
        className="mx-auto grid max-w-312 gap-6 lg:grid-cols-2 lg:gap-10"
      >
        {FOUNDERS.map((founder) => (
          <RevealItem as="li" key={founder.name} className="min-w-0">
            <FounderCard founder={founder} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

function FounderCard({ founder }: { founder: Founder }) {
  return (
    <article
      className={`group relative flex h-full flex-col gap-4.5 overflow-hidden rounded-3xl border border-line bg-surface p-5.5 pb-5 shadow-[0_14px_36px_rgb(0_0_0/0.08)] transition-[border-color,box-shadow] duration-450 ${ease} hover:border-primary/28 hover:shadow-[0_18px_42px_rgb(0_0_0/0.1),0_0_0_1px_rgb(255_153_51/0.08)] lg:gap-6 lg:p-7 lg:pb-6.5`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-135 from-primary/8 via-transparent via-42% to-primary/4 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100"
      />

      <a
        href={founder.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${founder.name} on LinkedIn`}
        className="absolute top-5.5 right-5.5 z-2 inline-flex size-7 text-linkedin"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-full fill-current">
          <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.54V9H7.1v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
        </svg>
      </a>

      <div className="relative grid grid-cols-1 items-start gap-4 sm:grid-cols-[8rem_minmax(0,1fr)] lg:grid-cols-[11.25rem_minmax(0,1fr)] lg:gap-6">
        <div
          className={`size-34 shrink-0 overflow-hidden rounded-full border-3 border-surface shadow-[0_0_0_3px_rgb(255_153_51/0.25)] transition-shadow duration-450 sm:size-32 ${ease} group-focus-within:shadow-[0_0_0_3px_rgb(255_153_51/0.32),0_10px_22px_rgb(255_153_51/0.14)] group-hover:shadow-[0_0_0_3px_rgb(255_153_51/0.32),0_10px_22px_rgb(255_153_51/0.14)] lg:size-44`}
        >
          <Image
            src={founder.photo}
            alt={`${founder.name}, ${founder.role}`}
            width={800}
            height={800}
            sizes="(min-width: 1024px) 176px, 136px"
            className="size-full object-cover"
          />
        </div>

        <div className="flex flex-col items-start pr-11 lg:pt-1">
          <h3 className="text-2xl leading-snug font-extrabold text-ink">{founder.name}</h3>
          <p className="mt-1 mb-3 text-sm leading-snug font-bold text-primary lg:mb-4">{founder.role}</p>
          <ul aria-label={`${founder.name} expertise`} className="flex flex-col gap-4">
            {founder.skills.map((skill) => (
              <li key={skill.label} className="flex items-center gap-3 text-base leading-normal text-body">
                <span aria-hidden="true" className="size-5.5 shrink-0 text-primary">
                  {skill.icon}
                </span>
                <span>{skill.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <span aria-hidden="true" className="relative block w-full border-t border-dashed border-ink/14" />

      <div className="relative grid grid-cols-[1.9rem_minmax(0,1fr)] items-start gap-3 lg:grid-cols-[2.35rem_minmax(0,1fr)] lg:gap-4">
        <span aria-hidden="true" className="mt-0.5 size-6 text-primary opacity-95 lg:size-8">
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-full">
            <path d="M10.4 6.4C7.8 8 6.5 10 6.5 12.6c0 2.6 1.6 4.6 4.2 4.6 2.2 0 3.8-1.6 3.8-3.8 0-2.3-1.6-3.6-3.4-3.6-.3 0-.5 0-.8.1.5-1.4 1.7-2.6 3.4-3.6l-1.5-1.9Zm8.3 0C16.1 8 14.8 10 14.8 12.6c0 2.6 1.6 4.6 4.2 4.6 2.2 0 3.8-1.6 3.8-3.8 0-2.3-1.6-3.6-3.4-3.6-.3 0-.5 0-.8.1.5-1.4 1.7-2.6 3.4-3.6l-1.5-1.9Z" />
          </svg>
        </span>
        <p className="w-full text-base leading-7">{founder.bio}</p>
      </div>
    </article>
  );
}
