/*
 * Homepage "Brands That Believe In Us" marquee (legacy js/brand-logos-data.js).
 * file: image inside public/assets/brands/. Order in each array = order on screen.
 * shape: "icon" for square marks (rendered smaller), "wide" for long wordmarks.
 */
export type BrandLogo = { name: string; file: string; shape?: "icon" | "wide" };

/** Top strip — scrolls left. */
export const brandStripTop: BrandLogo[] = [
  { name: "All Dog Boots", file: "all dog boots.webp" },
  { name: "Darshan Metal", file: "darshan metal.webp", shape: "icon" },
  { name: "Clean Guards", file: "clean guards.webp", shape: "wide" },
  { name: "Exotic Fragrances", file: "exotic fragrances.webp", shape: "icon" },
  { name: "Fortune Supply", file: "fortune supply.webp" },
  { name: "Adorable Kids", file: "adorable-kids.com.webp", shape: "icon" },
  { name: "Glorious", file: "glorious.webp", shape: "wide" },
  { name: "Bumbo Stationeries", file: "bumbokart.com.webp", shape: "icon" },
  { name: "Indie Ella", file: "indie ella.webp" },
  { name: "Coosje Bright", file: "coosjebright.com.webp", shape: "icon" },
  { name: "Dharito", file: "dharito.com.webp", shape: "wide" },
  { name: "Natural Bulk Supplies", file: "natural bulk supplies.webp" },
  { name: "Bushirt", file: "bushirt.in.webp", shape: "wide" },
  { name: "Geroo Jaipur", file: "geroojaipur.com.webp", shape: "icon" },
  { name: "Don Vino", file: "donvino.in.webp", shape: "wide" },
  { name: "Emmalou's Kitchen", file: "emmalouskitchen.com.webp" },
];

/** Bottom strip — scrolls right. */
export const brandStripBottom: BrandLogo[] = [
  { name: "NYS Approved Vendor", file: "nys approved vendor.webp" },
  { name: "USA Light", file: "usa light.webp", shape: "wide" },
  { name: "TSD", file: "tsd.webp", shape: "icon" },
  { name: "Palette By Nature", file: "palette by nature.webp" },
  { name: "Zingg", file: "zingg.webp", shape: "wide" },
  { name: "Wilson", file: "wilson.webp", shape: "icon" },
  { name: "Impress Athletix", file: "impressathletix.com.webp", shape: "wide" },
  { name: "Vitamins Kart", file: "vitamins kart.webp" },
  { name: "Lemke Berlin", file: "lemke.berlin.webp", shape: "icon" },
  { name: "Pure & Sure", file: "purensure.co.webp", shape: "wide" },
  { name: "Onsite Tech Solutions", file: "onsitetechsolutions.com.au.webp", shape: "icon" },
  { name: "Myth Industries", file: "myth-industries.com.webp" },
  { name: "Vaporize US", file: "vaporizeus.com.webp", shape: "wide" },
  { name: "Rebel Chola", file: "rebelchola.com.webp", shape: "icon" },
  { name: "Wellforces", file: "wellforces.co.nz.webp", shape: "wide" },
  { name: "Zen Edge", file: "thezenedge.in.webp", shape: "icon" },
];
