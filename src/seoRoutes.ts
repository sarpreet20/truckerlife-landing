import { FAQS } from "./data";

export type RouteMeta = { title: string; description: string; jsonLd?: object; noindex?: boolean };

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/**
 * Single source of truth for per-route SEO metadata. Consumed by the <SEO>
 * component at runtime AND by scripts/prerender.mjs at build time, so the
 * static (pre-JS) HTML and the client-rendered HTML never drift apart.
 */
export const SEO_ROUTES: Record<string, RouteMeta> = {
  "/": {
    title: "Trucker Life AI — IFTA & True Rate Per Mile",
    description:
      "The owner-operator's AI co-driver: voice-log loads, see your true rate per mile with deadhead included, and file IFTA without the all-nighter.",
  },
  "/features": {
    title: "Features — Voice Logging, IFTA & True Rate | Trucker Life AI",
    description:
      "Five tools built for the cab: voice logging, a true rate calculator, IFTA reports by state, an AI advisor, and tax-ready records for owner-operators.",
  },
  "/calculator": {
    title: "True Rate Calculator for Owner-Operators | Trucker Life AI",
    description:
      "Free true rate per mile calculator. See what a load really pays after deadhead miles, diesel, and detention — before you say yes to the broker.",
  },
  "/ifta": {
    title: "IFTA Filing for Owner-Operators | Trucker Life AI",
    description:
      "IFTA isn't hard math, it's a records problem. Log miles and fuel by state as you drive so your quarterly report is ready before the deadline.",
  },
  "/pricing": {
    title: "Pricing — Free Trial, Pro $29/mo | Trucker Life AI",
    description:
      "Start free for 14 days with voice logging, load tracking, and IFTA tracking. Pro adds unlimited loads, the AI Advisor, and the Tax Center for $29/month.",
    jsonLd: faqJsonLd,
  },
  "/blog": {
    title: "Owner-Operator Blog — Cost Per Mile & IFTA | Trucker Life AI",
    description:
      "Trucking guides for owner-operators: how to calculate cost per mile, an IFTA quarterly playbook, and how to know if a load is profitable before you say yes.",
  },
  "/story": {
    title: "Built by an Owner-Operator | Trucker Life AI",
    description:
      "Trucker Life AI was built by an owner-operator with ten years behind the wheel — because every trucking app was designed for dispatchers, not drivers.",
  },
  "/404": {
    title: "Exit Not Found | Trucker Life AI",
    description:
      "This exit doesn't exist. Head back to the interstate for IFTA, true rate per mile, and tax records built for owner-operators.",
    noindex: true,
  },
};
