/*
 * Homepage client testimonials (legacy "Testimonial V2" stacked slider).
 * Order here = slide order. `screenshot` is shown in the laptop mockup.
 */
export type TestimonialPlatform = "shopify" | "bigcommerce" | "volusion";

export type Testimonial = {
  name: string;
  role: string;
  /** Avatar circle colour (initial is taken from the name). */
  avatarColor: string;
  rating: number;
  quote: string;
  company: { name: string; logo: string };
  screenshot: string;
  platform?: TestimonialPlatform;
  /** `emphasis` renders the badge in bold black (legacy "Custom" badge). */
  badges: (string | { label: string; emphasis: true })[];
};

const brand = (file: string) => `/assets/brands/${file}`;
const shot = (file: string) => `/project-images/full website/${file}`;

export const testimonials: Testimonial[] = [
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
    screenshot: shot("Teacher Boutique.webp"),
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

/*
 * Legacy "What Our Clients Say" testimonial (old single-quote section,
 * commented out on the legacy homepage — see app/page.tsx):
 *
 * { quote: "Triyanshi Technologies completely transformed our digital presence. Their attention to
 *   detail and modern design approach helped us increase user retention by 40%.", role: "CTO, Finova Corp" }
 */
