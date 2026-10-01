/*
 * Technology pages (/technologies/[slug]) and the technologies overview,
 * migrated from the legacy technologies/*.html pages. The Technologies menu is
 * hidden in the navigation (legacy), but the pages stay live.
 *
 * title: ordered segments; `accent` segments render in orange.
 */
export type TitleSegment = { text: string; accent?: boolean };

export type Technology = {
  slug: string;
  title: TitleSegment[];
  badge: string;
  intro: string;
  expertiseTitle: string;
  expertise: string[];
  ctaBox: { title: string; text: string };
  ctaText: string;
  /** Overview page card. */
  card: { badge: string; title: string; desc: string };
  seo: { title: string; description: string };
};

export const technologies: Technology[] = [
  {
    slug: "react-nextjs",
    title: [
      {
        text: "React",
      },
      {
        text: " & Next.js",
        accent: true,
      },
    ],
    badge: "35+ Projects Completed",
    intro:
      "Blazing-fast, SEO-friendly web apps with server-side rendering, static generation, and React Server Components.",
    expertiseTitle: "Our React & Next.js Expertise",
    expertise: [
      "Server-Side Rendering (SSR)",
      "Static Site Generation (SSG)",
      "React Server Components",
      "Next.js App Router",
      "Incremental Static Regeneration (ISR)",
      "API Routes & Middleware",
    ],
    ctaBox: {
      title: "Need a React & Next.js project?",
      text: "Talk to our team about your requirements. We'll scope, plan, and deliver.",
    },
    ctaText: "Book a discovery call. We'll show you what's possible with the right tech stack.",
    card: {
      badge: "35+ Projects",
      title: "React & Next.js",
      desc: "Blazing-fast, SEO-friendly web apps with server-side rendering, static generation, and React Server Components.",
    },
    seo: {
      title: "React & Next.js Development",
      description:
        "Expert React & Next.js development for headless commerce, SaaS, and web applications. SSR, SSG, App Router, React Server Components. 35+ projects.",
    },
  },
  {
    slug: "nodejs",
    title: [
      {
        text: "Node",
        accent: true,
      },
      {
        text: ".js",
      },
    ],
    badge: "50+ Projects Completed",
    intro:
      "Scalable backend services, REST & GraphQL APIs, microservices, and real-time applications built for performance.",
    expertiseTitle: "Our Node.js Expertise",
    expertise: [
      "Express & Fastify Frameworks",
      "GraphQL with Apollo Server",
      "Microservices Architecture",
      "WebSocket & Real-Time Apps",
      "Queue Systems (Bull, RabbitMQ)",
      "Serverless Functions",
    ],
    ctaBox: {
      title: "Need a Node.js project?",
      text: "Talk to our team about your requirements. We'll scope, plan, and deliver.",
    },
    ctaText: "Book a discovery call. We'll show you what's possible with the right tech stack.",
    card: {
      badge: "50+ Projects",
      title: "Node.js",
      desc: "Scalable backend services, REST & GraphQL APIs, microservices, and real-time applications built for performance.",
    },
    seo: {
      title: "Node.js Development",
      description:
        "Scalable Node.js backend development. REST & GraphQL APIs, microservices, real-time applications. 50+ projects delivered.",
    },
  },
  {
    slug: "hydrogen-remix",
    title: [
      {
        text: "Hydrogen",
      },
      {
        text: " & Remix",
        accent: true,
      },
    ],
    badge: "15+ Projects Completed",
    intro:
      "Shopify's Hydrogen and Remix for custom storefronts with streaming SSR and edge deployment for maximum speed.",
    expertiseTitle: "Our Hydrogen & Remix Expertise",
    expertise: [
      "Custom Hydrogen Storefront Builds",
      "Remix Routing & Loaders",
      "Streaming SSR & Suspense",
      "Edge Deployment (Cloudflare Workers)",
      "Storefront API Integration",
      "Custom Checkout Experiences",
    ],
    ctaBox: {
      title: "Need a Hydrogen & Remix project?",
      text: "Talk to our team about your requirements. We'll scope, plan, and deliver.",
    },
    ctaText: "Book a discovery call. We'll show you what's possible with the right tech stack.",
    card: {
      badge: "15+ Projects",
      title: "Hydrogen & Remix",
      desc: "Shopify's Hydrogen and Remix for custom storefronts with streaming SSR and edge deployment for maximum speed.",
    },
    seo: {
      title: "Shopify Hydrogen & Remix Development",
      description:
        "Custom Shopify storefronts with Hydrogen & Remix. Streaming SSR, edge deployment, custom checkout. 15+ projects delivered.",
    },
  },
  {
    slug: "graphql",
    title: [
      {
        text: "Graph",
        accent: true,
      },
      {
        text: "QL",
      },
    ],
    badge: "40+ Projects Completed",
    intro:
      "GraphQL APIs that give your frontend exactly the data it needs - no over-fetching, no under-fetching, just precision.",
    expertiseTitle: "Our GraphQL Expertise",
    expertise: [
      "Schema Design & Modeling",
      "Apollo Server & Apollo Client",
      "Shopify Storefront API",
      "BigCommerce GraphQL",
      "Schema Federation",
      "Real-Time Subscriptions",
    ],
    ctaBox: {
      title: "Need a GraphQL project?",
      text: "Talk to our team about your requirements. We'll scope, plan, and deliver.",
    },
    ctaText: "Book a discovery call. We'll show you what's possible with the right tech stack.",
    card: {
      badge: "40+ Projects",
      title: "GraphQL",
      desc: "GraphQL APIs that give your frontend exactly the data it needs - no over-fetching, no under-fetching, just precision.",
    },
    seo: {
      title: "GraphQL API Development",
      description:
        "Custom GraphQL API design for headless commerce and complex data requirements. Apollo Server/Client, schema design, federation. 40+ projects.",
    },
  },
  {
    slug: "ai-ml",
    title: [
      {
        text: "AI",
      },
      {
        text: " & Machine Learning",
        accent: true,
      },
    ],
    badge: "20+ Projects Completed",
    intro:
      "Practical AI for measurable outcomes - recommendations, intelligent search, dynamic pricing, and content automation.",
    expertiseTitle: "Our AI & ML Expertise",
    expertise: [
      "OpenAI & Claude API Integration",
      "Recommendation Engines",
      "Natural Language Processing (NLP)",
      "Computer Vision",
      "Predictive Analytics",
      "LangChain & RAG Pipelines",
    ],
    ctaBox: {
      title: "Need an AI & ML project?",
      text: "Talk to our team about your requirements. We'll scope, plan, and deliver.",
    },
    ctaText: "Book a discovery call. We'll show you where AI can move the needle for your business.",
    card: {
      badge: "20+ Projects",
      title: "AI & Machine Learning",
      desc: "Practical AI for measurable outcomes - recommendations, intelligent search, dynamic pricing, and content automation.",
    },
    seo: {
      title: "AI & Machine Learning Development",
      description:
        "Practical AI & ML integration for measurable outcomes. Product recommendations, intelligent search, dynamic pricing, LangChain & RAG. 20+ projects.",
    },
  },
  {
    slug: "typescript",
    title: [
      {
        text: "Type",
        accent: true,
      },
      {
        text: "Script",
      },
    ],
    badge: "100+ Projects Completed",
    intro:
      "Type-safe JavaScript for large-scale, reliable, maintainable applications across our entire frontend and backend stack.",
    expertiseTitle: "Our TypeScript Expertise",
    expertise: [
      "Strict Types & Advanced Generics",
      "Utility Types & Type Guards",
      "API Contract Typing",
      "Zod Runtime Validation",
      "Prisma ORM & Database Types",
      "Type-Safe Testing",
    ],
    ctaBox: {
      title: "Need a TypeScript project?",
      text: "Talk to our team about your requirements. We'll scope, plan, and deliver.",
    },
    ctaText: "Book a discovery call. We'll show you what's possible with the right tech stack.",
    card: {
      badge: "100+ Projects",
      title: "TypeScript",
      desc: "Type-safe JavaScript for large-scale, reliable, maintainable applications across our entire frontend and backend stack.",
    },
    seo: {
      title: "TypeScript Development",
      description:
        "Enterprise TypeScript development for web applications, APIs, and eCommerce platforms. Strict types, generics, Zod, Prisma ORM. 100+ projects.",
    },
  },
];

export const getTechnology = (slug: string) => technologies.find((t) => t.slug === slug);

export const technologiesHubSeo = {
  title: "Technologies: React, Next.js, Node.js & AI",
  description:
    "Our tech stack: React, Next.js, Node.js, Hydrogen, GraphQL, TypeScript, AI/ML. Quality code. Modern architecture. Proven results.",
};
