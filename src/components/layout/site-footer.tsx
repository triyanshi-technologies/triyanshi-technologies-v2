import Image from "next/image";
import Link from "next/link";
import {
  CalendarIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
} from "@/components/ui/icons";
import { footerNav } from "@/content/navigation";
import { site } from "@/lib/site";
import { FooterColumn } from "./footer-column";

const linkClass = "text-muted transition-colors duration-150 hover:text-primary";

const socials = [
  { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedInIcon },
  { label: "Facebook", href: site.socials.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: site.socials.instagram, Icon: InstagramIcon },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-primary/45 bg-ink pt-12 pb-2 tone-dark">
      <div className="mx-auto w-full max-w-site px-4 lg:max-w-full lg:px-12">
        <div className="grid grid-cols-1 md:mb-12 md:grid-cols-3 md:gap-x-8 md:gap-y-10 lg:grid-cols-[2fr_1fr_1fr_1fr_1.5fr] lg:gap-12">
          {/* Brand */}
          <div className="border-b border-white/8 pb-6 md:border-0 md:pb-0">
            <Link href="/" className="mb-6 flex items-center" aria-label={`${site.name} Home`}>
              <Image
                src={site.logo}
                alt="Triyanshi Logo"
                width={150}
                height={40}
                className="h-12 w-auto max-w-37.5 object-contain"
              />
            </Link>
            <p className="mb-4">
              Innovating the future with scalable, human-centric IT solutions. Building software that matters.
            </p>
            <div className="mt-6 flex gap-4">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition duration-300 hover:-translate-y-0.75 hover:bg-primary"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {footerNav.map((column) => (
            <FooterColumn key={column.id} title={column.title}>
              {column.links.map((link) => (
                <Link key={link.href + link.label} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}
            </FooterColumn>
          ))}

          <FooterColumn title="Contact Us">
            <a href={site.contact.phoneHref} className={`${linkClass} flex items-center gap-2`}>
              <PhoneIcon />
              {site.contact.phoneLabel}
            </a>
            <a href={`mailto:${site.contact.email}`} className={`${linkClass} flex items-center gap-2`}>
              <MailIcon />
              {site.contact.email}
            </a>
            <a
              href={site.contact.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} flex items-center gap-2`}
            >
              <CalendarIcon />
              Schedule a Call
            </a>
          </FooterColumn>
        </div>

        <div className="border-t border-white/10 pt-4 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
