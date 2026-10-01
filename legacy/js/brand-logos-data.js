(function () {
  "use strict";

  /*
   * Brand logo marquee data for the homepage "Brands That Believe In Us" strip.
   * Edit this file to change which logos appear, in what order, and in which
   * of the two scrolling strips - no HTML editing needed.
   *
   * file: filename inside assets/brands/
   * strip: 1 = top strip (scrolls left), 2 = bottom strip (scrolls right).
   *   Set to null to keep a logo out of the marquee entirely.
   * position: order within its strip (1 = shown first). Only matters when
   *   "strip" is set; ignored otherwise.
   * compact: true for square/icon-shaped marks (no wordmark padding) that
   *   would otherwise get stretched to the full row height and look
   *   oversized next to the wide wordmark logos - renders them a bit smaller.
   * wide: true for very long wordmarks - renders them wider but shorter.
   */
  var LOGOS = [
    {
      name: "All Dog Boots",
      file: "all dog boots.webp",
      strip: 1,
      position: 1,
    },
    {
      name: "Darshan Metal",
      file: "darshan metal.webp",
      strip: 1,
      position: 2,
      compact: true,
    },
    {
      name: "Clean Guards",
      file: "clean guards.webp",
      strip: 1,
      position: 3,
      wide: true,
    },
    {
      name: "Exotic Fragrances",
      file: "exotic fragrances.webp",
      strip: 1,
      position: 4,
      compact: true,
    },
    {
      name: "Fortune Supply",
      file: "fortune supply.webp",
      strip: 1,
      position: 5,
    },
    {
      name: "Adorable Kids",
      file: "adorable-kids.com.webp",
      strip: 1,
      position: 6,
      compact: true,
    },
    {
      name: "Glorious",
      file: "glorious.webp",
      strip: 1,
      position: 7,
      wide: true,
    },
    {
      name: "Bumbo Stationeries",
      file: "bumbokart.com.webp",
      strip: 1,
      position: 8,
      compact: true,
    },
    { name: "Indie Ella", file: "indie ella.webp", strip: 1, position: 9 },
    {
      name: "Coosje Bright",
      file: "coosjebright.com.webp",
      strip: 1,
      position: 10,
      compact: true,
    },
    {
      name: "Dharito",
      file: "dharito.com.webp",
      strip: 1,
      position: 11,
      wide: true,
    },
    {
      name: "Natural Bulk Supplies",
      file: "natural bulk supplies.webp",
      strip: 1,
      position: 12,
    },
    {
      name: "Bushirt",
      file: "bushirt.in.webp",
      strip: 1,
      position: 13,
      wide: true,
    },
    {
      name: "Geroo Jaipur",
      file: "geroojaipur.com.webp",
      strip: 1,
      position: 14,
      compact: true,
    },
    {
      name: "Don Vino",
      file: "donvino.in.webp",
      strip: 1,
      position: 15,
      wide: true,
    },
    {
      name: "Emmalou's Kitchen",
      file: "emmalouskitchen.com.webp",
      strip: 1,
      position: 16,
    },

    {
      name: "NYS Approved Vendor",
      file: "nys approved vendor.webp",
      strip: 2,
      position: 1,
    },
    {
      name: "USA Light",
      file: "usa light.webp",
      strip: 2,
      position: 2,
      wide: true,
    },
    { name: "TSD", file: "tsd.webp", strip: 2, position: 3, compact: true },
    {
      name: "Palette By Nature",
      file: "palette by nature.webp",
      strip: 2,
      position: 4,
    },
    { name: "Zingg", file: "zingg.webp", strip: 2, position: 5, wide: true },
    {
      name: "Wilson",
      file: "wilson.webp",
      strip: 2,
      position: 6,
      compact: true,
    },
    {
      name: "Impress Athletix",
      file: "impressathletix.com.webp",
      strip: 2,
      position: 7,
      wide: true,
    },
    {
      name: "Vitamins Kart",
      file: "vitamins kart.webp",
      strip: 2,
      position: 8,
    },
    {
      name: "Lemke Berlin",
      file: "lemke.berlin.webp",
      strip: 2,
      position: 9,
      compact: true,
    },
    {
      name: "Pure & Sure",
      file: "purensure.co.webp",
      strip: 2,
      position: 10,
      wide: true,
    },
    {
      name: "Onsite Tech Solutions",
      file: "onsitetechsolutions.com.au.webp",
      strip: 2,
      position: 11,
      compact: true,
    },
    {
      name: "Myth Industries",
      file: "myth-industries.com.webp",
      strip: 2,
      position: 12,
    },
    {
      name: "Vaporize US",
      file: "vaporizeus.com.webp",
      strip: 2,
      position: 13,
      wide: true,
    },
    {
      name: "Rebel Chola",
      file: "rebelchola.com.webp",
      strip: 2,
      position: 14,
      compact: true,
    },
    {
      name: "Wellforces",
      file: "wellforces.co.nz.webp",
      strip: 2,
      position: 15,
      wide: true,
    },
    {
      name: "Zen Edge",
      file: "thezenedge.in.webp",
      strip: 2,
      position: 16,
      compact: true,
    },
  ];

  window.BRAND_LOGOS = LOGOS;
})();
