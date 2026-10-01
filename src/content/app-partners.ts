/*
 * Homepage "Our eCommerce App Partners" cards.
 * Order here = order on screen. logo: image inside public/assets/app-logo/.
 */
export type AppPartner = { name: string; category: string; logo: string; description: string };

export const appPartners: AppPartner[] = [
  {
    name: "Judge.me",
    category: "Reviews",
    logo: "Judgeme.webp",
    description: "Collect photo and video reviews and show star ratings that build shopper trust.",
  },
  {
    name: "Razorpay",
    category: "Payments & Checkout",
    logo: "Razorpay.webp",
    description: "Faster checkout with pre-filled addresses and UPI or card payments, plus COD controls.",
  },
  {
    name: "Recurpay",
    category: "Subscriptions",
    logo: "Recurpay.webp",
    description: "Subscriptions and prepaid plans with a self-serve portal and failed-payment recovery.",
  },
  {
    name: "Reverto",
    category: "Returns & Exchanges",
    logo: "Reverto.webp",
    description:
      "Handle returns, exchanges and cancellations from one portal, with automated refunds and updates.",
  },
  {
    name: "Spur",
    category: "AI Chat & Helpdesk",
    logo: "spur.webp",
    description: "Automate Instagram and WhatsApp chats, recover carts and reply from one shared inbox.",
  },
  {
    name: "Shipturtle",
    category: "Multi-Vendor Marketplace",
    logo: "ship turtle.webp",
    description: "Turn your store into a multi-vendor marketplace with vendor payouts and order routing.",
  },
  {
    name: "BotSpace",
    category: "AI Chat & Helpdesk",
    logo: "Botspace.webp",
    description: "AI agent that answers questions and recovers carts across chat, email and WhatsApp.",
  },
  {
    name: "SelfServe",
    category: "Order Editing & Upsell",
    logo: "SelfServe.webp",
    description: "Let customers edit orders, fix addresses and cancel, while post-purchase upsells lift AOV.",
  },
  {
    name: "Parcelous",
    category: "Order Tracking",
    logo: "Parcelous.webp",
    description: "A tracking page with live shipment updates that cuts “where is my order” tickets.",
  },
  {
    name: "Parcelis",
    category: "Shipping Protection",
    logo: "Parcelis.webp",
    description: "Shipping protection at checkout that covers lost, damaged or stolen packages.",
  },
  {
    name: "Dynamic Pricing AI",
    category: "Pricing Optimization",
    logo: "DynamicPricingAi.webp",
    description: "Run price tests and demand-based AI pricing to grow your profit margins.",
  },
  {
    name: "Ai Trillion",
    category: "Loyalty, WhatsApp & Reviews",
    logo: "AiT.webp",
    description: "Loyalty points, reviews, WhatsApp and email marketing together in a single app.",
  },
  {
    name: "Adflipr",
    category: "Email Marketing",
    logo: "Adflipr.webp",
    description: "Email automations for abandoned carts, welcome series and win-back campaigns.",
  },
  {
    name: "BundleSuite",
    category: "Bundle Builder",
    logo: "BundleSuite.webp",
    description: "Build mix-and-match, box and volume-discount bundles without writing code.",
  },
  {
    name: "TryPoint",
    category: "AI Virtual Try-On",
    logo: "TryPoint.webp",
    description: "AI virtual try-on that helps fashion shoppers decide faster and cuts returns.",
  },
  {
    name: "WishlistSuite",
    category: "Wishlist",
    logo: "WishlistSuite.webp",
    description: "Guest wishlists, save for later, and price-drop or back-in-stock alerts.",
  },
];
