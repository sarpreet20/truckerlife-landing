import { useState } from "react";
import { FAQS, IconCheck } from "../data";
import { AppStoreButton, PageHeader, Reveal, SectionHead, SEO } from "../shared";

const FREE_FEATURES = ["Voice logging", "Load tracking", "Fuel entries", "Basic reports", "IFTA tracking"];
const PRO_FEATURES = ["Everything in Free", "Unlimited loads", "AI Advisor weekly brief", "Full IFTA reports by state", "Tax Center & deduction tracking", "PDF exports for your CPA", "Priority support — real truckers"];

const ROI_ROWS: [string, string, string][] = [
  ["One caught lowball load", "+$412", "a $2.10 quote that was really $1.17 after 318 deadhead miles"],
  ["Paperwork hours back", "+$570", "6 hrs/month at your $95/hr operating cost"],
  ["Deadhead flagged early", "+$260", "catch the empty 200 before you drive it"],
  ["Tracked deductions found", "+$700", "the receipts the glovebox method loses, averaged monthly"],
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t-2 border-ink">
      {FAQS.map((f, i) => (
        <div key={f.q} className="border-b border-line">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="w-full flex items-center justify-between gap-6 text-left py-5 px-2 md:px-4 group hover:bg-panel transition-colors duration-300"
          >
            <span className="flex items-baseline gap-4 min-w-0">
              <span className="font-mono text-xs text-faint shrink-0">Q{i + 1}</span>
              <span className={`font-display uppercase text-xl md:text-2xl tracking-wide transition-colors duration-300 ${open === i ? "text-amberdark" : "text-ink"}`}>{f.q}</span>
            </span>
            <span className={`shrink-0 w-9 h-9 border flex items-center justify-center transition-all duration-300 ${open === i ? "bg-ink text-amber border-ink rotate-45" : "border-line text-dim group-hover:border-ink"}`} aria-hidden="true">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            </span>
          </button>
          <div className={`acc ${open === i ? "open" : ""}`}>
            <div>
              <p className="pb-6 px-2 md:px-4 md:pl-14 text-dim leading-relaxed max-w-3xl text-[16px]">{f.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PricingPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <SEO
        path="/pricing"
        title="Pricing — Free 14-Day Trial, Pro $29/mo | Trucker Life AI"
        description="Start free for 14 days — voice logging, load tracking, fuel entries, and IFTA tracking. Pro adds unlimited loads, the AI Advisor, full IFTA reports, and the Tax Center for $29/month. Cancel anytime."
        jsonLd={faqJsonLd}
      />
      <PageHeader
        crumb="PRICING"
        eyebrow="THE MATH ON THE MATH TOOL"
        lines={[
          "One caught lowball",
          <span key="a">pays for <span className="text-amber">a year.</span></span>,
        ]}
        lede="Pro costs $29 a month. One load you don't run at $1.17 when you thought it was $2.10 saves more than that. Everything after is profit — including your evenings."
        meta={[["TRIAL", "14 DAYS FREE"], ["PRO", "$29/MO"], ["CONTRACTS", "NONE"]]}
      />

      {/* plans */}
      <section className="py-12 md:py-14">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10 max-w-5xl">
            {/* free */}
            <Reveal>
              <div className="border-2 border-ink bg-panel p-7 md:p-9 h-full flex flex-col hover:-translate-y-1.5 transition-transform duration-400">
                <div className="font-mono text-[10px] tracking-[0.3em] text-faint">TO GET STARTED</div>
                <h2 className="font-display uppercase text-5xl md:text-6xl text-ink mt-3">
                  Free
                  <span className="block font-mono text-xs tracking-[0.25em] text-dim mt-2">$0 · 14-DAY TRIAL</span>
                </h2>
                <ul className="mt-7 space-y-3.5 flex-1">
                  {FREE_FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-ink font-medium text-[16px]">
                      <span className="w-6 h-6 border border-ink/25 flex items-center justify-center shrink-0">
                        <IconCheck className="w-3.5 h-3.5 text-money" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <AppStoreButton className="mt-8 w-full justify-center" />
                <p className="mt-4 text-center font-mono text-[10px] tracking-[0.18em] text-faint">NO CREDIT CARD REQUIRED</p>
              </div>
            </Reveal>

            {/* pro receipt */}
            <Reveal delay={140}>
              <div className="relative h-full">
                <div className="absolute -top-3.5 right-6 sm:-right-2 rotate-6 z-10" aria-hidden="true">
                  <span className="stamp text-ink text-sm bg-amber">MOST POPULAR</span>
                </div>
                <div className="bg-panel border-2 border-ink p-7 md:p-9 h-full flex flex-col shadow-[12px_12px_0_rgba(255,180,0,0.7)] hover:-translate-y-1.5 transition-transform duration-400">
                  <div className="flex items-start justify-between border-b-2 border-dashed border-line pb-5">
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.3em] text-faint">RATE CONFIRMATION</div>
                      <h2 className="font-display uppercase text-5xl md:text-6xl text-ink mt-2">Pro</h2>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-4xl md:text-5xl text-amberdark">$29</div>
                      <div className="font-mono text-[10px] tracking-[0.2em] text-faint mt-1">PER MONTH</div>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-3.5 flex-1">
                    {PRO_FEATURES.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-ink font-medium text-[16px]">
                        <span className="w-6 h-6 bg-ink text-amber flex items-center justify-center shrink-0">
                          <IconCheck className="w-3.5 h-3.5" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-5 border-t-2 border-dashed border-line flex justify-between items-baseline">
                    <span className="font-mono text-[10.5px] tracking-[0.2em] text-faint">TOTAL DUE TODAY</span>
                    <span className="font-display text-2xl text-ink">$0.00</span>
                  </div>
                  <AppStoreButton big className="mt-5 w-full justify-center" />
                  <p className="mt-4 text-center font-mono text-[10px] tracking-[0.15em] text-faint">CANCEL ANYTIME · TWO TAPS · NO PHONE CALL</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ROI math */}
          <Reveal className="mt-16 md:mt-20">
            <div className="max-w-5xl">
              <SectionHead
                eyebrow="DO THE MATH WITH US"
                tone="money"
                lines={[
                  "A conservative month,",
                  <span key="a" className="text-money">itemized.</span>,
                ]}
                lede="No hero numbers. One caught lowball, six hours of paperwork, one flagged deadhead run, and the deductions you'd have missed. That's the quiet side of the ledger."
              />
              <div className="mt-10 border-2 border-ink bg-panel">
                {ROI_ROWS.map(([k, v, n]) => (
                  <div key={k} className="grid md:grid-cols-12 gap-1.5 md:gap-6 px-6 py-5 items-baseline border-b border-line hover:bg-sink/60 transition-colors duration-300">
                    <div className="md:col-span-4 font-display uppercase text-lg text-ink tracking-wide">{k}</div>
                    <div className="md:col-span-2 font-display text-3xl text-money tabular-nums">{v}</div>
                    <div className="md:col-span-6 text-dim text-[15px]">{n}</div>
                  </div>
                ))}
                <div className="grid md:grid-cols-12 gap-1.5 md:gap-6 px-6 py-6 items-baseline bg-ink text-paper">
                  <div className="md:col-span-4 font-display uppercase text-lg tracking-wide">Monthly return, conservatively</div>
                  <div className="md:col-span-2 font-display text-4xl text-amber tabular-nums">+$1,942</div>
                  <div className="md:col-span-6 font-mono text-[11px] tracking-[0.12em] text-paper/60">PRO COSTS $29 OF IT. YOU KEEP THE REST.</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-12 md:pb-14">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHead
            eyebrow="ASKED AT EVERY TRUCK STOP"
            lines={["Straight answers,", <span key="a" className="text-amberdark">no fine print.</span>]}
          />
          <div className="mt-8 max-w-4xl">
            <Faq />
          </div>
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <AppStoreButton big />
            <p className="font-mono text-[11px] tracking-[0.12em] text-faint">
              14 DAYS FREE · NO CREDIT CARD · CANCEL ANYTIME
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
