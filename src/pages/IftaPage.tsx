import { useMemo, useState } from "react";
import { IFTA_QUARTERS } from "../data";
import { AppStoreButton, PageHeader, Reveal, SectionHead, SEO } from "../shared";

function nextDeadline() {
  const now = new Date();
  const y = now.getFullYear();
  const candidates = [
    { q: `Q1 ${y}`, due: new Date(y, 3, 30) },
    { q: `Q2 ${y}`, due: new Date(y, 6, 31) },
    { q: `Q3 ${y}`, due: new Date(y, 9, 31) },
    { q: `Q4 ${y}`, due: new Date(y + 1, 0, 31) },
  ];
  const next = candidates.find((c) => c.due.getTime() >= now.getTime()) || candidates[0];
  const days = Math.max(0, Math.ceil((next.due.getTime() - now.getTime()) / 86400000));
  return { ...next, days };
}

const STEPS = [
  {
    n: "01",
    title: "You drive. It logs.",
    body: "Every voice-logged load and fuel stop is split by state line automatically. Texas miles go to Texas, New Mexico gallons go to New Mexico — as you drive, not at the end of the quarter.",
  },
  {
    n: "02",
    title: "The quarter builds itself.",
    body: "By week three of the quarter, your report is already 80% written. Watch it fill in on the IFTA screen — miles, fuel, and taxable gallons per jurisdiction, audit format included.",
  },
  {
    n: "03",
    title: "Export. File. Drive on.",
    body: "One tap exports the full filing — ready for your state portal or your bookkeeper. Owner-operators who log weekly file in an afternoon. The app just made it a coffee break.",
  },
];

const STATE_ROWS: [string, string, string, string][] = [
  ["TX", "2,410", "388", "$61.20"],
  ["NM", "1,120", "181", "$47.10"],
  ["AZ", "964", "156", "$33.40"],
  ["OK", "743", "119", "$21.85"],
  ["CO", "388", "62", "$15.75"],
];

export default function IftaPage() {
  const [deadline] = useState(nextDeadline);
  const [filed, setFiled] = useState(false);

  const progress = useMemo(() => {
    // rough quarter progress toward the deadline
    return Math.max(4, Math.min(96, Math.round(100 - (deadline.days / 91) * 100)));
  }, [deadline]);

  return (
    <>
      <SEO
        path="/ifta"
        title="IFTA Filing for Owner-Operators — Quarterly Reports by State | Trucker Life AI"
        description="IFTA isn't hard math, it's a records problem. Trucker Life AI logs miles and fuel by state as you drive, so your quarterly IFTA report is ready before the deadline. Deadlines: Apr 30, Jul 31, Oct 31, Jan 31."
      />
      <PageHeader
        crumb="IFTA CENTER"
        eyebrow="THE QUARTERLY ALL-NIGHTER, CANCELED"
        lines={[
          "IFTA, done before",
          <span key="a">the quarter <span className="text-amber">ends.</span></span>,
        ]}
        lede="Four deadlines a year. Fifty jurisdictions. One shoebox of receipts used to stand between you and all of them. Now the report builds itself while you drive."
        meta={[["FILINGS / YR", "4"], ["JURISDICTIONS", "50+"], ["TIME TO FILE", "AN AFTERNOON"]]}
      />

      {/* countdown */}
      <section className="py-12 md:py-14">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="grid lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-5 bg-coal text-chalk p-7 md:p-9 relative overflow-hidden">
                <div className="lanes absolute top-0 left-0 right-0 opacity-80" aria-hidden="true" />
                <div className="font-mono text-[10px] tracking-[0.3em] text-faint mt-2">NEXT FILING DEADLINE</div>
                <div className="font-display text-4xl md:text-5xl mt-3 tracking-wide">{deadline.q}</div>
                <div className="flex items-baseline gap-4 mt-5">
                  <span className="font-display text-7xl md:text-8xl text-amber tabular-nums">{deadline.days}</span>
                  <span className="font-mono text-sm tracking-[0.2em] text-dim">DAYS<br />OUT</span>
                </div>
                <div className="mt-6 font-mono text-[11px] tracking-[0.18em] text-dim">
                  DUE {deadline.due.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toUpperCase()}
                </div>
                <div className="mt-3 h-2.5 bg-panel-dark border border-line-dark">
                  <div className="h-full bg-amber transition-all duration-700" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-2 flex justify-between font-mono text-[9.5px] tracking-[0.15em] text-faint">
                  <span>QUARTER START</span><span>{progress}% ELAPSED</span>
                </div>
              </div>

              <div className="lg:col-span-7 border-2 border-ink bg-panel p-7 md:p-9">
                <div className="font-mono text-[10px] tracking-[0.3em] text-faint">THE FOUR DEADLINES</div>
                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                  {IFTA_QUARTERS.map((q) => {
                    const isNext = deadline.q.startsWith(q.q);
                    return (
                      <div
                        key={q.q}
                        className={`border p-4 flex items-center justify-between transition-colors duration-300 ${
                          isNext ? "border-amberdark bg-amber/15" : "border-line hover:border-ink/40"
                        }`}
                      >
                        <div>
                          <div className="font-display text-2xl text-ink tracking-wide">{q.q}</div>
                          <div className="font-mono text-[10px] tracking-[0.15em] text-faint mt-1">{q.months.toUpperCase()}</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-display text-lg ${isNext ? "text-amberdark" : "text-ink"}`}>{q.due}</div>
                          {isNext && <div className="font-mono text-[9px] tracking-[0.2em] text-amberdark font-bold mt-0.5">← YOU ARE HERE</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-5 text-dim leading-relaxed text-[15.5px]">
                  Miss one and it compounds: late-filing penalties stack <span className="text-ink font-semibold">per jurisdiction</span>, and states share audit flags. The cheapest IFTA filing is the one that was already done.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* steps */}
      <section className="pb-12 md:pb-14">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHead
            eyebrow="HOW IT WORKS"
            lines={["Three steps.", <span key="a" className="text-amberdark">Zero all-nighters.</span>]}
          />
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 130}>
                <div className="group border border-line bg-panel p-7 h-full hover:border-ink hover:-translate-y-1.5 hover:shadow-[8px_8px_0_rgba(255,180,0,0.85)] transition-all duration-400">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-5xl text-line group-hover:text-amber transition-colors duration-400">{s.n}</span>
                    <span className="lanes lanes-slow w-12 opacity-0 group-hover:opacity-100 transition-opacity duration-400" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display uppercase text-2xl text-ink tracking-wide">{s.title}</h3>
                  <p className="mt-3 text-dim leading-relaxed text-[15.5px]">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* sample report */}
      <section className="pb-12 md:pb-14">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <Reveal className="lg:col-span-5">
              <SectionHead
                eyebrow="WHAT YOU EXPORT"
                lines={["Your quarter,", "already", <span key="a" className="text-amberdark">written.</span>]}
                lede="This is the shape of the report at any point in the quarter — live, not reconstructed from receipts. Audit-ready per jurisdiction, every week."
              />
              <div className="mt-8 space-y-3">
                {[
                  ["Late filing penalty", "up to $2,500", "per jurisdiction, per quarter"],
                  ["Audit exposure", "3–4 years", "of records they can request"],
                  ["Receipt rebuild time", "8–12 hrs", "the average lost weekend"],
                ].map(([k, v, s]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 border-l-4 border-alert bg-panel px-5 py-4">
                    <div>
                      <div className="font-bold text-ink">{k}</div>
                      <div className="font-mono text-[10px] tracking-[0.15em] text-faint mt-1 uppercase">{s}</div>
                    </div>
                    <div className="font-display text-2xl text-alert whitespace-nowrap">{v}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={120}>
              <div className="bg-panel border-2 border-ink p-6 md:p-8 shadow-[10px_10px_0_rgba(26,28,31,0.1)]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-line pb-4">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.28em] text-faint">IFTA SUMMARY · {deadline.q} · UNIT 14</div>
                    <div className="font-display text-2xl text-ink tracking-wide mt-1">MILES & FUEL BY JURISDICTION</div>
                  </div>
                  {filed ? (
                    <span className="stamp text-money text-lg">FILED ✓</span>
                  ) : (
                    <span className="font-mono text-[10px] tracking-[0.15em] text-amberdark border border-amberdark/50 px-3 py-1.5 font-semibold">IN PROGRESS · {progress}% OF QUARTER</span>
                  )}
                </div>
                <div className="mt-4 hidden sm:grid grid-cols-12 font-mono text-[10px] tracking-[0.2em] text-faint pb-2 border-b border-line">
                  <span className="col-span-3">STATE</span>
                  <span className="col-span-3 text-right">TAXABLE MILES</span>
                  <span className="col-span-3 text-right">FUEL (GAL)</span>
                  <span className="col-span-3 text-right">EST. TAX DUE</span>
                </div>
                {STATE_ROWS.map(([s, m, f, t]) => (
                  <div key={s} className="grid grid-cols-2 sm:grid-cols-12 items-baseline font-mono text-sm py-3 border-b border-dashed border-line hover:bg-sink/60 transition-colors duration-200 px-1">
                    <span className="col-span-1 font-display text-xl text-ink sm:col-span-3">{s}</span>
                    <span className="col-span-1 text-right text-dim sm:col-span-3 tabular-nums">{m} mi</span>
                    <span className="col-span-1 text-right text-dim sm:col-span-3 tabular-nums hidden sm:block">{f}</span>
                    <span className="col-span-1 text-right text-ink font-semibold sm:col-span-3 tabular-nums">{t}</span>
                  </div>
                ))}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-12 items-baseline bg-sink/80 border border-line px-3 py-3.5">
                  <span className="col-span-1 font-display text-lg text-ink sm:col-span-3">TOTAL</span>
                  <span className="col-span-1 text-right font-mono text-sm font-bold sm:col-span-3 tabular-nums">5,625 mi</span>
                  <span className="col-span-1 text-right font-mono text-sm font-bold sm:col-span-3 hidden sm:block tabular-nums">906 gal</span>
                  <span className="col-span-1 text-right font-mono text-sm font-bold sm:col-span-3 text-money tabular-nums">$179.30</span>
                </div>
                <button
                  onClick={() => setFiled(!filed)}
                  className="mt-6 w-full sm:w-auto bg-ink text-paper font-bold px-7 py-3.5 hover:bg-amberdark hover:text-paper transition-colors duration-300 active:scale-[0.98]"
                >
                  {filed ? "Reopen quarter" : "Mark as filed — try it"}
                </button>
                <p className="mt-3 font-mono text-[10px] tracking-[0.12em] text-faint">
                  IN THE APP, EXPORT GOES STRAIGHT TO YOUR STATE PORTAL OR BOOKKEEPER.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-12 md:pb-14">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="bg-amber text-ink px-6 py-10 md:p-14 grid md:grid-cols-12 gap-8 items-center relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect x='14' y='14' width='20' height='20' transform='rotate(45 24 24)' fill='none' stroke='%231a1c1f' stroke-width='2'/%3E%3C/svg%3E\")" }}
                aria-hidden="true"
              />
              <div className="relative md:col-span-8">
                <h2 className="font-display uppercase text-3xl md:text-5xl leading-tight">
                  {deadline.days} days to {deadline.q}.
                  <br />
                  <span className="underline decoration-4 underline-offset-4">Start it today — by doing nothing.</span>
                </h2>
                <p className="mt-4 font-semibold text-ink/80 text-lg max-w-xl">Log one load by voice and the quarter is already on the books. The next one is easier still.</p>
              </div>
              <div className="relative md:col-span-4 md:text-right">
                <AppStoreButton dark big />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
