import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCountUp, useInView, usePRM } from "../hooks";
import { BLOG, FEATURES, IconArrow, IconCheck, LOADS, PROBLEMS } from "../data";
import { AppStoreButton, Marquee, Reveal, SectionHead, SEO } from "../shared";
import { SEO_ROUTES } from "../seoRoutes";
import heroCabNight from "../assets/hero-cab-night.jpg";

/* ================= live ledger dashboard ================= */

const FEED_POOL = [
  { k: "LOAD", d: "DFW → PHX · 886 mi", amt: "+$2,170", pos: true },
  { k: "FUEL", d: "Amarillo TX · 142 gal", amt: "−$547", pos: false },
  { k: "LOAD", d: "PHX → ABQ · 334 mi", amt: "+$818", pos: true },
  { k: "MAINT", d: "Steer tires ×2", amt: "−$612", pos: false },
  { k: "DETENTION", d: "2.5 hrs @ $50", amt: "+$125", pos: true },
  { k: "LOAD", d: "ABQ → OKC · 541 mi", amt: "+$1,247", pos: true },
];

function Stat({ label, value, sub, on, decimals = 0, prefix = "" }: { label: string; value: number; sub: string; on: boolean; decimals?: number; prefix?: string }) {
  const v = useCountUp(value, on, { decimals, prefix });
  return (
    <div className="border border-line bg-panel px-4 py-3.5 hover:border-amber transition-colors duration-300 group">
      <div className="font-mono text-[10px] tracking-[0.2em] text-faint group-hover:text-amberdark transition-colors">{label}</div>
      <div className="font-display text-2xl text-ink mt-1 tabular-nums">{v}</div>
      <div className="font-mono text-[10px] text-dim mt-0.5">{sub}</div>
    </div>
  );
}

function Ledger() {
  const { ref, on } = useInView<HTMLDivElement>(0.15);
  const prm = usePRM();
  const [rows, setRows] = useState(FEED_POOL.slice(0, 4));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (prm) return;
    const id = setInterval(() => {
      setTick((t) => {
        const next = (t + 1) % FEED_POOL.length;
        setRows((r) => [FEED_POOL[next], ...r].slice(0, 4));
        return next;
      });
    }, 3400);
    return () => clearInterval(id);
  }, [prm]);

  return (
    <div ref={ref} className={`rv ${on ? "on" : ""} relative`}>
      <div className="absolute -inset-1 bg-gradient-to-br from-amber via-line to-money/40 opacity-60 blur-[2px] pointer-events-none" aria-hidden="true" />
      <div className="relative bg-panel border border-line shadow-[0_30px_70px_-30px_rgba(26,28,31,0.35)] p-5 md:p-6">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-faint">OWNER-OPERATOR LEDGER</div>
            <div className="font-display text-xl text-ink tracking-wide mt-0.5">MAY 2026 · UNIT 14</div>
          </div>
          <div className="flex items-center gap-2 text-money">
            <span className="pulse-dot inline-block w-2 h-2 rounded-full bg-money" />
            <span className="font-mono text-[10px] tracking-[0.25em] font-semibold">LIVE</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mt-4">
          <Stat label="TOTAL REVENUE" value={17500} prefix="$" sub="this month · gross" on={on} />
          <Stat label="TOTAL MILES" value={7402} sub="loaded + deadhead" on={on} />
          <Stat label="TOTAL FUEL" value={6180} prefix="$" sub="this month · diesel" on={on} />
          <Stat label="TRUE RPM" value={2.36} prefix="$" decimals={2} sub="rev / every mile" on={on} />
        </div>

        <div className={`mt-4 border border-line bg-sink/60 p-3 ${on ? "on" : ""}`}>
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-faint">
            <span>REVENUE / WEEK</span>
            <span className="text-money font-semibold">▲ 12.4%</span>
          </div>
          <svg viewBox="0 0 300 70" className="w-full h-16 mt-2" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 58 L30 52 L60 55 L90 44 L120 47 L150 34 L180 38 L210 26 L240 30 L270 16 L300 10 L300 70 L0 70 Z" fill="rgba(255,180,0,0.18)" />
            <path className="spark-path" d="M0 58 L30 52 L60 55 L90 44 L120 47 L150 34 L180 38 L210 26 L240 30 L270 16 L300 10" fill="none" stroke="#e29a00" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="300" cy="10" r="3.5" fill="#e29a00" />
          </svg>
        </div>

        <div className="mt-4">
          <div className="font-mono text-[10px] tracking-[0.25em] text-faint mb-2 flex justify-between">
            <span>ACTIVITY FEED</span>
            <span>SYNCED <span className="text-amberdark">{String(tick + 1).padStart(2, "0")}s AGO</span></span>
          </div>
          <ul className="space-y-1.5">
            {rows.map((r, i) => (
              <li key={`${r.d}-${i}`} className={`${i === 0 ? "row-in" : ""} flex items-center justify-between font-mono text-[11.5px] border border-line bg-panel px-3 py-2`}>
                <span className="flex items-center gap-2.5 min-w-0">
                  <span className={`shrink-0 px-1.5 py-0.5 text-[9px] tracking-[0.12em] font-semibold ${r.pos ? "bg-money/10 text-money border border-money/30" : "bg-alert/10 text-alert border border-alert/30"}`}>{r.k}</span>
                  <span className="text-dim truncate">{r.d}</span>
                </span>
                <span className={`tabular-nums font-semibold ${r.pos ? "text-money" : "text-alert"}`}>{r.amt}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-dashed border-line pt-3.5">
          <span className="font-mono text-[10px] tracking-[0.18em] text-dim">NET MARGIN <span className="text-money font-bold">15.8%</span> TRACKED</span>
          <span className="font-mono text-[10px] tracking-[0.18em] text-faint">IFTA · <span className="text-amberdark font-bold">Q2 READY</span></span>
        </div>
      </div>
      {["-top-2.5 -left-2.5 border-t-2 border-l-2", "-top-2.5 -right-2.5 border-t-2 border-r-2", "-bottom-2.5 -left-2.5 border-b-2 border-l-2", "-bottom-2.5 -right-2.5 border-b-2 border-r-2"].map((c) => (
        <span key={c} className={`absolute w-5 h-5 border-ink pointer-events-none ${c}`} aria-hidden="true" />
      ))}
    </div>
  );
}

/* ================= hero ================= */

function Hero() {
  const { ref, on } = useInView<HTMLDivElement>(0.08);
  return (
    <section className="relative sun-glow overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(#1a1c1f 1px, transparent 1px), linear-gradient(90deg, #1a1c1f 1px, transparent 1px)", backgroundSize: "72px 72px" }}
        aria-hidden="true"
      />
      <div className="hidden xl:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-4 text-faint" aria-hidden="true">
        <span className="font-mono text-[10px] tracking-[0.5em] [writing-mode:vertical-rl] rotate-180">INTERSTATE LEDGER · MM 2026</span>
        <span className="w-px h-24 bg-gradient-to-b from-transparent via-amber to-transparent" />
      </div>

      <div ref={ref} className={`relative max-w-7xl mx-auto px-5 md:px-8 pt-32 md:pt-36 pb-12 grid lg:grid-cols-12 gap-10 lg:gap-10 items-center ${on ? "on" : ""}`}>
        <div className="lg:col-span-7">
          <div className="rv flex items-center gap-3 mb-7">
            <span className="lanes lanes-slow w-16" aria-hidden="true" />
            <span className="font-mono text-[10.5px] md:text-[11px] tracking-[0.26em] text-amberdark font-semibold">IFTA · PROFIT PER MILE · TAX RECORDS — FOR OWNER-OPERATORS</span>
          </div>

          <h1 className="font-display uppercase leading-[0.94] text-ink text-[3.1rem] sm:text-7xl md:text-8xl xl:text-[6.8rem] tracking-[0.01em]">
            <span className="mask-line"><span>Miles up.</span></span>
            <span className="mask-line"><span>Margin down?</span></span>
            <span className="mask-line"><span className="text-amberdark">We do the math.</span></span>
          </h1>

          <p className="rv mt-8 max-w-xl text-lg md:text-xl text-dim leading-relaxed font-medium" style={{ transitionDelay: "250ms" }}>
            Brokers quote a rate. Diesel takes its cut. Deadhead takes another. By the time the check clears, nobody knows what the load actually paid. <span className="text-ink font-semibold">Trucker Life AI voice-logs every load, prices every mile — loaded and empty — and files IFTA and taxes while you drive.</span>
          </p>

          <div className="rv mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5" style={{ transitionDelay: "400ms" }}>
            <AppStoreButton big />
            <Link
              to="/calculator"
              className="group flex items-center justify-center gap-3 border-2 border-ink text-ink px-6 py-4 font-bold hover:bg-ink hover:text-paper transition-colors duration-300"
            >
              Run your numbers
              <IconArrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>

          <ul className="rv mt-8 flex flex-wrap gap-x-6 gap-y-2" style={{ transitionDelay: "520ms" }}>
            {["14-day free trial", "No credit card", "Built by a trucker"].map((t) => (
              <li key={t} className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-dim">
                <IconCheck className="w-3.5 h-3.5 text-money" />
                {t.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="absolute -top-8 -right-1 rotate-[8deg] hidden md:block z-10" aria-hidden="true">
            <span className="stamp text-money text-sm bg-panel/80">TRUE RPM<br />VERIFIED</span>
          </div>
          <Ledger />
          <p className="mt-5 font-mono text-[10.5px] text-faint text-center tracking-[0.14em]">
            LIVE DASHBOARD — WHAT MAY ACTUALLY LOOKS LIKE INSIDE THE APP
          </p>
        </div>
      </div>

      {/* road strip */}
      <div className="relative" aria-hidden="true">
        <div className="h-14 bg-coal border-t-4 border-amber overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 lanes" />
          <div className="run-truck absolute top-1/2 -translate-y-[68%] text-chalk">
            <svg viewBox="0 0 90 28" className="w-20 h-7" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="1" y="4" width="52" height="15" />
              <path d="M53 9h12l8 7v3H53z" />
              <circle cx="14" cy="21" r="4" /><circle cx="30" cy="21" r="4" /><circle cx="62" cy="21" r="4" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= bleed report ================= */

function BleedReport() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHead
          eyebrow="◆ THE BLEED REPORT"
          tone="alert"
          lines={[
            "You're working hard.",
            <span key="a" className="text-faint">The numbers don't add up.</span>,
            <span key="b">Here's <span className="text-alert">why.</span></span>,
          ]}
          lede="Three quiet leaks sink more owner-operators than bad freight ever will. All three are fixable — if you can see them."
        />
        <div className="mt-9 border-t-2 border-ink">
          {PROBLEMS.map((p, i) => (
            <BleedRow key={p.idx} p={p} delay={i * 110} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BleedRow({ p, delay }: { p: (typeof PROBLEMS)[number]; delay: number }) {
  const { ref, on } = useInView<HTMLDivElement>(0.2);
  return (
    <div
      ref={ref}
      className={`rv ${on ? "on" : ""} group grid md:grid-cols-12 gap-4 md:gap-8 items-start border-b border-line py-8 md:py-11 px-2 md:px-4 hover:bg-panel hover:px-6 md:hover:px-8 transition-all duration-500`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="md:col-span-1 font-display text-4xl md:text-5xl leading-none text-line group-hover:text-amber transition-colors duration-500">{p.idx}</div>
      <div className="md:col-span-6">
        <h3 className="font-display uppercase text-2xl md:text-3xl text-ink tracking-wide group-hover:translate-x-1.5 transition-transform duration-500">{p.title}</h3>
        <p className="mt-3.5 text-dim leading-relaxed max-w-xl text-[16.5px]">{p.body}</p>
      </div>
      <div className="md:col-span-5 md:text-right">
        <div className="inline-block text-left md:text-right">
          <div className="font-display text-4xl md:text-5xl text-alert tabular-nums group-hover:scale-105 origin-left md:origin-right transition-transform duration-500">{p.stat}</div>
          <div className="font-mono text-[10.5px] tracking-[0.2em] text-faint mt-2 uppercase">{p.statLabel}</div>
        </div>
      </div>
    </div>
  );
}

/* ================= five tools ================= */

function ToolsStrip() {
  return (
    <section className="py-12 md:py-16 bg-panel border-y border-line">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="THE CO-DRIVER SEAT"
            lines={["Five tools.", "One back office.", <span key="x" className="text-amberdark">Zero typing.</span>]}
            lede="Everything a one-truck operation needs to know its real numbers — built for the cab, not the cubicle."
          />
          <Reveal delay={200} className="mb-1">
            <Link to="/features" className="group inline-flex items-center gap-3 border-2 border-ink px-6 py-3.5 font-bold text-ink hover:bg-ink hover:text-paper transition-colors duration-300">
              See all five
              <IconArrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-8 border-t-2 border-ink">
          {FEATURES.map((f, i) => (
            <ToolRow key={f.id} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolRow({ f, i }: { f: (typeof FEATURES)[number]; i: number }) {
  const { ref, on } = useInView<HTMLAnchorElement>(0.2);
  return (
    <Link
      to="/features"
      ref={ref}
      className={`rv ${on ? "on" : ""} group grid sm:grid-cols-12 gap-3 sm:gap-6 items-center border-b border-line py-6 px-2 md:px-4 hover:bg-sink/70 hover:px-5 md:hover:px-8 transition-all duration-500`}
      style={{ transitionDelay: `${i * 70}ms` }}
    >
      <div className="sm:col-span-1 font-mono text-xs text-faint">{f.num}</div>
      <div className="sm:col-span-4 flex items-center gap-3.5">
        <span className="w-11 h-11 shrink-0 border border-ink/20 bg-panel flex items-center justify-center text-amberdark group-hover:bg-ink group-hover:text-amber group-hover:border-ink transition-colors duration-300">
          {f.icon}
        </span>
        <span className="font-display uppercase text-xl md:text-2xl text-ink tracking-wide">{f.name}</span>
      </div>
      <div className="sm:col-span-6 text-dim text-[15.5px] leading-snug">{f.short}</div>
      <div className="sm:col-span-1 sm:text-right">
        <IconArrow className="w-5 h-5 inline-block text-faint group-hover:text-amberdark group-hover:translate-x-1.5 transition-all duration-300" />
      </div>
    </Link>
  );
}

/* ================= pick a load ================= */

function LoadTruth() {
  const [sel, setSel] = useState(0);
  const load = LOADS[sel];
  const total = load.loaded + load.deadhead;
  const trueRpm = (load.gross - load.fuel + load.extras) / total;
  const breakeven = 1.85;
  const verdict = trueRpm >= 2.3 ? "RUN IT" : trueRpm >= breakeven ? "THINK TWICE" : "WALK AWAY";
  const vColor = verdict === "RUN IT" ? "text-money border-money" : verdict === "THINK TWICE" ? "text-amberdark border-amberdark" : "text-alert border-alert";

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHead
          eyebrow="BEFORE YOU SAY YES"
          lines={["Pick a load.", <span key="b" className="text-amberdark">See the truth.</span>]}
          lede="Three quotes from a real week. The broker rate looks fine on all of them — but only one survives deadhead, diesel, and detention. This is exactly what the app shows you before you commit."
        />

        <div className="mt-8 grid lg:grid-cols-12 gap-8 items-start">
          {/* load cards */}
          <div className="lg:col-span-5 space-y-3">
            {LOADS.map((l, i) => {
              const t = (l.gross - l.fuel + l.extras) / (l.loaded + l.deadhead);
              const active = i === sel;
              return (
                <button
                  key={l.id}
                  onClick={() => setSel(i)}
                  aria-pressed={active}
                  className={`w-full text-left border-2 p-4 md:p-5 transition-all duration-300 group ${
                    active ? "border-ink bg-ink text-paper shadow-[6px_6px_0_rgba(255,180,0,0.9)]" : "border-line bg-panel hover:border-ink/50 hover:-translate-y-0.5"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-3 min-w-0">
                      <span className={`font-display text-lg ${active ? "text-amber" : "text-faint"}`}>{l.id}</span>
                      <span className={`font-display uppercase text-xl tracking-wide truncate ${active ? "text-paper" : "text-ink"}`}>{l.lane}</span>
                    </span>
                    <span className={`font-mono text-xs shrink-0 ${active ? "text-paper/70" : "text-faint"}`}>{l.quoted}</span>
                  </div>
                  <div className={`mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] tracking-[0.08em] ${active ? "text-paper/70" : "text-dim"}`}>
                    <span>GROSS ${l.gross.toLocaleString()}</span>
                    <span>{l.loaded} LOADED MI</span>
                    <span className={active ? "text-alarm" : "text-alert"}>+{l.deadhead} DEADHEAD</span>
                  </div>
                  <div className={`mt-3 pt-2.5 border-t border-dashed flex items-center justify-between ${active ? "border-paper/20" : "border-line"}`}>
                    <span className={`font-mono text-[10px] tracking-[0.2em] ${active ? "text-paper/60" : "text-faint"}`}>TRUE RATE</span>
                    <span className={`font-display text-2xl ${active ? "text-amber" : "text-ink"}`}>${t.toFixed(2)}<span className="text-xs">/mi</span></span>
                  </div>
                </button>
              );
            })}
            <p className="font-mono text-[10.5px] text-faint tracking-[0.1em] pt-1">* ASSUMES $1.85/MI ALL-IN BREAK-EVEN — SET YOURS IN THE APP</p>
          </div>

          {/* settlement sheet */}
          <div className="lg:col-span-7">
            <Reveal className="relative">
              <div key={load.id} className="rv on relative bg-panel border-2 border-ink p-6 md:p-8 shadow-[10px_10px_0_rgba(26,28,31,0.12)]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-line pb-4">
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.28em] text-faint">SETTLEMENT SHEET · LOAD {load.id}</div>
                    <div className="font-display text-2xl md:text-3xl text-ink tracking-wide mt-1">{load.lane}</div>
                  </div>
                  <span key={verdict} className={`stamp text-lg md:text-xl ${vColor}`}>{verdict}</span>
                </div>

                <dl className="mt-5 space-y-2.5 font-mono text-sm">
                  {[
                    ["GROSS PAY", `+$${load.gross.toLocaleString()}`, "text-ink"],
                    ["LOADED MILES", `${load.loaded.toLocaleString()} mi @ ${load.quoted}`, "text-dim"],
                    ["DEADHEAD MILES", `+${load.deadhead} mi @ $0.00`, "text-alert"],
                    ["DIESEL EST.", `−$${load.fuel}`, "text-alert"],
                    ...(load.extras ? [["ACCESSORIALS", `+$${load.extras}`, "text-money"] as [string, string, string]] : []),
                  ].map(([k, v, c]) => (
                    <div key={k} className="flex justify-between border-b border-dashed border-line pb-2">
                      <dt className="text-[12px] tracking-[0.14em] text-faint">{k}</dt>
                      <dd className={`font-semibold ${c}`}>{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="bg-sink/70 border border-line p-4">
                    <div className="font-mono text-[10px] tracking-[0.2em] text-faint">LOADED-MILE RATE</div>
                    <div className="font-display text-3xl text-ink mt-1">${((load.gross) / load.loaded).toFixed(2)}<span className="text-sm">/mi</span></div>
                  </div>
                  <div className="bg-ink text-paper p-4 relative overflow-hidden">
                    <div className="font-mono text-[10px] tracking-[0.2em] text-paper/50">TRUE RATE · ALL MILES</div>
                    <div className={`font-display text-3xl mt-1 ${verdict === "RUN IT" ? "text-mint" : verdict === "THINK TWICE" ? "text-amber" : "text-alarm"}`}>${trueRpm.toFixed(2)}<span className="text-sm">/mi</span></div>
                  </div>
                </div>

                <p className="mt-5 text-dim leading-relaxed text-[15px]">
                  {verdict === "RUN IT" && <>Now that's freight. ${(trueRpm - breakeven).toFixed(2)}/mi above break-even, deadhead under 12%. Book it, log it by voice, and keep rolling.</>}
                  {verdict === "THINK TWICE" && <>Technically above break-even — but one detention hour or a fuel spike erases it. Re-quote the rate or find a backhaul before committing.</>}
                  {verdict === "WALK AWAY" && <>That ${(trueRpm).toFixed(2)}/mi is ${ (breakeven - trueRpm).toFixed(2)} under break-even for every one of those {total.toLocaleString()} miles. This is the load the app saves you from.</>}
                </p>
              </div>
            </Reveal>
            <div className="mt-6 flex flex-col sm:flex-row gap-3.5">
              <Link to="/calculator" className="group inline-flex items-center justify-center gap-3 bg-amber text-ink font-bold px-6 py-3.5 hover:bg-ink hover:text-amber transition-colors duration-300">
                Open the True Rate Calculator
                <IconArrow className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </Link>
              <Link to="/ifta" className="inline-flex items-center justify-center gap-3 border-2 border-ink/25 font-bold text-ink px-6 py-3.5 hover:border-ink transition-colors duration-300">
                How IFTA gets handled →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= stats band ================= */

function BigStat({ value, prefix, suffix, label, on, delay }: { value: number; prefix?: string; suffix?: string; label: string; on: boolean; delay: number }) {
  const v = useCountUp(value, on, { prefix, suffix, duration: 1900 });
  return (
    <div className="rv group text-center py-7 md:py-8 px-6" style={{ transitionDelay: `${delay}ms` }}>
      <div className="font-display text-4xl sm:text-5xl md:text-6xl text-chalk tabular-nums group-hover:text-amber transition-colors duration-500">{v}</div>
      <div className="font-mono text-[10.5px] tracking-[0.22em] text-dim mt-3 uppercase">{label}</div>
    </div>
  );
}

function StatsBand() {
  const { ref, on } = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={`bg-coal ${on ? "on" : ""}`}>
      <div className="lanes opacity-70" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line-dark">
        <BigStat value={587000} label="Owner-operators in the US" on={on} delay={0} />
        <BigStat value={940} prefix="$" suffix="B" label="Trucking industry" on={on} delay={120} />
        <BigStat value={10} label="Years owner-operator experience behind this app" on={on} delay={240} />
      </div>
      <div className="lanes opacity-70" aria-hidden="true" />
    </div>
  );
}

/* ================= testimonial ================= */

function Testimonial() {
  const { ref, on } = useInView<HTMLDivElement>(0.15);
  return (
    <section className="relative min-h-[58vh] md:min-h-[72vh] flex items-center overflow-hidden kenburns">
      <img
        src={heroCabNight}
        alt="View from inside a truck cab at night on an open highway"
        width={1920}
        height={1080}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover bg-coal"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/85 to-paper/25" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-paper/40" aria-hidden="true" />

      <div ref={ref} className={`relative max-w-7xl mx-auto px-5 md:px-8 py-14 md:py-16 w-full ${on ? "on" : ""}`}>
        <div className="max-w-3xl">
          <div className="rv font-display text-amberdark text-6xl leading-none mb-4" aria-hidden="true">"</div>
          <blockquote className="rv font-display uppercase text-ink text-3xl sm:text-5xl md:text-6xl leading-[1.05]" style={{ transitionDelay: "120ms" }}>
            <span className="mask-line"><span>I finally know what</span></span>
            <span className="mask-line"><span>I'm <span className="text-amberdark">actually</span> making —</span></span>
            <span className="mask-line"><span>mile by mile.</span></span>
          </blockquote>
          <div className="rv mt-8 flex items-center gap-4" style={{ transitionDelay: "300ms" }}>
            <span className="lanes w-14" aria-hidden="true" />
            <div>
              <div className="font-bold text-ink text-lg">Owner-operator · Peterbilt 389</div>
              <div className="font-mono text-[11px] tracking-[0.2em] text-dim mt-1">RUNNING I-40 · ALBUQUERQUE, NM</div>
            </div>
          </div>
          <div className="rv mt-10 flex flex-wrap gap-3" style={{ transitionDelay: "420ms" }}>
            {[["15.8%", "net margin tracked"], ["89%", "loaded miles"], ["11%", "deadhead caught"]].map(([v, l]) => (
              <div key={l} className="flex items-baseline gap-2.5 border border-line bg-panel/85 backdrop-blur-sm px-5 py-3.5 hover:border-amber transition-colors duration-300">
                <span className="font-display text-2xl text-amberdark">{v}</span>
                <span className="font-mono text-[10px] tracking-[0.16em] text-dim uppercase">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= blog preview ================= */

function BlogPreview() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="OWNER-OPERATOR BLOG"
            lines={["Load math,", "IFTA, and the", <span key="c" className="text-amberdark">real numbers.</span>]}
          />
          <Reveal delay={200} className="mb-1">
            <Link to="/blog" className="group inline-flex items-center gap-3 border-2 border-ink px-6 py-3.5 font-bold text-ink hover:bg-ink hover:text-paper transition-colors duration-300">
              All guides
              <IconArrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {BLOG.map((b, i) => (
            <BlogCard key={b.num} b={b} delay={i * 110} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ b, delay }: { b: (typeof BLOG)[number]; delay: number }) {
  const { ref, on } = useInView<HTMLAnchorElement>(0.15);
  return (
    <Link
      ref={ref}
      to={b.url}
      className={`rv ${on ? "on" : ""} group flex flex-col border border-line bg-panel p-6 hover:border-ink hover:-translate-y-1.5 hover:shadow-[8px_8px_0_rgba(255,180,0,0.85)] transition-all duration-400`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.22em] text-amberdark font-semibold">{b.category}</span>
        <span className="font-display text-2xl text-line group-hover:text-amber transition-colors duration-300">{b.num}</span>
      </div>
      <h3 className="mt-4 font-display uppercase text-xl leading-tight text-ink tracking-wide">{b.title}</h3>
      <p className="mt-3 text-dim text-[15px] leading-relaxed flex-1">{b.excerpt}</p>
      <div className="mt-5 pt-4 border-t border-dashed border-line flex items-center justify-between">
        <span className="font-mono text-[10.5px] tracking-[0.18em] text-faint">IN THE APP</span>
        <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-ink font-semibold group-hover:text-amberdark">
          OPEN <IconArrow className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
        </span>
      </div>
    </Link>
  );
}

/* ================= final CTA ================= */

function FinalCTA() {
  return (
    <section className="pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="relative bg-amber text-ink overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Crect x='14' y='14' width='20' height='20' transform='rotate(45 24 24)' fill='none' stroke='%231a1c1f' stroke-width='2'/%3E%3C/svg%3E\")" }}
              aria-hidden="true"
            />
            <div className="relative border-4 border-ink/85 m-3 md:m-4 px-6 py-12 md:py-16 grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-8">
                <div className="font-mono text-[11px] tracking-[0.35em] font-bold mb-5">◆ FINAL EXIT · YOUR BUSINESS</div>
                <h2 className="font-display uppercase leading-[0.95] text-4xl sm:text-6xl md:text-7xl">
                  <span className="mask-line"><span>Know your numbers.</span></span>
                  <span className="mask-line"><span>Own your business.</span></span>
                </h2>
                <p className="mt-5 max-w-xl text-lg font-semibold text-ink/80">
                  Join the owner-operators who finally know exactly what they're making — mile by mile, load by load, quarter by quarter.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <AppStoreButton dark big />
                <div className="mt-4 font-mono text-[11px] tracking-[0.2em] text-ink/70 font-semibold">
                  FREE 14-DAY TRIAL · NO CREDIT CARD REQUIRED
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= page ================= */

export default function Home() {
  return (
    <>
      <SEO path="/" {...SEO_ROUTES["/"]} />
      <Hero />
      <Marquee />
      <BleedReport />
      <ToolsStrip />
      <LoadTruth />
      <StatsBand />
      <Testimonial />
      <BlogPreview />
      <FinalCTA />
    </>
  );
}
