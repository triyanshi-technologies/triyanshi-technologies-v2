/* ============================================================
   Shared Components - injects navbar + footer into every page.
   Loaded with defer BEFORE navbar.js so elements are in the
   DOM when navbar.js binds its event listeners.
   ============================================================ */
(function () {
  "use strict";

  /* Dynamic path prefixing */
  var isSubfolder =
    location.pathname.indexOf("/about/") !== -1 ||
    location.pathname.indexOf("/contact-us/") !== -1 ||
    location.pathname.indexOf("/portfolio/") !== -1 ||
    location.pathname.indexOf("/portfolio-detail/") !== -1 ||
    location.pathname.indexOf("/technologies/") !== -1 ||
    location.pathname.indexOf("/services/") !== -1 ||
    location.pathname.indexOf("/company/") !== -1 ||
    location.pathname.indexOf("/tools/") !== -1;
  var prefix = isSubfolder ? "../" : "";

  /* Arrow SVG helpers */
  var ARR14 =
    '<svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
  var ARR12 =
    '<svg class="leaf-arrow" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
  var CHV12 =
    '<svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="6 9 12 15 18 9"/></svg>';
  var CHV14 =
    '<svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="6 9 12 15 18 9"/></svg>';

  /* Shared Navbar HTML */
  var NAV_HTML = [
    '<header class="navbar" role="banner">',
    '  <div class="container navbar-container">',
    '    <a href="/" class="nav-brand" aria-label="Triyanshi Technologies Home">',
    '      <img src="' +
    prefix +
    'assets/WhiteLogo.webp" alt="Triyanshi Technologies" class="logo" width="110" height="55" loading="eager" fetchpriority="high" decoding="async">',
    "    </a>",
    '    <nav class="nav-links" aria-label="Primary navigation">',

    /* Home */
    '      <a href="/" class="nav-link" id="nav-home">Home</a>',

    /* Company */
    '      <div class="nav-item" data-nav="company">',
    '        <button class="nav-link nav-toggle" id="nav-company-toggle" type="button"',
    '                aria-haspopup="true" aria-expanded="false" aria-controls="dd-company">',
    "          Company " + CHV12,
    "        </button>",
    '        <div class="dd-menu dd-mega" id="dd-company" role="menu" aria-label="Company" aria-hidden="true">',
    '          <div class="mega-grid">',
    '            <div class="mega-col">',
    // '              <p class="mega-heading">About Triyanshi</p>',
    '              <a href="' +
    prefix +
    'company/about-us" class="mega-item" id="nav-about-us" role="menuitem"><span>About Us</span>' +
    ARR14 +
    "</a>",
    // '              <a href="' +
    //   prefix +
    //   'company/what-we-serve" class="mega-item" id="nav-what-we-serve" role="menuitem"><span>What We Serve</span>' +
    //   ARR14 +
    //   "</a>",
    // '              <a href="' +
    //   prefix +
    //   'company/our-story" class="mega-item" id="nav-our-story" role="menuitem"><span>Our Story</span>' +
    //   ARR14 +
    //   "</a>",
    // '              <a href="' +
    //   prefix +
    //   'company/our-team" class="mega-item" id="nav-our-team" role="menuitem"><span>Our Team</span>' +
    //   ARR14 +
    //   "</a>",
    "            </div>",
    '            <!-- <div class="mega-col mega-col--bordered">',
    '              <a href="' + prefix + 'company/careers" class="mega-heading mega-heading--link" role="menuitem">Careers</a>',
    '              <a href="' +
    prefix +
    'company/full-stack-developer" class="mega-item" id="nav-fsd" role="menuitem"><span>Full Stack Development</span>' +
    ARR14 +
    "</a>",
    '              <a href="' +
    prefix +
    'company/ui-ux-designer" class="mega-item" id="nav-uxd" role="menuitem"><span>UI/UX Designing</span>' +
    ARR14 +
    "</a>",
    '              <a href="' +
    prefix +
    'company/business-dev-executive" class="mega-item" id="nav-bde" role="menuitem"><span>Business Development Executive</span>' +
    ARR14 +
    "</a>",
    "            </div> -->",
    "          </div>",
    "        </div>",
    "      </div>",

    /* Services */
    '      <div class="nav-item" data-nav="services">',
    '        <button class="nav-link nav-toggle" id="nav-services-toggle" type="button"',
    '                aria-haspopup="true" aria-expanded="false" aria-controls="dd-services">',
    "          Services " + CHV12,
    "        </button>",
    '        <div class="dd-menu dd-mega" id="dd-services" role="menu" aria-label="Services" aria-hidden="true">',
    '          <div class="mega-grid">',
    '            <div class="mega-col">',
    '              <a href="' + prefix + 'services/ecommerce" class="mega-item" id="nav-svc-ecommerce" role="menuitem"><span>eCommerce</span>' +
    ARR14 +
    "</a>",
    // '              <a href="' + prefix + 'services/shopify" class="mega-item" id="nav-svc-shopify" role="menuitem"><span>Shopify</span>' +
    //   ARR14 +
    //   "</a>",
    // '              <a href="' + prefix + 'services/bigcommerce" class="mega-item" id="nav-svc-bigcommerce" role="menuitem"><span>BigCommerce</span>' +
    //   ARR14 +
    //   "</a>",
    // '              <a href="' + prefix + 'services/volusion" class="mega-item" id="nav-svc-volusion" role="menuitem"><span>Volusion</span>' +
    //   ARR14 +
    //   "</a>",
    // '              <a href="' + prefix + 'services/webflow" class="mega-item" id="nav-svc-webflow" role="menuitem"><span>Webflow</span>' +
    //   ARR14 +
    //   "</a>",
    // '              <a href="' + prefix + 'services/enterprise-solution" class="mega-item" id="nav-svc-enterprise-solution" role="menuitem"><span>Enterprise Solution</span>' +
    //   ARR14 +
    //   "</a>",
    '              <a href="' + prefix + 'services/enterprise-solutions" class="mega-item" id="nav-svc-enterprise-solutions" role="menuitem"><span>Enterprise Solutions</span>' +
    ARR14 +
    "</a>",
    // '              <a href="' + prefix + 'services/saas-mvp-development" class="mega-item" id="nav-svc-saas-mvp-development" role="menuitem"><span>SaaS &amp; MVP Development</span>' +
    //   ARR14 +
    //   "</a>",
    // '              <a href="' + prefix + 'services/website-development" class="mega-item" id="nav-svc-website-development" role="menuitem"><span>Website Development</span>' +
    //   ARR14 +
    //   "</a>",
    // '              <a href="' + prefix + 'services/ai-automation-solutions" class="mega-item" id="nav-svc-ai-automation-solutions" role="menuitem"><span>AI &amp; Automation Solutions</span>' +
    //   ARR14 +
    //   "</a>",
    // '              <a href="' + prefix + 'services/erp-crm-development" class="mega-item" id="nav-svc-erp-crm-development" role="menuitem"><span>ERP &amp; CRM Development</span>' +
    //   ARR14 +
    //   "</a>",
    // '              <a href="' + prefix + 'services/ui-ux-product-design" class="mega-item" id="nav-svc-ui-ux-product-design" role="menuitem"><span>UI/UX &amp; Product Design</span>' +
    //   ARR14 +
    //   "</a>",
    // '              <a href="' + prefix + 'services/compliance" class="mega-item" id="nav-svc-compliance" role="menuitem"><span>Compliance</span>' +
    //   ARR14 +
    //   "</a>",
    // '              <a href="' + prefix + 'services/regulatory-consulting" class="mega-item" id="nav-svc-regulatory-consulting" role="menuitem"><span>Regulatory Consulting</span>' +
    //   ARR14 +
    //   "</a>",
    // '              <a href="' + prefix + 'services/audit-risk-management" class="mega-item" id="nav-svc-audit-risk-management" role="menuitem"><span>Audit &amp; Risk Management</span>' +
    //   ARR14 +
    //   "</a>",
    // '              <a href="' + prefix + 'services/policy-documentation" class="mega-item" id="nav-svc-policy-documentation" role="menuitem"><span>Policy &amp; Documentation</span>' +
    //   ARR14 +
    //   "</a>",
    "            </div>",
    "          </div>",
    "        </div>",
    "      </div>",

    /* Portfolio */
    '      <div class="nav-item" data-nav="portfolio">',
    '        <button class="nav-link nav-toggle" id="nav-portfolio-toggle" type="button"',
    '                aria-haspopup="true" aria-expanded="false" aria-controls="dd-portfolio">',
    "          Portfolio " + CHV12,
    "        </button>",
    '        <div class="dd-menu dd-mega" id="dd-portfolio" role="menu" aria-label="Portfolio" aria-hidden="true">',
    '          <div class="mega-grid">',
    '            <div class="mega-col">',
    // '              <p class="mega-heading">eCommerce</p>',
    '              <a href="' + prefix + 'portfolio/shopify" class="mega-item" id="nav-port-shopify" role="menuitem"><span>Shopify</span>' +
    ARR14 +
    "</a>",
    '              <a href="' + prefix + 'portfolio/bigcommerce" class="mega-item" id="nav-port-bigcommerce" role="menuitem"><span>BigCommerce</span>' +
    ARR14 +
    "</a>",
    '              <a href="' + prefix + 'portfolio/volusion" class="mega-item" id="nav-port-volusion" role="menuitem"><span>Volusion</span>' +
    ARR14 +
    "</a>",
    '              <a href="' + prefix + 'portfolio/webflow" class="mega-item" id="nav-port-webflow" role="menuitem"><span>Webflow</span>' +
    ARR14 +
    "</a>",
    // '              <a href="' + prefix + 'portfolio/enterprise-solution" class="mega-item" id="nav-port-enterprise-solution" role="menuitem"><span>Enterprise Solution</span>' +
    //   ARR14 +
    //   "</a>",
    "            </div>",
    // '            <div class="mega-col mega-col--bordered">',
    // '              <p class="mega-heading">Case Studies</p>',
    //   '              <a href="' + prefix + 'portfolio-detail/portfolio-detail" class="mega-item" id="nav-port-case-migration" role="menuitem"><span>Hydrogen Migration</span>' + ARR14 + "</a>",
    //   '              <a href="' + prefix + 'portfolio-detail/portfolio-detail" class="mega-item" id="nav-port-case-cro" role="menuitem"><span>CRO Focused Redesign</span>' + ARR14 + "</a>",
    //   '              <a href="' + prefix + 'portfolio-detail/portfolio-detail" class="mega-item" id="nav-port-case-b2b" role="menuitem"><span>B2B Portal Build</span>' + ARR14 + "</a>",
    //   '              <a href="' + prefix + 'portfolio-detail/portfolio-detail" class="mega-item" id="nav-port-case-automation" role="menuitem"><span>AI Automation</span>' + ARR14 + "</a>",
    //   '              <a href="' + prefix + 'portfolio-detail/portfolio-detail" class="mega-item" id="nav-port-case-webflow" role="menuitem"><span>Webflow Design</span>' + ARR14 + "</a>",
    // "            </div>",
    "          </div>",
    "        </div>",
    "      </div>",

    /* Technologies (temporarily disabled from nav - re-enable by
       uncommenting this block; kept for future use) */
    // '      <div class="nav-item" data-nav="technologies">',
    // '        <button class="nav-link nav-toggle" id="nav-technologies-toggle" type="button"',
    // '                aria-haspopup="true" aria-expanded="false" aria-controls="dd-technologies">',
    // "          Technologies " + CHV12,
    // "        </button>",
    // '        <div class="dd-menu dd-mega" id="dd-technologies" role="menu" aria-label="Technologies" aria-hidden="true">',
    // '          <div class="mega-grid">',
    // '            <div class="mega-col">',
    // '              <p class="mega-heading">Frontend</p>',
    // '              <a href="' +
    //   prefix +
    //   'technologies/react-nextjs" class="mega-item" role="menuitem"><span>React &amp; Next.js</span>' +
    //   ARR14 +
    //   "</a>",
    // '              <a href="' +
    //   prefix +
    //   'technologies/typescript" class="mega-item" role="menuitem"><span>TypeScript</span>' +
    //   ARR14 +
    //   "</a>",
    // '              <a href="' +
    //   prefix +
    //   'technologies/hydrogen-remix" class="mega-item" role="menuitem"><span>Hydrogen &amp; Remix</span>' +
    //   ARR14 +
    //   "</a>",
    // "            </div>",
    // '            <div class="mega-col mega-col--bordered">',
    // '              <p class="mega-heading">Backend &amp; AI</p>',
    // '              <a href="' +
    //   prefix +
    //   'technologies/nodejs" class="mega-item" role="menuitem"><span>Node.js</span>' +
    //   ARR14 +
    //   "</a>",
    // '              <a href="' +
    //   prefix +
    //   'technologies/graphql" class="mega-item" role="menuitem"><span>GraphQL</span>' +
    //   ARR14 +
    //   "</a>",
    // '              <a href="' +
    //   prefix +
    //   'technologies/ai-ml" class="mega-item" role="menuitem"><span>AI &amp; Machine Learning</span>' +
    //   ARR14 +
    //   "</a>",
    // "            </div>",
    // "          </div>",
    // "        </div>",
    // "      </div>",

    /* Tools */
    '      <div class="nav-item" data-nav="tools">',
    '        <button class="nav-link nav-toggle" id="nav-tools-toggle" type="button"',
    '                aria-haspopup="true" aria-expanded="false" aria-controls="dd-tools">',
    "          Tools " + CHV12,
    "        </button>",
    '        <div class="dd-menu dd-mega" id="dd-tools" role="menu" aria-label="Tools" aria-hidden="true">',
    '          <div class="mega-grid">',
    '            <div class="mega-col">',
    // '              <p class="mega-heading">eCommerce</p>',
    '              <a href="' + prefix + 'tools/roi-calculator" class="mega-item" id="nav-tool-roi" role="menuitem"><span>ROI Calculator</span>' +
    ARR14 +
    "</a>",
    '              <a href="' + prefix + 'tools/site-speed-grader" class="mega-item" id="nav-tool-speed" role="menuitem"><span>Site Speed Grader</span>' +
    ARR14 +
    "</a>",
    // '            </div>',
    // '            <div class="mega-col mega-col--bordered">',
    // '              <p class="mega-heading">Strategy Tools</p>',
    '              <a href="' + prefix + 'tools/ai-readiness-assessment" class="mega-item" id="nav-tool-ai" role="menuitem"><span>AI Readiness Assessment</span>' +
    ARR14 +
    "</a>",
    '              <a href="' + prefix + 'tools/platform-selector" class="mega-item" id="nav-tool-platform" role="menuitem"><span>eCommerce Platform Selectors</span>' +
    ARR14 +
    "</a>",
    "            </div>",
    "          </div>",
    "        </div>",
    "      </div>",

    /* CTA */
    '      <a href="' +
    prefix +
    'contact-us/contact-us" class="btn btn-primary nav-cta">Contact Us</a>',
    "    </nav>",

    /* Hamburger */
    '    <button class="mobile-menu-btn" type="button"',
    '            aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobile-nav">',
    "      <span></span><span></span><span></span>",
    "    </button>",
    "  </div>",
    "</header>",

    /* Overlay */
    '<div class="mobile-overlay" aria-hidden="true"></div>',

    /* Mobile Nav */
    '<nav class="mobile-menu" id="mobile-nav" aria-label="Mobile navigation" aria-hidden="true">',
    '  <div class="mob-header">',
    '    <a href="/" class="nav-brand" aria-label="Triyanshi Technologies Home">',
    '      <img src="' +
    prefix +
    'assets/WhiteLogo.webp" alt="Triyanshi Technologies" class="logo" width="110" height="55" loading="lazy">',
    "    </a>",
    '    <button class="mob-close" type="button" aria-label="Close navigation menu">',
    '      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    "    </button>",
    "  </div>",
    '  <div class="mob-body">',

    /* Mobile Home */
    '    <a href="/" class="mob-link" id="mob-home">Home</a>',

    /* Mobile Company */
    '    <div class="mob-group">',
    '      <button class="mob-link mob-toggle" type="button" aria-expanded="false" aria-controls="mob-company">',
    "        Company " + CHV14,
    "      </button>",
    '      <div class="mob-panel" id="mob-company"><div class="mob-panel-inner">',
    // '        <div class="mob-sub-group">',
    // '          <button class="mob-sub-toggle" type="button" aria-expanded="false" aria-controls="mob-co-about">',
    //   "            About Triyanshi " + CHV12,
    //   "          </button>",
    // '          <div class="mob-sub-panel" id="mob-co-about"><div class="mob-sub-panel-inner">',
    //   '            <a href="' + prefix + 'company/about-us" class="mob-leaf" id="mob-about-us">' + ARR12 + "<span>About Us</span></a>",
    //   '            <a href="' + prefix + 'company/what-we-serve" class="mob-leaf" id="mob-what-we-serve">' + ARR12 + "<span>What We Serve</span></a>",
    //   '            <a href="' + prefix + 'company/our-story" class="mob-leaf" id="mob-our-story">' + ARR12 + "<span>Our Story</span></a>",
    //   '            <a href="' + prefix + 'company/our-team" class="mob-leaf" id="mob-our-team">' + ARR12 + "<span>Our Team</span></a>",
    // "          </div></div>",
    // "        </div>",
    '        <a href="' +
    prefix +
    'company/about-us" class="mob-leaf" id="mob-about-us">' +
    ARR12 +
    "<span>About Us</span></a>",
    '        <!-- <div class="mob-sub-group">',
    '          <button class="mob-sub-toggle" type="button" aria-expanded="false" aria-controls="mob-co-careers">',
    "            Careers " + CHV12,
    "          </button>",
    '          <div class="mob-sub-panel" id="mob-co-careers"><div class="mob-sub-panel-inner">',
    '            <a href="' +
    prefix +
    'company/full-stack-developer" class="mob-leaf" id="mob-fsd">' +
    ARR12 +
    "<span>Full Stack Development</span></a>",
    '            <a href="' +
    prefix +
    'company/ui-ux-designer" class="mob-leaf" id="mob-uxd">' +
    ARR12 +
    "<span>UI/UX Designing</span></a>",
    '            <a href="' +
    prefix +
    'company/business-dev-executive" class="mob-leaf" id="mob-bde">' +
    ARR12 +
    "<span>Business Development Executive</span></a>",
    "          </div></div>",
    "        </div> -->",
    "      </div></div>",
    "    </div>",

    /* Mobile Services */
    '    <div class="mob-group">',
    '      <button class="mob-link mob-toggle" type="button" aria-expanded="false" aria-controls="mob-services">',
    "        Services " + CHV14,
    "      </button>",
    '      <div class="mob-panel" id="mob-services"><div class="mob-panel-inner">',
    '        <a href="' + prefix + 'services/ecommerce" class="mob-leaf" id="mob-svc-ecommerce">' +
    ARR12 +
    "<span>eCommerce</span></a>",
    // '        <div class="mob-sub-group">',
    // '          <button class="mob-sub-toggle" type="button" aria-expanded="false" aria-controls="mob-svc-ecom">',
    //   "            eCommerce " + CHV12,
    //   "          </button>",
    // '          <div class="mob-sub-panel" id="mob-svc-ecom"><div class="mob-sub-panel-inner">',
    // '            <a href="' + prefix + 'services/shopify" class="mob-leaf" id="mob-svc-shopify">' +
    //   ARR12 +
    //   "<span>Shopify</span></a>",
    // '            <a href="' + prefix + 'services/bigcommerce" class="mob-leaf" id="mob-svc-bigcommerce">' +
    //   ARR12 +
    //   "<span>BigCommerce</span></a>",
    // '            <a href="' + prefix + 'services/volusion" class="mob-leaf" id="mob-svc-volusion">' +
    //   ARR12 +
    //   "<span>Volusion</span></a>",
    // '            <a href="' + prefix + 'services/webflow" class="mob-leaf" id="mob-svc-webflow">' +
    //   ARR12 +
    //   "<span>Webflow</span></a>",
    // '            <a href="' + prefix + 'services/enterprise-solution" class="mob-leaf" id="mob-svc-enterprise-solution">' +
    //   ARR12 +
    //   "<span>Enterprise Solution</span></a>",
    // "          </div></div>",
    // "        </div>",
    '        <a href="' + prefix + 'services/enterprise-solutions" class="mob-leaf" id="mob-svc-enterprise-solutions">' +
    ARR12 +
    "<span>Enterprise Solutions</span></a>",
    // '        <div class="mob-sub-group">',
    // '          <button class="mob-sub-toggle" type="button" aria-expanded="false" aria-controls="mob-svc-custom">',
    //   "            Innovation Lab " + CHV12,
    //   "          </button>",
    // '          <div class="mob-sub-panel" id="mob-svc-custom"><div class="mob-sub-panel-inner">',
    // '            <a href="' + prefix + 'services/saas-mvp-development" class="mob-leaf" id="mob-svc-saas-mvp-development">' +
    //   ARR12 +
    //   "<span>SaaS &amp; MVP Development</span></a>",
    // '            <a href="' + prefix + 'services/website-development" class="mob-leaf" id="mob-svc-website-development">' +
    //   ARR12 +
    //   "<span>Website Development</span></a>",
    // '            <a href="' + prefix + 'services/ai-automation-solutions" class="mob-leaf" id="mob-svc-ai-automation-solutions">' +
    //   ARR12 +
    //   "<span>AI &amp; Automation Solutions</span></a>",
    // '            <a href="' + prefix + 'services/erp-crm-development" class="mob-leaf" id="mob-svc-erp-crm-development">' +
    //   ARR12 +
    //   "<span>ERP &amp; CRM Development</span></a>",
    // '            <a href="' + prefix + 'services/ui-ux-product-design" class="mob-leaf" id="mob-svc-ui-ux-product-design">' +
    //   ARR12 +
    //   "<span>UI/UX &amp; Product Design</span></a>",
    // "          </div></div>",
    // "        </div>",
    // '        <a href="' + prefix + 'services/compliance" class="mob-leaf" id="mob-svc-compliance">' +
    //   ARR12 +
    //   "<span>Compliance</span></a>",
    // '        <div class="mob-sub-group">',
    // '          <button class="mob-sub-toggle" type="button" aria-expanded="false" aria-controls="mob-svc-compliance">',
    //   "            Compliance " + CHV12,
    //   "          </button>",
    // '          <div class="mob-sub-panel" id="mob-svc-compliance"><div class="mob-sub-panel-inner">',
    // '            <a href="' + prefix + 'services/regulatory-consulting" class="mob-leaf" id="mob-svc-regulatory-consulting">' +
    //   ARR12 +
    //   "<span>Regulatory Consulting</span></a>",
    // '            <a href="' + prefix + 'services/audit-risk-management" class="mob-leaf" id="mob-svc-audit-risk-management">' +
    //   ARR12 +
    //   "<span>Audit &amp; Risk Management</span></a>",
    // '            <a href="' + prefix + 'services/policy-documentation" class="mob-leaf" id="mob-svc-policy-documentation">' +
    //   ARR12 +
    //   "<span>Policy &amp; Documentation</span></a>",
    // "          </div></div>",
    // "        </div>",
    "      </div></div>",
    "    </div>",

    /* Mobile Portfolio */
    '    <div class="mob-group">',
    '      <button class="mob-link mob-toggle" type="button" aria-expanded="false" aria-controls="mob-portfolio">',
    "        Portfolio " + CHV14,
    "      </button>",
    '      <div class="mob-panel" id="mob-portfolio"><div class="mob-panel-inner">',
    // '        <div class="mob-sub-group">',
    // '          <button class="mob-sub-toggle" type="button" aria-expanded="false" aria-controls="mob-port-ecom">',
    //   "            eCommerce " + CHV12,
    //   "          </button>",
    // '          <div class="mob-sub-panel" id="mob-port-ecom"><div class="mob-sub-panel-inner">',
    '        <a href="' + prefix + 'portfolio/shopify" class="mob-leaf" id="mob-port-shopify">' +
    ARR12 +
    "<span>Shopify</span></a>",
    '        <a href="' + prefix + 'portfolio/bigcommerce" class="mob-leaf" id="mob-port-bigcommerce">' +
    ARR12 +
    "<span>BigCommerce</span></a>",
    '        <a href="' + prefix + 'portfolio/volusion" class="mob-leaf" id="mob-port-volusion">' +
    ARR12 +
    "<span>Volusion</span></a>",
    '        <a href="' + prefix + 'portfolio/webflow" class="mob-leaf" id="mob-port-webflow">' +
    ARR12 +
    "<span>Webflow</span></a>",
    // '            <a href="' + prefix + 'portfolio/enterprise-solution" class="mob-leaf" id="mob-port-enterprise-solution">' +
    //   ARR12 +
    //   "<span>Enterprise Solution</span></a>",
    // "          </div></div>",
    // "        </div>",
    // '        <div class="mob-sub-group">',
    // '          <button class="mob-sub-toggle" type="button" aria-expanded="false" aria-controls="mob-port-custom">',
    //   "            Case Studies " + CHV12,
    //   "          </button>",
    // '          <div class="mob-sub-panel" id="mob-port-custom"><div class="mob-sub-panel-inner">',
    //   '            <a href="' + prefix + 'portfolio-detail/portfolio-detail" class="mob-leaf" id="mob-port-case-migration">' + ARR12 + "<span>Stone &amp; Tile - Hydrogen Migration</span></a>",
    //   '            <a href="' + prefix + 'portfolio-detail/portfolio-detail" class="mob-leaf" id="mob-port-case-cro">' + ARR12 + "<span>Geroo Jaipur - CRO Focused Redesign</span></a>",
    //   '            <a href="' + prefix + 'portfolio-detail/portfolio-detail" class="mob-leaf" id="mob-port-case-b2b">' + ARR12 + "<span>Coosje Bright - B2B Portal Build</span></a>",
    //   '            <a href="' + prefix + 'portfolio-detail/portfolio-detail" class="mob-leaf" id="mob-port-case-automation">' + ARR12 + "<span>Bumbo Stationeries - AI Automation</span></a>",
    //   '            <a href="' + prefix + 'portfolio-detail/portfolio-detail" class="mob-leaf" id="mob-port-case-webflow">' + ARR12 + "<span>Data Sketches - Webflow Design</span></a>",
    // "          </div></div>",
    // "        </div>",
    "      </div></div>",
    "    </div>",

    /* Mobile Technologies (temporarily disabled - matches desktop nav;
       re-enable by uncommenting this block) */
    // '    <div class="mob-group">',
    // '      <button class="mob-link mob-toggle" type="button" aria-expanded="false" aria-controls="mob-technologies">',
    // "        Technologies " + CHV14,
    // "      </button>",
    // '      <div class="mob-panel" id="mob-technologies"><div class="mob-panel-inner">',
    // '        <div class="mob-sub-group">',
    // '          <button class="mob-sub-toggle" type="button" aria-expanded="false" aria-controls="mob-tech-frontend">',
    // "            Frontend " + CHV12,
    // "          </button>",
    // '          <div class="mob-sub-panel" id="mob-tech-frontend"><div class="mob-sub-panel-inner">',
    // '            <a href="' +
    //   prefix +
    //   'technologies/react-nextjs" class="mob-leaf">' +
    //   ARR12 +
    //   "<span>React &amp; Next.js</span></a>",
    // '            <a href="' +
    //   prefix +
    //   'technologies/typescript" class="mob-leaf">' +
    //   ARR12 +
    //   "<span>TypeScript</span></a>",
    // '            <a href="' +
    //   prefix +
    //   'technologies/hydrogen-remix" class="mob-leaf">' +
    //   ARR12 +
    //   "<span>Hydrogen &amp; Remix</span></a>",
    // "          </div></div>",
    // "        </div>",
    // '        <div class="mob-sub-group">',
    // '          <button class="mob-sub-toggle" type="button" aria-expanded="false" aria-controls="mob-tech-backend">',
    // "            Backend &amp; AI " + CHV12,
    // "          </button>",
    // '          <div class="mob-sub-panel" id="mob-tech-backend"><div class="mob-sub-panel-inner">',
    // '            <a href="' +
    //   prefix +
    //   'technologies/nodejs" class="mob-leaf">' +
    //   ARR12 +
    //   "<span>Node.js</span></a>",
    // '            <a href="' +
    //   prefix +
    //   'technologies/graphql" class="mob-leaf">' +
    //   ARR12 +
    //   "<span>GraphQL</span></a>",
    // '            <a href="' +
    //   prefix +
    //   'technologies/ai-ml" class="mob-leaf">' +
    //   ARR12 +
    //   "<span>AI &amp; Machine Learning</span></a>",
    // "          </div></div>",
    // "        </div>",
    // "      </div></div>",
    // "    </div>",

    /* Mobile Tools */
    '    <div class="mob-group">',
    '      <button class="mob-link mob-toggle" type="button" aria-expanded="false" aria-controls="mob-tools">',
    "        Tools " + CHV14,
    "      </button>",
    '      <div class="mob-panel" id="mob-tools"><div class="mob-panel-inner">',
    // '        <div class="mob-sub-group">',
    // '          <button class="mob-sub-toggle" type="button" aria-expanded="false" aria-controls="mob-tools-ecom">',
    //   "            eCommerce " + CHV12,
    //   "          </button>",
    // '          <div class="mob-sub-panel" id="mob-tools-ecom"><div class="mob-sub-panel-inner">',
    //   '            <a href="' + prefix + 'tools/roi-calculator" class="mob-leaf" id="mob-tool-roi">' + ARR12 + "<span>ROI Calculator</span></a>",
    //   '            <a href="' + prefix + 'tools/site-speed-grader" class="mob-leaf" id="mob-tool-speed">' + ARR12 + "<span>Site Speed Grader</span></a>",
    // "          </div></div>",
    // "        </div>",
    // '        <div class="mob-sub-group">',
    // '          <button class="mob-sub-toggle" type="button" aria-expanded="false" aria-controls="mob-tools-strategy">',
    //   "            Strategy Tools " + CHV12,
    //   "          </button>",
    // '          <div class="mob-sub-panel" id="mob-tools-strategy"><div class="mob-sub-panel-inner">',
    //   '            <a href="' + prefix + 'tools/ai-readiness-assessment" class="mob-leaf" id="mob-tool-ai">' + ARR12 + "<span>AI Readiness Assessment</span></a>",
    //   '            <a href="' + prefix + 'tools/platform-selector" class="mob-leaf" id="mob-tool-platform">' + ARR12 + "<span>eCommerce Platform Selectors</span></a>",
    // "          </div></div>",
    // "        </div>",
    '        <a href="' + prefix + 'tools/roi-calculator" class="mob-leaf" id="mob-tool-roi">' +
    ARR12 +
    "<span>ROI Calculator</span></a>",
    '        <a href="' + prefix + 'tools/site-speed-grader" class="mob-leaf" id="mob-tool-speed">' +
    ARR12 +
    "<span>Site Speed Grader</span></a>",
    '        <a href="' + prefix + 'tools/ai-readiness-assessment" class="mob-leaf" id="mob-tool-ai">' +
    ARR12 +
    "<span>AI Readiness Assessment</span></a>",
    '        <a href="' + prefix + 'tools/platform-selector" class="mob-leaf" id="mob-tool-platform">' +
    ARR12 +
    "<span>eCommerce Platform Selectors</span></a>",
    "      </div></div>",
    "    </div>",

    /* Mobile CTA */
    '    <a href="' +
    prefix +
    'contact-us/contact-us" class="btn btn-primary mob-cta">Contact Us</a>',
    "  </div>",
    "</nav>",
  ].join("\n");

  /* Shared Footer HTML */
  var FOOTER_HTML = [
    '<footer id="contact" class="footer">',
    '  <div class="container">',
    '    <div class="footer-top">',

    /* Brand col */
    '      <div class="footer-col">',
    '        <a href="/" class="nav-brand" style="margin-bottom:1.5rem;">',
    '          <img src="' +
    prefix +
    'assets/WhiteLogo.webp" alt="Triyanshi Logo" class="logo">',
    "        </a>",
    "        <p>Innovating the future with scalable, human-centric IT solutions. Building software that matters.</p>",
    '        <div class="social-links">',
    '          <a href="https://in.linkedin.com/company/triyanshi-technologies" class="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">',
    '            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    "          </a>",
    '          <a href="https://www.facebook.com/61580070863109/" class="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">',
    '            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>',
    "          </a>",
    '          <a href="https://www.instagram.com/triyanshi_technologies?igsi=MWExdmNjMG5nYThlcw==" class="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">',
    '            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/></svg>',
    "          </a>",
    "        </div>",
    "      </div>",

    /* Services col */
    '      <div class="footer-col">',
    '        <button class="footer-col-header mob-toggle" type="button" aria-expanded="false" aria-controls="foot-services">',
    '          <span>Services</span>',
    '          <svg class="footer-chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="6 9 12 15 18 9"/></svg>',
    '        </button>',
    '        <div class="footer-links mob-panel" id="foot-services">',
    '          <div class="mob-panel-inner">',
    '            <a href="' + prefix + 'services/ecommerce" class="footer-link">eCommerce</a>',
    '            <a href="' + prefix + 'services/enterprise-solutions" class="footer-link">Enterprise Solutions</a>',
    // '            <a href="' + prefix + 'services/compliance" class="footer-link">Compliance</a>',
    '          </div>',
    '        </div>',
    '      </div>',

    /* Tools col */
    '      <div class="footer-col">',
    '        <button class="footer-col-header mob-toggle" type="button" aria-expanded="false" aria-controls="foot-tools">',
    '          <span>Free Tools</span>',
    '          <svg class="footer-chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="6 9 12 15 18 9"/></svg>',
    '        </button>',
    '        <div class="footer-links mob-panel" id="foot-tools">',
    '          <div class="mob-panel-inner">',
    '            <a href="' + prefix + 'tools/roi-calculator" class="footer-link">eCommerce ROI Calculator</a>',
    '            <a href="' + prefix + 'tools/site-speed-grader" class="footer-link">Site Speed Grader</a>',
    '            <a href="' + prefix + 'tools/ai-readiness-assessment" class="footer-link">AI Readiness Assessment</a>',
    '            <a href="' + prefix + 'tools/platform-selector" class="footer-link">eCommerce Platform Selectors</a>',
    '          </div>',
    '        </div>',
    '      </div>',

    /* Company col */
    '      <div class="footer-col">',
    '        <button class="footer-col-header mob-toggle" type="button" aria-expanded="false" aria-controls="foot-company">',
    '          <span>Company</span>',
    '          <svg class="footer-chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="6 9 12 15 18 9"/></svg>',
    '        </button>',
    '        <div class="footer-links mob-panel" id="foot-company">',
    '          <div class="mob-panel-inner">',
    '            <a href="' +
    prefix +
    'company/about-us" class="footer-link">About Us</a>',
    '            <a href="' +
    prefix +
    'portfolio/shopify" class="footer-link">Shopify</a>',
    '            <a href="' +
    prefix +
    'portfolio/bigcommerce" class="footer-link">BigCommerce</a>',
    '            <a href="' +
    prefix +
    'portfolio/volusion" class="footer-link">Volusion</a>',
    '            <a href="' +
    prefix +
    'portfolio/webflow" class="footer-link">Webflow</a>',
    /*
    '            <a href="' +
      prefix +
      'company/careers" class="footer-link">Careers</a>',
    */
    // '            <a href="#" class="footer-link">Blog</a>',
    '          </div>',
    '        </div>',
    '      </div>',

    /* Contact col */
    '      <div class="footer-col">',
    '        <button class="footer-col-header mob-toggle" type="button" aria-expanded="false" aria-controls="foot-contact">',
    '          <span>Contact Us</span>',
    '          <svg class="footer-chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><polyline points="6 9 12 15 18 9"/></svg>',
    '        </button>',
    '        <div class="footer-links mob-panel" id="foot-contact">',
    '          <div class="mob-panel-inner">',
    '            <a href="tel:+919909761261" class="footer-link flex items-center gap-1">',
    '              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
    "              (+91)-9909761261",
    "            </a>",
    '            <a href="mailto:coffee@triyanshitechnologies.com" class="footer-link flex items-center gap-1">',
    '              <span class="footer-email-icon" aria-hidden="true"></span>',
    "              coffee@triyanshitechnologies.com",
    "            </a>",
    '            <a href="https://calendly.com/triyanshitechnologies" class="footer-link flex items-center gap-1" target="_blank" rel="noopener noreferrer">',
    '              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>',
    "              Schedule a Call",
    "            </a>",
    '          </div>',
    '        </div>',
    '      </div>',

    "    </div>",
    '    <div class="footer-bottom">',
    "      <p>&copy; 2026 Triyanshi Technologies. All rights reserved.</p>",
    "    </div>",
    "  </div>",
    "</footer>",
  ].join("\n");

  /* Inject helper */
  function inject(id, html) {
    var el = document.getElementById(id);
    if (!el) return;
    var temp = document.createElement("div");
    temp.innerHTML = html;
    /* replaceWith spreads all child nodes */
    el.replaceWith.apply(el, Array.from(temp.childNodes));
  }

  /* Active-state helper */
  function setActiveState() {
    var page = (location.pathname.split("/").pop() || "index")
      .toLowerCase()
      .replace(/\.html$/, "");

    /* Clear any stale active classes (safety net) */
    document.querySelectorAll(".nav-link.active").forEach(function (el) {
      el.classList.remove("active");
      el.removeAttribute("aria-current");
    });

    if (page === "" || page === "index") {
      var h = document.getElementById("nav-home");
      if (h) {
        h.classList.add("active");
        h.setAttribute("aria-current", "page");
      }
    } else if (
      page === "about" ||
      location.pathname.indexOf("/company/") !== -1
    ) {
      var ct = document.getElementById("nav-company-toggle");
      if (ct) ct.classList.add("active");
      /* Mark the specific leaf active */
      var companyLeafIds = {
        "what-we-serve": ["nav-what-we-serve", "mob-what-we-serve"],
        "our-story": ["nav-our-story", "mob-our-story"],
        "our-team": ["nav-our-team", "mob-our-team"],
        "full-stack-developer": ["nav-fsd", "mob-fsd"],
        "ui-ux-designer": ["nav-uxd", "mob-uxd"],
        "business-dev-executive": ["nav-bde", "mob-bde"],
      };
      if (companyLeafIds[page]) {
        companyLeafIds[page].forEach(function (id) {
          var el = document.getElementById(id);
          if (el) el.setAttribute("aria-current", "page");
        });
      }
    } else if (location.pathname.indexOf("/services/") !== -1) {
      var st = document.getElementById("nav-services-toggle");
      if (st) st.classList.add("active");
      var serviceLeafIds = {
        "ecommerce": ["nav-svc-ecommerce", "mob-svc-ecommerce"],
        "enterprise-solutions": ["nav-svc-enterprise-solutions", "mob-svc-enterprise-solutions"],
        "compliance": ["nav-svc-compliance", "mob-svc-compliance"],
        "shopify": ["nav-svc-shopify", "mob-svc-shopify"],
        "bigcommerce": ["nav-svc-bigcommerce", "mob-svc-bigcommerce"],
        "volusion": ["nav-svc-volusion", "mob-svc-volusion"],
        "webflow": ["nav-svc-webflow", "mob-svc-webflow"],
        "enterprise-solution": ["nav-svc-enterprise-solutions", "mob-svc-enterprise-solutions"],
        "innovation-lab": ["nav-svc-enterprise-solutions", "mob-svc-enterprise-solutions"],
        "saas-mvp-development": ["nav-svc-saas-mvp-development", "mob-svc-saas-mvp-development"],
        "website-development": ["nav-svc-website-development", "mob-svc-website-development"],
        "ai-automation-solutions": ["nav-svc-ai-automation-solutions", "mob-svc-ai-automation-solutions"],
        "erp-crm-development": ["nav-svc-erp-crm-development", "mob-svc-erp-crm-development"],
        "ui-ux-product-design": ["nav-svc-ui-ux-product-design", "mob-svc-ui-ux-product-design"],
        "regulatory-consulting": ["nav-svc-regulatory-consulting", "mob-svc-regulatory-consulting"],
        "audit-risk-management": ["nav-svc-audit-risk-management", "mob-svc-audit-risk-management"],
        "policy-documentation": ["nav-svc-policy-documentation", "mob-svc-policy-documentation"],
        "index": [],
      };
      if (serviceLeafIds[page]) {
        serviceLeafIds[page].forEach(function (id) {
          var el = document.getElementById(id);
          if (el) el.setAttribute("aria-current", "page");
        });
      }
    } else if (location.pathname.indexOf("/portfolio/") !== -1) {
      var pt = document.getElementById("nav-portfolio-toggle");
      if (pt) pt.classList.add("active");
      var portfolioLeafIds = {
        "shopify": ["nav-port-shopify", "mob-port-shopify"],
        "bigcommerce": ["nav-port-bigcommerce", "mob-port-bigcommerce"],
        "volusion": ["nav-port-volusion", "mob-port-volusion"],
        "webflow": ["nav-port-webflow", "mob-port-webflow"],
        "enterprise-solution": ["nav-port-enterprise-solution", "mob-port-enterprise-solution"],
        "saas-mvp-development": ["nav-port-saas-mvp-development", "mob-port-saas-mvp-development"],
        "website-development": ["nav-port-website-development", "mob-port-website-development"],
        "ai-automation-solutions": ["nav-port-ai-automation-solutions", "mob-port-ai-automation-solutions"],
        "erp-crm-development": ["nav-port-erp-crm-development", "mob-port-erp-crm-development"],
        "ui-ux-product-design": ["nav-port-ui-ux-product-design", "mob-port-ui-ux-product-design"],
      };
      if (portfolioLeafIds[page]) {
        portfolioLeafIds[page].forEach(function (id) {
          var el = document.getElementById(id);
          if (el) el.setAttribute("aria-current", "page");
        });
      }
    } else if (page === "portfolio-detail") {
      var pt = document.getElementById("nav-portfolio-toggle");
      if (pt) pt.classList.add("active");
    } else if (location.pathname.indexOf("/tools/") !== -1) {
      var tlt = document.getElementById("nav-tools-toggle");
      if (tlt) tlt.classList.add("active");
      var toolLeafIds = {
        "roi-calculator": ["nav-tool-roi", "mob-tool-roi"],
        "site-speed-grader": ["nav-tool-speed", "mob-tool-speed"],
        "ai-readiness-assessment": ["nav-tool-ai", "mob-tool-ai"],
        "platform-selector": ["nav-tool-platform", "mob-tool-platform"],
      };
      if (toolLeafIds[page]) {
        toolLeafIds[page].forEach(function (id) {
          var el = document.getElementById(id);
          if (el) el.setAttribute("aria-current", "page");
        });
      }
    } else {
      var techPages = [
        "technologies",
        "react-nextjs",
        "nodejs",
        "hydrogen-remix",
        "graphql",
        "ai-ml",
        "typescript",
      ];
      if (techPages.indexOf(page) !== -1) {
        var tt = document.getElementById("nav-technologies-toggle");
        if (tt) tt.classList.add("active");
      }
    }
    /* contact-us: CTA button style already distinguishes it */
  }

  /* Run */
  inject("site-nav", NAV_HTML);
  inject("site-footer", FOOTER_HTML);
  setActiveState();
})();
