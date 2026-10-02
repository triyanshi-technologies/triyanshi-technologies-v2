/*
 * Seed data for the homepage sections in Sanity (brand logos, testimonials,
 * app partners), taken from the pre-CMS site. Used once by
 * `npm run sanity:import -- home`; after that the content lives in the Studio.
 * Image paths are files inside public/.
 */
import type { LogoShape, TestimonialPlatform } from "../../src/lib/home/types.ts";

export type BrandSeed = { name: string; logo: string; shape?: LogoShape };

export type TestimonialSeed = {
  name: string;
  role: string;
  avatarColor: string;
  rating: number;
  quote: string;
  company: { name: string; logo: string };
  screenshot: string;
  platform?: TestimonialPlatform;
  /** `emphasis` -> the Studio's "Highlighted badge" (bold black, shown first). */
  badges: (string | { label: string; emphasis: true })[];
};

export type AppPartnerSeed = { name: string; category: string; logo: string; description: string };

const brand = (file: string) => `/assets/brands/${file}`;
const shot = (file: string) => `/assets/screenshots/${file}`;
const app = (file: string) => `/assets/app-logo/${file}`;

/** Top strip — scrolls left. */
export const brandStripTop: BrandSeed[] = [
  { name: "All Dog Boots", logo: brand("all dog boots.webp") },
  { name: "Darshan Metal", logo: brand("darshan metal.webp"), shape: "icon" },
  { name: "Clean Guards", logo: brand("clean guards.webp"), shape: "wide" },
  { name: "Exotic Fragrances", logo: brand("exotic fragrances.webp"), shape: "icon" },
  { name: "Fortune Supply", logo: brand("fortune supply.webp") },
  { name: "Adorable Kids", logo: brand("adorable-kids.com.webp"), shape: "icon" },
  { name: "Glorious", logo: brand("glorious.webp"), shape: "wide" },
  { name: "Bumbo Stationeries", logo: brand("bumbokart.com.webp"), shape: "icon" },
  { name: "Indie Ella", logo: brand("indie ella.webp") },
  { name: "Coosje Bright", logo: brand("coosjebright.com.webp"), shape: "icon" },
  { name: "Dharito", logo: brand("dharito.com.webp"), shape: "wide" },
  { name: "Natural Bulk Supplies", logo: brand("natural bulk supplies.webp") },
  { name: "Bushirt", logo: brand("bushirt.in.webp"), shape: "wide" },
  { name: "Geroo Jaipur", logo: brand("geroojaipur.com.webp"), shape: "icon" },
  { name: "Don Vino", logo: brand("donvino.in.webp"), shape: "wide" },
  { name: "Emmalou's Kitchen", logo: brand("emmalouskitchen.com.webp") },
];

/** Bottom strip — scrolls right. */
export const brandStripBottom: BrandSeed[] = [
  { name: "NYS Approved Vendor", logo: brand("nys approved vendor.webp") },
  { name: "USA Light", logo: brand("usa light.webp"), shape: "wide" },
  { name: "TSD", logo: brand("tsd.webp"), shape: "icon" },
  { name: "Palette By Nature", logo: brand("palette by nature.webp") },
  { name: "Zingg", logo: brand("zingg.webp"), shape: "wide" },
  { name: "Wilson", logo: brand("wilson.webp"), shape: "icon" },
  { name: "Impress Athletix", logo: brand("impressathletix.com.webp"), shape: "wide" },
  { name: "Vitamins Kart", logo: brand("vitamins kart.webp") },
  { name: "Lemke Berlin", logo: brand("lemke.berlin.webp"), shape: "icon" },
  { name: "Pure & Sure", logo: brand("purensure.co.webp"), shape: "wide" },
  { name: "Onsite Tech Solutions", logo: brand("onsitetechsolutions.com.au.webp"), shape: "icon" },
  { name: "Myth Industries", logo: brand("myth-industries.com.webp") },
  { name: "Vaporize US", logo: brand("vaporizeus.com.webp"), shape: "wide" },
  { name: "Rebel Chola", logo: brand("rebelchola.com.webp"), shape: "icon" },
  { name: "Wellforces", logo: brand("wellforces.co.nz.webp"), shape: "wide" },
  { name: "Zen Edge", logo: brand("thezenedge.in.webp"), shape: "icon" },
];

export const testimonials: TestimonialSeed[] = [
  {
    name: "Anvesh Sharma",
    role: "Marketing Partner",
    avatarColor: "#1abc9c",
    rating: 5,
    quote:
      "Great experience working with Mr. Sagar and his team. They understand the requirements very well and help with everything Shopify & other website related issues promptly. Excellent understanding of all the website platforms.",
    company: { name: "Donvino", logo: brand("donvino.in.webp") },
    screenshot: shot("donvino.in.webp"),
    platform: "shopify",
    badges: ["Custom Development", "Product Experience"],
  },
  {
    name: "Marty",
    role: "Co-Founder",
    avatarColor: "#e0607a",
    rating: 5,
    quote:
      "I couldn't be happier with the redesign of my Volusion storefront. Timely, responsive, easy to work with, and the communication was consistently strong. The finished product is a huge upgrade. It is visually so much better, functionally better, and exactly what I needed. Did an outstanding job and I'm grateful for the care put into it.",
    company: { name: "Teacher Boutique", logo: brand("teacherboutique.com.webp") },
    screenshot: shot("teacher-boutique.webp"),
    platform: "volusion",
    badges: ["Redesign", "CRO"],
  },
  {
    name: "Phil",
    role: "Co-Founder",
    avatarColor: "#27ae60",
    rating: 5,
    quote:
      "Bhoomi J is our new go-to SEO expert. We are extremely appreciative of her expertise, responsiveness, and strong sense of urgency. She consistently goes above and beyond to provide actionable recommendations and outstanding support. Working with her has been a fantastic experience, and we highly recommend her services.",
    company: { name: "The BiomedGuys", logo: brand("thebiomedguys.com.webp") },
    screenshot: shot("thebiomedguys.com.webp"),
    platform: "bigcommerce",
    badges: ["SEO", "Performance Optimization"],
  },
  {
    name: "Dev",
    role: "Co-Founder",
    avatarColor: "#ff9933",
    rating: 5,
    quote:
      "Excellent work by the Dharito website development team! The design is clean, responsive, and exactly matches our brand vision. Communication was smooth and delivery was on time. Highly recommended.",
    company: { name: "Dharito", logo: brand("dharito.com.webp") },
    screenshot: shot("dharito.com.webp"),
    platform: "shopify",
    badges: ["New Brand Launch", "CRO"],
  },
  {
    name: "Chris",
    role: "President",
    avatarColor: "#5a7dff",
    rating: 5,
    quote:
      "I've worked with Sagar now on several projects. I am continually impressed by his work and professionalism. I will continue to use him and his company in the future and I would certainly recommend him to anyone who needs custom work done on their ecommerce site.",
    company: { name: "USA Light", logo: brand("usa light.webp") },
    screenshot: shot("usalight.com.webp"),
    platform: "shopify",
    badges: ["Migration", "Design & Development"],
  },
  {
    name: "Krizang",
    role: "Founder",
    avatarColor: "#8e44ad",
    rating: 5,
    quote: "So professional and great to work with. Goes the extra mile. So happy I found them!",
    company: { name: "Emma Lou's Kitchen", logo: brand("emmalouskitchen.com.webp") },
    screenshot: shot("emmalouskitchen.com.webp"),
    platform: "shopify",
    badges: ["Theme Development", "App Development & Integration"],
  },
  {
    name: "Nandan Bheda",
    role: "Co-Founder",
    avatarColor: "#e74c3c",
    rating: 5,
    quote:
      "Had a great experience with Triyanshi Technologies. Their team provided excellent SEO setup and clear guidance for improving our website's search visibility. They explained everything in a simple way and implemented best practices professionally.",
    company: { name: "Root Balance", logo: brand("rootbalance.hair.webp") },
    screenshot: shot("rootbalance.hair.webp"),
    badges: [{ label: "Custom", emphasis: true }, "SEO", "Search Visibility"],
  },
];

export const appPartners: AppPartnerSeed[] = [
  {
    name: "Judge.me",
    category: "Reviews",
    logo: app("Judgeme.webp"),
    description: "Collect photo and video reviews and show star ratings that build shopper trust.",
  },
  {
    name: "Razorpay",
    category: "Payments & Checkout",
    logo: app("Razorpay.webp"),
    description: "Faster checkout with pre-filled addresses and UPI or card payments, plus COD controls.",
  },
  {
    name: "Recurpay",
    category: "Subscriptions",
    logo: app("Recurpay.webp"),
    description: "Subscriptions and prepaid plans with a self-serve portal and failed-payment recovery.",
  },
  {
    name: "Reverto",
    category: "Returns & Exchanges",
    logo: app("Reverto.webp"),
    description:
      "Handle returns, exchanges and cancellations from one portal, with automated refunds and updates.",
  },
  {
    name: "Spur",
    category: "AI Chat & Helpdesk",
    logo: app("spur.webp"),
    description: "Automate Instagram and WhatsApp chats, recover carts and reply from one shared inbox.",
  },
  {
    name: "Shipturtle",
    category: "Multi-Vendor Marketplace",
    logo: app("ship turtle.webp"),
    description: "Turn your store into a multi-vendor marketplace with vendor payouts and order routing.",
  },
  {
    name: "BotSpace",
    category: "AI Chat & Helpdesk",
    logo: app("Botspace.webp"),
    description: "AI agent that answers questions and recovers carts across chat, email and WhatsApp.",
  },
  {
    name: "SelfServe",
    category: "Order Editing & Upsell",
    logo: app("SelfServe.webp"),
    description: "Let customers edit orders, fix addresses and cancel, while post-purchase upsells lift AOV.",
  },
  {
    name: "Parcelous",
    category: "Order Tracking",
    logo: app("Parcelous.webp"),
    description: "A tracking page with live shipment updates that cuts “where is my order” tickets.",
  },
  {
    name: "Parcelis",
    category: "Shipping Protection",
    logo: app("Parcelis.webp"),
    description: "Shipping protection at checkout that covers lost, damaged or stolen packages.",
  },
  {
    name: "Dynamic Pricing AI",
    category: "Pricing Optimization",
    logo: app("DynamicPricingAi.webp"),
    description: "Run price tests and demand-based AI pricing to grow your profit margins.",
  },
  {
    name: "Ai Trillion",
    category: "Loyalty, WhatsApp & Reviews",
    logo: app("AiT.webp"),
    description: "Loyalty points, reviews, WhatsApp and email marketing together in a single app.",
  },
  {
    name: "Adflipr",
    category: "Email Marketing",
    logo: app("Adflipr.webp"),
    description: "Email automations for abandoned carts, welcome series and win-back campaigns.",
  },
  {
    name: "BundleSuite",
    category: "Bundle Builder",
    logo: app("BundleSuite.webp"),
    description: "Build mix-and-match, box and volume-discount bundles without writing code.",
  },
  {
    name: "TryPoint",
    category: "AI Virtual Try-On",
    logo: app("TryPoint.webp"),
    description: "AI virtual try-on that helps fashion shoppers decide faster and cuts returns.",
  },
  {
    name: "WishlistSuite",
    category: "Wishlist",
    logo: app("WishlistSuite.webp"),
    description: "Guest wishlists, save for later, and price-drop or back-in-stock alerts.",
  },
];
