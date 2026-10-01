import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { MailIcon, PhoneIcon } from "@/components/ui/icons";
import { Badge, Highlight, Section } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import type { ReactNode } from "react";
import { cardHoverDark } from "@/lib/hover";
import { cn } from "@/lib/cn";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Triyanshi Technologies to discuss your next eCommerce, software, or digital transformation project.",
  path: "/contact-us/contact-us",
});

const MAP_SRC =
  "https://www.google.com/maps/embed/v1/place?key=AIzaSyBVizdQeh3udy11xDc5Ao2YStR2gLc-rfc&q=triyanshi&maptype=roadmap&zoom=17";

const DETAILS: { href: string; label: string; value: string; icon: ReactNode }[] = [
  {
    href: site.contact.phoneHref,
    label: "Call Us",
    value: site.contact.phoneLabel,
    icon: <PhoneIcon size={18} />,
  },
  { href: `mailto:${site.contact.email}`, label: "Email Us", value: site.contact.email, icon: <MailIcon /> },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        title={
          <>
            Contact <Highlight>Us</Highlight>
          </>
        }
        description="Whether you're ready to launch your next big eCommerce venture, integrate your systems seamlessly, or simply explore how technology can elevate your business, we're here to listen, collaborate, and innovate with you."
        descriptionClassName="max-w-175"
      />

      <Section tone="light" aria-label="Get in touch">
        <div className="grid items-stretch gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <Reveal className="flex flex-col rounded-3xl border border-white/8 bg-ink/95 p-6 tone-dark shadow-xl md:p-8 lg:p-10">
            <Badge className="mb-3 tracking-widest uppercase">Get in Touch</Badge>
            <h2 className="mb-5 text-heading-lg text-white">Let&apos;s start a conversation</h2>
            <p className="mb-4 leading-[1.8]">
              At Triyanshi Technologies, we don&apos;t just build IT solutions, we build partnerships.
            </p>
            <p className="leading-[1.8]">
              Have an idea, a challenge, or just want to say hello? We&apos;d love to hear from you.
            </p>

            <ul className="mt-8 grid gap-4">
              {DETAILS.map((detail) => (
                <li key={detail.label}>
                  <a
                    href={detail.href}
                    className={cn(
                      "flex items-center gap-4 rounded-xl border border-white/8 bg-white/6 px-4.5 py-4 text-white",
                      cardHoverDark,
                    )}
                  >
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      {detail.icon}
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="mb-0.5 text-xs font-bold tracking-[0.08em] text-muted uppercase">
                        {detail.label}
                      </span>
                      <span className="font-semibold wrap-anywhere">{detail.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={site.contact.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex flex-col items-start justify-between gap-4 rounded-xl border border-primary/28 bg-primary/12 px-4.5 py-4 text-white transition-[translate,border-color,background-color] duration-300 ease-out hover:-translate-y-1 hover:border-primary/55 hover:bg-primary/18 focus-visible:-translate-y-1 focus-visible:border-primary/55 focus-visible:bg-primary/18 md:flex-row md:items-center"
            >
              <span className="grid gap-1">
                <span className="text-[1.05rem] font-bold">Let&apos;s start a conversation</span>
                <span className="text-sm text-muted">Book a time that works for you.</span>
              </span>
              <span className="shrink-0 text-sm font-bold text-primary">
                Schedule a Call <span className="sr-only">(opens Calendly in a new tab)</span>
              </span>
            </a>

            <div className="mt-6 overflow-hidden rounded-xl border border-white/8 leading-none">
              <iframe
                src={MAP_SRC}
                title="Triyanshi Technologies on Google Maps"
                width="100%"
                height="300"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block border-0"
              />
            </div>
          </Reveal>

          <Reveal
            id="contact-form"
            className="self-start rounded-3xl border border-line bg-white p-6 shadow-xl md:p-8 lg:p-10"
          >
            <h2 className="mb-6 text-heading-md text-ink">Send Us a Message</h2>
            <ContactForm />

            {/*
              Job-seeker notice — hidden on the legacy site. To restore, render under the form:
              an amber callout (bg-warning/8, border-warning/35, rounded-lg, px-4 py-3.5, mt-6) with
              an info-circle icon (stroke warning) and the text:
              "<strong>Looking for a job?</strong> Please apply through our
               <Link href="/company/careers">Careers</Link> instead of this form."
            */}
          </Reveal>
        </div>
      </Section>
    </>
  );
}
