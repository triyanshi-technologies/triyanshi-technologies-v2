/*
 * Open roles (Careers page + /company/<slug> job pages), migrated from the
 * legacy company/*.html job pages. Add a role here to publish a new job page.
 */
export type JobSection = { title: string; paragraphs?: string[]; items?: string[] };

export type Job = {
  slug: string;
  /** Full title; `titleAccent` is the trailing part shown in orange. */
  title: string;
  titleAccent: string;
  breadcrumbLabel: string;
  intro: string;
  /** Careers page card text. */
  summary: string;
  /** "Other open roles" card text. */
  shortSummary: string;
  listingTags: string[];
  meta: { role: string; location: string; type: string; experience: string; department: string };
  applyHref: string;
  sections: JobSection[];
  seo: { title: string; description: string };
};

export const jobs: Job[] = [
  {
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    titleAccent: "Developer",
    breadcrumbLabel: "Full Stack Development",
    intro:
      "Build end-to-end web applications that power real businesses - across eCommerce, SaaS, and enterprise software.",
    summary:
      "Build end-to-end web applications for our diverse client portfolio. You'll work across React, Node.js, GraphQL, and cloud infrastructure in a fast-paced, collaborative team.",
    shortSummary:
      "Build end-to-end web applications for our diverse client portfolio across React, Node.js, GraphQL, and cloud infrastructure.",
    listingTags: ["Remote / Hybrid", "Full-time", "2-5 yrs exp"],
    meta: {
      role: "Full Stack Developer",
      location: "Remote / Hybrid",
      type: "Full-time",
      experience: "2-5 Years",
      department: "Engineering",
    },
    applyHref:
      "mailto:coffee@triyanshitechnologies.com?subject=Application%3A%20Full%20Stack%20Developer%20%E2%80%94%20Triyanshi%20Technologies",
    sections: [
      {
        title: "About the Role",
        paragraphs: [
          "We're looking for a pragmatic, product-minded Full Stack Developer to join our growing engineering team. You'll take ownership of features from design to deployment - writing clean, well-tested code and collaborating closely with designers, project managers, and client teams.",
          "This is a hands-on role with real autonomy. You'll work across our client portfolio, which includes eCommerce storefronts, SaaS MVPs, and enterprise web applications - so adaptability and curiosity are as important as technical skill.",
        ],
      },
      {
        title: "Key Responsibilities",
        items: [
          "Design, build, and maintain front-end interfaces and back-end APIs for client projects",
          "Architect and implement RESTful and GraphQL APIs, integrating third-party services and data sources",
          "Collaborate with UI/UX designers to implement pixel-precise, performant interfaces in React or Next.js",
          "Write unit, integration, and end-to-end tests to maintain high code quality across all deliverables",
          "Participate in code reviews, contribute to technical documentation, and mentor junior developers",
          "Identify and resolve performance bottlenecks, security vulnerabilities, and scalability constraints",
          "Communicate technical trade-offs clearly to both technical and non-technical stakeholders",
        ],
      },
      {
        title: "Required Skills & Experience",
        items: [
          "2-5 years of professional experience in full stack web development",
          "Strong proficiency in React or Next.js for building interactive, SSR/SSG front-end applications",
          "Solid experience with Node.js and Express (or similar back-end frameworks)",
          "Hands-on experience with GraphQL - schema design, resolvers, and Apollo or similar",
          "Proficiency in TypeScript and a strong understanding of type safety in modern JavaScript",
          "Experience with relational databases (PostgreSQL, MySQL) and document stores (MongoDB)",
          "Familiarity with cloud deployment on AWS, GCP, or Azure; Docker and containerised workflows",
          "Working knowledge of version control with Git and CI/CD pipelines (GitHub Actions, CircleCI, or similar)",
        ],
      },
      {
        title: "Nice to Have",
        items: [
          "Experience with Shopify (Hydrogen, Remix, or custom theme development)",
          "Familiarity with headless CMS platforms (Contentful, Sanity, or similar)",
          "Prior experience working in an agency or consulting environment",
        ],
      },
      {
        title: "What We Offer",
        items: [
          "Competitive salary commensurate with experience",
          "Remote-friendly setup with flexible working hours",
          "Dedicated learning budget and access to industry conferences",
          "Ownership of meaningful work - you'll see your code running in production for real businesses",
          "A collaborative, low-ego team that values craft, honesty, and continuous improvement",
        ],
      },
    ],
    seo: {
      title: "Full Stack Developer",
      description:
        "We're hiring a Full Stack Developer at Triyanshi Technologies. Work across React, Node.js, GraphQL, and cloud infrastructure on real-world client projects.",
    },
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    titleAccent: "Designer",
    breadcrumbLabel: "UI/UX Designing",
    intro:
      "Shape the way users interact with products - through research-driven design, elegant systems, and interfaces that actually work.",
    summary:
      "Create intuitive, visually compelling interfaces for web and mobile products. You'll lead UX research, design systems, and prototype flows that delight real users.",
    shortSummary:
      "Lead UX research, design systems, and visual design for web and mobile products across our client portfolio.",
    listingTags: ["Remote / Hybrid", "Full-time", "1-4 yrs exp"],
    meta: {
      role: "UI/UX Designer",
      location: "Remote / Hybrid",
      type: "Full-time",
      experience: "1-4 Years",
      department: "Design",
    },
    applyHref:
      "mailto:coffee@triyanshitechnologies.com?subject=Application%3A%20UI%2FUX%20Designer%20%E2%80%94%20Triyanshi%20Technologies",
    sections: [
      {
        title: "About the Role",
        paragraphs: [
          "We're looking for a thoughtful, systems-oriented UI/UX Designer to lead design across a diverse portfolio of digital products. You'll be central to how our clients' products look, feel, and behave - from early wireframes to polished component libraries.",
          "You'll work closely with engineers and client stakeholders, ensuring design decisions are grounded in user research and achievable within engineering constraints. Aesthetic sensibility and empathy for users are equally important here.",
        ],
      },
      {
        title: "Key Responsibilities",
        items: [
          "Lead end-to-end UX design: discovery workshops, user research, journey mapping, wireframing, and high-fidelity prototyping",
          "Create and maintain design systems and component libraries in Figma for consistent, scalable UI across products",
          "Translate complex user needs and business requirements into clear, intuitive interface solutions",
          "Conduct usability testing, synthesise findings, and iterate designs based on real user feedback",
          "Collaborate with developers during implementation to ensure design intent is preserved in the final product",
          "Define interaction patterns, animations, and micro-interactions that enhance usability without adding noise",
          "Present and defend design decisions to client stakeholders, articulating the rationale clearly",
        ],
      },
      {
        title: "Required Skills & Experience",
        items: [
          "1-4 years of professional UI/UX design experience, with a portfolio demonstrating shipped digital products",
          "Expert-level proficiency in Figma - components, auto-layout, variables, and collaborative workflows",
          "Strong understanding of user-centred design principles, information architecture, and interaction design",
          "Experience designing for both web and mobile (responsive design, iOS/Android conventions)",
          "Ability to conduct and synthesise user research - interviews, surveys, usability tests, heatmaps",
          "Solid grasp of design-to-developer handoff practices and how to write specifications engineers actually use",
          "Awareness of accessibility standards (WCAG 2.1 AA) and how to design inclusively",
        ],
      },
      {
        title: "Nice to Have",
        items: [
          "Experience designing for eCommerce platforms (Shopify, BigCommerce) or headless storefronts",
          "Working knowledge of HTML/CSS - enough to understand front-end constraints",
          "Familiarity with motion design tools (Lottie, Framer, Protopie) for advanced interaction prototyping",
        ],
      },
      {
        title: "What We Offer",
        items: [
          "Competitive salary with clear progression milestones",
          "Remote-friendly work environment with flexible hours",
          "Dedicated budget for design tools, courses, and conferences",
          "Exposure to a wide range of industries and product types - no two months look the same",
          "A team that treats design as a core business function, not an afterthought",
        ],
      },
    ],
    seo: {
      title: "UI/UX Designer",
      description:
        "We're hiring a UI/UX Designer at Triyanshi Technologies. Lead UX research, design systems, and visual design for web and mobile products across our client portfolio.",
    },
  },
  {
    slug: "business-dev-executive",
    title: "Business Development Executive",
    titleAccent: "Executive",
    breadcrumbLabel: "Business Development Executive",
    intro:
      "Identify new opportunities, build lasting client relationships, and grow a pipeline that fuels Triyanshi's next chapter.",
    summary:
      "Drive new business opportunities and grow client relationships. You'll work closely with leadership to identify markets, build pipelines, and close enterprise-level deals.",
    shortSummary:
      "Drive new business, grow client relationships, and build enterprise-level sales pipelines in a fast-growing IT company.",
    listingTags: ["Hybrid", "Full-time", "1-3 yrs exp"],
    meta: {
      role: "Business Dev. Executive",
      location: "Hybrid",
      type: "Full-time",
      experience: "1-3 Years",
      department: "Business Development",
    },
    applyHref:
      "mailto:coffee@triyanshitechnologies.com?subject=Application%3A%20Business%20Development%20Executive%20%E2%80%94%20Triyanshi%20Technologies",
    sections: [
      {
        title: "About the Role",
        paragraphs: [
          "We're looking for a driven, commercially minded Business Development Executive to help Triyanshi Technologies grow its client base. You'll be the first point of contact for many potential clients - and your ability to listen, understand their challenges, and articulate how we can help will directly shape the company's trajectory.",
          "This is a high-ownership role. You'll work closely with the leadership team on go-to-market strategy, prospect outreach, proposal development, and deal closure - in markets spanning eCommerce, SaaS, and enterprise software services.",
        ],
      },
      {
        title: "Key Responsibilities",
        items: [
          "Identify and qualify new business opportunities through outbound prospecting, referrals, and inbound lead nurturing",
          "Conduct discovery calls and needs assessments to deeply understand client challenges and match them with Triyanshi's capabilities",
          "Own the sales cycle end-to-end - from initial outreach through proposal, negotiation, and contract closure",
          "Build and maintain a healthy, well-documented pipeline in CRM; provide accurate forecasting to leadership",
          "Develop account plans for strategic clients, identifying upsell and expansion opportunities post-engagement",
          "Collaborate with the delivery team to create compelling proposals and accurate project scopes",
          "Represent Triyanshi at industry events, networking functions, and online communities",
          "Track market trends, competitor movements, and client feedback to inform our go-to-market positioning",
        ],
      },
      {
        title: "Required Skills & Experience",
        items: [
          "1-3 years of B2B sales or business development experience, ideally in technology services or digital agencies",
          "Demonstrated track record of consistently meeting or exceeding sales targets",
          "Strong written and verbal communication skills - you can write a crisp email and run an engaging discovery call",
          "Comfort working with CRM tools (HubSpot, Salesforce, or similar) and sales productivity platforms",
          "Ability to understand and explain technical concepts at a high level - you don't need to code, but you need to know what we're selling",
          "Self-motivated with strong organisational skills - this role requires disciplined pipeline management and follow-through",
          "A collaborative mindset: BD at Triyanshi is a team sport, not a lone-wolf pursuit",
        ],
      },
      {
        title: "Nice to Have",
        items: [
          "Prior experience selling eCommerce, SaaS, or software development services",
          "Existing network in retail, fintech, or enterprise software sectors",
          "Exposure to international markets, particularly North America or Europe",
        ],
      },
      {
        title: "What We Offer",
        items: [
          "Competitive base salary plus performance-linked incentives",
          "Hybrid work arrangement with in-person collaboration as needed",
          "Clear career path - from Executive to Manager as the team grows",
          "Access to a strong portfolio and client case studies that make selling easier",
          "A leadership team that's genuinely invested in your success and responsive to your feedback",
        ],
      },
    ],
    seo: {
      title: "Business Development Executive",
      description:
        "We're hiring a Business Development Executive at Triyanshi Technologies. Drive new business, grow client relationships, and build pipelines for enterprise IT engagements.",
    },
  },
];

export const getJob = (slug: string) => jobs.find((job) => job.slug === slug);

/** "Send an Open Application" (Careers page CTA). */
export const openApplicationHref =
  "mailto:coffee@triyanshitechnologies.com?subject=Open%20Application%20%E2%80%94%20Triyanshi%20Technologies";
