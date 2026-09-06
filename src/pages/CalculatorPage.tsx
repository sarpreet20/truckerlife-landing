import { useState } from "react";
import { useInView } from "../hooks";
import { COST_TABLE } from "../data";
import { AppStoreButton, PageHeader, Reveal, SectionHead, SEO } from "../shared";

type Slider = {
  key: string; label: string; unit: string; min: number; max: number; step: number; fmt: (v: number) => string;
};

const SLIDERS: Slider[] = [
  { key: "rate", label: "Broker rate", unit: "$/loaded mile", min: 1, max: 4, step: 0.05, fmt: (v) => `$${v.toFixed(2)}` },
  { key: "loaded", label: "Loaded miles", unit: "mi", min: 50, max: 1500, step: 10, fmt: (v) => `${v.toLocaleString()}` },
  { key: "dead", label: "Deadhead miles", unit: "mi", min: 0, max: 800, step: 10, fmt: (v) => `${v.toLocaleString()}` },
  { key: "fuel", label: "Fuel cost (total trip)", unit: "$", min: 0, max: 1500, step: 10, fmt: (v) => `$${v.toLocaleString()}` },
  { key: "extra", label: "Accessorials & detention", unit: "$", min: 0, max: 600, step: 10, fmt: (v) => `$${v.toLocaleString()}` },
  { key: "cpm", label: "Your all-in break-even", unit: "$/mile", min: 1, max: 3, step: 0.05, fmt: (v) => `$${v.toFixed(2)}` },
];

const DEFAULTS: Record<string, number> = { rate: 2.45, loaded: 751, dead: 210, fuel: 486, extra: 0, cpm: 1.85 };

function Row({ k, v, cls = "text-ink" }: { k: string; v: string; cls?: string }) {
  return (
    <div className="flex justify-between items-baseline border-b border-dashed border-line py-2">
      <span className="font-mono text-[10.5px] tracking-[0.18em] text-faint">{k}</span>
      <span className={`font-mono text-sm font-semibold tabular-nums ${cls}`}>{v}</span>
    </div>
  );
}

export default function CalculatorPage() {
  const [v, setV] = useState<Record<string, number>>(DEFAULTS);
  const set = (k: string, n: number) => setV((s) => ({ ...s, [k]: n }));

  const gross = v.rate * v.loaded;
  const total = v.loaded + v.dead;
  const net = gross - v.fuel + v.extra;
  const trueRpm = net / total;
  const loadedRpm = gross / v.loaded;
  const deadPct = total > 0 ? (v.dead / total) * 100 : 0;
  const vsCpm = trueRpm - v.cpm;

  const verdict =
    trueRpm >= v.cpm + 0.45
      ? { word: "RUN IT", cls: "text-money border-money", note: "That's freight. Comfortably above your break-even — book it, log it by voice, keep rolling." }
      : trueRpm >= v.cpm
        ? { word: "THINK TWICE", cls: "text-amberdark border-amberdark", note: "Above break-even, but thin. One detention hour or a diesel spike could erase it. Re-quote or find a backhaul." }
        : { word: "WALK AWAY", cls: "text-alert border-alert", note: `Under break-even by $${Math.abs(vsCpm).toFixed(2)}/mi — for every one of those ${total.toLocaleString()} miles. This is exactly the load the app saves you from.` };

  const deg = Math.max(0, Math.min(180, (trueRpm / 4) * 180));
  const gaugeColor = trueRpm >= v.cpm + 0.45 ? "#14794a" : trueRpm >= v.cpm ? "#c98a00" : "#cc3a29";

  return (
    <>
      <SEO
        path="/calculator"
        title="True Rate Calculator for Owner-Operators — Deadhead-Included RPM | Trucker Life AI"
        description="Free true rate per mile calculator for owner-operators. See what a load really pays after deadhead miles, diesel, and detention — before you say yes to the broker."
      />
      <PageHeader
        crumb="TRUE RATE CALCULATOR"
        eyebrow="BEFORE YOU SAY YES TO THE BROKER"
        lines={[
          "What did that load",
          <span key="a"><span className="text-amber">really</span> pay?</span>,
        ]}
        lede="A quoted rate is a sales number. A true rate is a business number. Drag the sliders — this is the exact math the app runs on every load, automatically."
        meta={[["DEADHEAD", "PRICED IN"], ["FUEL", "PRICED IN"], ["VERDICT", "INSTANT"]]}
      />

      <section className="py-12 md:py-14">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* sliders */}
            <Reveal className="lg:col-span-5">
              <div className="border-2 border-ink bg-panel p-6 md:p-7 shadow-[10px_10px_0_rgba(26,28,31,0.1)] lg:sticky lg:top-32">
                <div className="flex items-center justify-between border-b-2 border-dashed border-line pb-4">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.28em] text-faint">LOAD INPUT</div>
                    <div className="font-display text-xl text-ink tracking-wide mt-1">RATE CONFIRMATION</div>
                  </div>
                  <button
                    onClick={() => setV(DEFAULTS)}
                    className="font-mono text-[10px] tracking-[0.15em] text-amberdark border border-amberdark/40 px-3 py-1.5 hover:bg-amberdark hover:text-paper transition-colors duration-300 font-semibold"
                  >
                    RESET
                  </button>
                </div>
                <div className="mt-5 space-y-6">
                  {SLIDERS.map((s) => {
                    const val = v[s.key];
                    const pct = ((val - s.min) / (s.max - s.min)) * 100;
                    return (
                      <div key={s.key}>
                        <div className="flex justify-between items-baseline mb-2.5">
                          <label htmlFor={`sl-${s.key}`} className="font-semibold text-ink text-[15px]">{s.label}</label>
                          <span className="font-display text-lg text-amberdark tabular-nums">{s.fmt(val)}<span className="font-mono text-[9px] text-faint ml-1.5">{s.unit.toUpperCase()}</span></span>
                        </div>
                        <input
                          id={`sl-${s.key}`}
                          type="range"
                          className="haul"
                          min={s.min}
                          max={s.max}
                          step={s.step}
                          value={val}
                          style={{ ["--fill" as string]: `${pct}%` }}
                          onChange={(e) => set(s.key, parseFloat(e.target.value))}
                        />
                      </div>
                    );
                  })}
                </div>
                <p className="mt-6 pt-4 border-t border-dashed border-line font-mono text-[10px] leading-relaxed text-faint">
                  TIP: your all-in break-even is the number that decides everything. In the app it's tracked from your real expenses — not a guess.
                </p>
              </div>
            </Reveal>

            {/* receipt + gauge */}
            <Reveal className="lg:col-span-7" delay={120}>
              <div className="relative bg-panel border-2 border-ink p-6 md:p-8 shadow-[10px_10px_0_rgba(255,180,0,0.55)]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-line pb-4">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.28em] text-faint">SETTLEMENT SHEET · WEB DEMO</div>
                    <div className="font-display text-2xl md:text-3xl text-ink tracking-wide mt-1">THE REAL MATH</div>
                  </div>
                  <span key={verdict.word} className={`stamp text-xl md:text-2xl ${verdict.cls}`}>{verdict.word}</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-8 mt-6">
                  <div>
                    <Row k="GROSS PAY" v={`$${gross.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
                    <Row k="LOADED-MILE RATE" v={`$${loadedRpm.toFixed(2)}/mi`} />
                    <Row k="DEADHEAD" v={`${v.dead.toLocaleString()} mi (${deadPct.toFixed(0)}%)`} cls="text-alert" />
                    <Row k="DIESEL" v={`−$${v.fuel.toLocaleString()}`} cls="text-alert" />
                    <Row k="ACCESSORIALS" v={`+$${v.extra.toLocaleString()}`} cls={v.extra > 0 ? "text-money" : "text-faint"} />
                    <div className="flex justify-between items-baseline pt-3.5">
                      <span className="font-mono text-[10.5px] tracking-[0.18em] text-ink font-bold">NET, ALL MILES</span>
                      <span className="font-display text-3xl text-ink tabular-nums">${net.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="mt-4 bg-ink text-paper p-4">
                      <div className="font-mono text-[10px] tracking-[0.22em] text-paper/50">TRUE RATE · EVERY MILE</div>
                      <div className="font-display text-5xl mt-1" style={{ color: gaugeColor }}>
                        ${trueRpm.toFixed(2)}<span className="text-xl">/mi</span>
                      </div>
                      <div className={`font-mono text-[11px] mt-1.5 font-semibold ${vsCpm >= 0 ? "text-mint" : "text-alarm"}`}>
                        {vsCpm >= 0 ? "▲" : "▼"} ${Math.abs(vsCpm).toFixed(2)}/mi vs your ${v.cpm.toFixed(2)} break-even
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <svg viewBox="0 0 220 140" className="w-full max-w-[280px]" aria-hidden="true">
                      <path d="M20 120 A 90 90 0 0 1 200 120" fill="none" stroke="#e9e6dc" strokeWidth="16" />
                      <path d="M20 120 A 90 90 0 0 1 65 39" fill="none" stroke="#cc3a29" strokeWidth="16" opacity="0.85" />
                      <path d="M65 39 A 90 90 0 0 1 155 39" fill="none" stroke="#e29a00" strokeWidth="16" opacity="0.85" />
                      <path d="M155 39 A 90 90 0 0 1 200 120" fill="none" stroke="#14794a" strokeWidth="16" opacity="0.85" />
                      <g className="needle" style={{ transform: `rotate(${deg - 90}deg)` }}>
                        <line x1="110" y1="120" x2="110" y2="42" stroke="#1a1c1f" strokeWidth="4" strokeLinecap="round" />
                        <circle cx="110" cy="120" r="8" fill="#1a1c1f" />
                        <circle cx="110" cy="120" r="3" fill="#ffb400" />
                      </g>
                      <text x="18" y="136" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#8f949c">$0</text>
                      <text x="188" y="136" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#8f949c">$4.00</text>
                    </svg>
                    <div className="font-mono text-[10px] tracking-[0.22em] text-faint mt-2">TRUE RPM GAUGE</div>

                    <div className="mt-6 w-full space-y-2">
                      {[
                        ["LOADED ONLY", `$${loadedRpm.toFixed(2)}`, loadedRpm >= v.cpm ? "#14794a" : "#cc3a29", Math.min(100, (loadedRpm / 4) * 100)],
                        ["TRUE (ALL MILES)", `$${trueRpm.toFixed(2)}`, gaugeColor, Math.min(100, (trueRpm / 4) * 100)],
                        ["YOUR BREAK-EVEN", `$${v.cpm.toFixed(2)}`, "#1a1c1f", (v.cpm / 4) * 100],
                      ].map(([k, val, c, w]) => (
                        <div key={k as string}>
                          <div className="flex justify-between font-mono text-[10px] tracking-[0.14em] text-dim mb-1">
                            <span>{k}</span>
                            <span className="font-semibold">{val}</span>
                          </div>
                          <div className="h-2.5 bg-sink border border-line">
                            <div className="h-full transition-all duration-500" style={{ width: `${w}%`, background: c as string }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t-2 border-dashed border-line flex items-start gap-3">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 mt-0.5 text-amberdark" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 3.5L22 20H2L12 3.5z" /><path d="M12 10v4.5" /></svg>
                  <p className="text-dim leading-relaxed text-[15.5px]">{verdict.note}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* cost table */}
      <section className="pb-12 md:pb-14">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHead
            eyebrow="KNOW YOUR NUMBER"
            lines={[
              "What a truck really costs",
              <span key="a" className="text-amberdark">per mile.</span>,
            ]}
            lede="Most owner-operators guess at break-even. Here's what a typical dry-van rig actually spends — so the slider above starts from reality, not hope."
          />
          <Reveal className="mt-8">
            <div className="border-2 border-ink bg-panel overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 bg-ink text-paper font-mono text-[10.5px] tracking-[0.2em] px-6 py-3.5">
                <span className="col-span-5">COST ITEM</span>
                <span className="col-span-3">PER MILE</span>
                <span className="col-span-4">THE REALITY</span>
              </div>
              {COST_TABLE.map((r, i) => (
                <div key={r.item} className={`grid sm:grid-cols-12 gap-1.5 sm:gap-4 px-6 py-5 items-baseline hover:bg-sink/60 transition-colors duration-300 ${i < COST_TABLE.length - 1 ? "border-b border-line" : ""}`}>
                  <div className="sm:col-span-5 font-display uppercase text-lg text-ink tracking-wide">{r.item}</div>
                  <div className="sm:col-span-3 font-display text-2xl text-amberdark tabular-nums">{r.perMile}</div>
                  <div className="sm:col-span-4 text-dim text-[15px] leading-snug">{r.note}</div>
                </div>
              ))}
              <div className="grid sm:grid-cols-12 gap-1.5 sm:gap-4 px-6 py-5 items-baseline bg-amber">
                <div className="sm:col-span-5 font-display uppercase text-lg text-ink tracking-wide">Typical all-in break-even</div>
                <div className="sm:col-span-3 font-display text-3xl text-ink tabular-nums">$1.57+</div>
                <div className="sm:col-span-4 font-semibold text-ink/80 text-[15px]">Before driver pay. With it, most rigs land $1.85–$2.20.</div>
              </div>
            </div>
          </Reveal>
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <AppStoreButton big />
            <p className="font-mono text-[11px] tracking-[0.12em] text-faint max-w-xs">
              THE APP TRACKS YOUR REAL COSTS AND RUNS THIS MATH ON EVERY LOAD — AUTOMATICALLY.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
