/** Site-wide constants. Change contact details, socials or analytics IDs here only. */
export const site = {
  name: "Triyanshi Technologies",
  url: "https://triyanshitechnologies.com",
  tagline: "Innovating Your Future",
  description:
    "Triyanshi Technologies provides state-of-the-art IT solutions, delivering 250+ projects globally with 100% client satisfaction.",
  themeColor: "#121212",
  logo: "/assets/WhiteLogo.webp",
  /** Link-preview image (og:image / twitter:image): logo card, 1200×630 PNG. */
  ogImage: { url: "/og-image.png", width: 1200, height: 630, alt: "Triyanshi Technologies" },
  contact: {
    phone: "+91-9909761261",
    phoneHref: "tel:+919909761261",
    phoneLabel: "(+91)-9909761261",
    email: "coffee@triyanshitechnologies.com",
    calendly: "https://calendly.com/triyanshitechnologies",
  },
  socials: {
    linkedin: "https://in.linkedin.com/company/triyanshi-technologies",
    facebook: "https://www.facebook.com/61580070863109/",
    instagram: "https://www.instagram.com/triyanshi_technologies?igsi=MWExdmNjMG5nYThlcw==",
  },
  analytics: {
    gaId: "G-BC14P3V0GL",
    clarityId: "ulvuoivagm",
  },
  googleSiteVerification: "6T993qg_vMc1cqlLY8cWI0j1i4FErhSpAwRwB92R28M",
} as const;

/** Base URL of the external API server (contact form, leads, PageSpeed proxy). */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "https://triyanshi-technologies-server.vercel.app";
