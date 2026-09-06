import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useInView } from "../hooks";
import { FEATURES } from "../data";
import { AppStoreButton, PageHeader, Reveal, SEO } from "../shared";

/* ---------- phone shell (product UI stays in night mode) ---------- */
function Phone({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="relative w-[260px] sm:w-[290px] mx-auto group">
      <div className="absolute -inset-3 bg-amber/25 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />
      <div className="relative border-[3px] border-ink bg-coal rounded-[2.2rem] p-3 shadow-[0_30px_70px_-25px_rgba(26,28,31,0.55)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[0.6deg]">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-line-dark rounded-b-xl z-10" aria-hidden="true" />
        <div className="rounded-[1.6rem] overflow-hidden bg-coal border border-line-dark">
          <div className="flex items-center justify-between px-4 pt-8 pb-2 border-b border-line-dark bg-panel-dark/70">
            <span className="font-mono text-[9px] tracking-[0.22em] text-faint">{label}</span>
            <span className="flex gap-1">
              <span className="w-1 h-1 bg-faint rounded-full" /><span className="w-1 h-1 bg-faint rounded-full" /><span className="w-1 h-1 bg-amber rounded-full" />
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

const Micro = ({ children }: { children: ReactNode }) => (
  <div className="font-mono text-[10.5px] text-dim leading-relaxed">{children}</div>
);

function ScreenVoice() {
  return (
    <div className="p-3.5 space-y-2.5 h-[380px] flex flex-col">
      <div className="flex items-center gap-2 text-amber">
        <span className="flex items-end gap-[3px] h-4" aria-hidden="true">
          {[3, 7, 11, 6, 9, 4, 8].map((h, i) => (
            <span key={i} className="w-[3px] bg-amber animate-pulse" style={{ height: h, animationDelay: `${i * 110}ms` }} />
          ))}
        </span>
        <Micro><span className="text-amber">LISTENING…</span> 65 MPH, I-40 E</Micro>
      </div>
      <div className="ml-6 bg-panel-dark border border-line-dark p-2.5 text-chalk font-mono text-[10.5px] leading-relaxed">
        "Logged 612 miles Amarillo to Albuquerque. Fuel was $486 in Texas."
      </div>
      <div className="mr-4 bg-amber/10 border border-amber/30 p-2.5">
        <Micro>
          <span className="text-amber font-semibold">CO-DRIVER:</span> Done. Load booked —
          <span className="text-chalk"> 612 mi</span>, fuel <span className="text-chalk">$486 → TX</span>. NM miles tracked for IFTA.
        </Micro>
      </div>
      <div className="mt-auto space-y-1.5">
        {[["MILES LOGGED", "612"], ["STATES TOUCHED", "TX · NM"], ["IFTA STATUS", "AUTO"]].map(([k, v]) => (
          <div key={k} className="flex justify-between font-mono text-[9.5px] tracking-[0.15em] text-faint border-b border-dashed border-line-dark pb-1">
            <span>{k}</span><span className="text-mint">{v}</span>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-1 w-11 h-11 rounded-full bg-amber flex items-center justify-center shadow-[0_0_30px_rgba(255,180,0,0.4)]">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-ink" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><rect x="9" y="3" width="6" height="10" rx="3" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" /></svg>
      </div>
    </div>
  );
}

function ScreenRate() {
  return (
    <div className="p-3.5 h-[380px] flex flex-col">
      <Micro><span className="text-faint tracking-[0.2em] text-[9px]">LOAD #0417 · DFW → PHX</span></Micro>
      <div className="mt-2 bg-panel-dark border border-line-dark p-3">
        <div className="flex justify-between items-baseline">
          <span className="font-display text-2xl text-chalk">$1,840</span>
          <span className="font-mono text-[9.5px] text-mint">BROKER RATE $2.45/MI</span>
        </div>
        <div className="mt-2.5 space-y-1.5">
          {[
            ["LOADED MILES", "751 mi", "text-chalk"],
            ["DEADHEAD", "+210 mi", "text-alarm"],
            ["FUEL EST.", "−$486", "text-alarm"],
          ].map(([k, v, c]) => (
            <div key={k} className={`flex justify-between font-mono text-[10px] tracking-[0.12em] border-b border-dashed border-line-dark pb-1 ${c}`}>
              <span className="text-faint">{k}</span><span>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between bg-alert/10 border border-alert/40 p-3">
        <div>
          <div className="font-mono text-[9px] tracking-[0.2em] text-alarm">TRUE RATE / TOTAL MILE</div>
          <div className="font-display text-3xl text-alarm mt-0.5">$1.51</div>
        </div>
        <span className="stamp text-alarm text-[10px]">LOWBALL</span>
      </div>
      <Micro><span className="text-amber">⚠ 39¢/mi below</span> your break-even of $1.90. Walk or re-quote.</Micro>
      <div className="mt-auto grid grid-cols-2 gap-2">
        <div className="border border-line-dark text-center py-2 font-mono text-[10px] tracking-[0.18em] text-dim">RE-QUOTE</div>
        <div className="bg-mint/15 border border-mint/40 text-center py-2 font-mono text-[10px] tracking-[0.18em] text-mint">FIND BACKHAUL</div>
      </div>
    </div>
  );
}

function ScreenIfta() {
  const rows: [string, string, string][] = [
    ["TX", "2,410 mi", "388 gal"],
    ["NM", "1,120 mi", "181 gal"],
    ["AZ", "964 mi", "156 gal"],
    ["OK", "743 mi", "119 gal"],
  ];
  return (
    <div className="p-3.5 h-[380px] flex flex-col">
      <div className="flex justify-between items-center">
        <Micro><span className="text-faint text-[9px] tracking-[0.2em]">IFTA · Q2 2026</span></Micro>
        <span className="font-mono text-[9px] px-1.5 py-0.5 bg-mint/15 text-mint tracking-[0.15em]">ON TRACK</span>
      </div>
      <div className="mt-2.5">
        <div className="grid grid-cols-3 font-mono text-[9px] tracking-[0.18em] text-faint pb-1.5 border-b border-line-dark">
          <span>STATE</span><span className="text-right">MILES</span><span className="text-right">FUEL</span>
        </div>
        {rows.map(([s, m, f]) => (
          <div key={s} className="grid grid-cols-3 font-mono text-[10.5px] text-dim py-2 border-b border-dashed border-line-dark">
            <span className="text-chalk font-semibold">{s}</span><span className="text-right">{m}</span><span className="text-right">{f}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 bg-panel-dark border border-line-dark p-2.5">
        {[["TX", 82], ["NM", 54], ["AZ", 41], ["OK", 30]].map(([s, w]) => (
          <div key={s as string} className="flex items-center gap-2 py-1">
            <span className="font-mono text-[9px] text-faint w-6">{s}</span>
            <span className="h-2 bg-amber/85" style={{ width: `${w}%` }} />
          </div>
        ))}
      </div>
      <Micro><span className="text-mint">✓</span> 11 weeks logged · audit-ready per jurisdiction</Micro>
      <div className="mt-auto bg-amber text-ink text-center py-2.5 font-mono text-[10px] tracking-[0.22em] font-bold">EXPORT Q2 FILING</div>
    </div>
  );
}

function ScreenAdvisor() {
  return (
    <div className="p-3.5 h-[380px] flex flex-col gap-2.5">
      <Micro><span className="text-faint text-[9px] tracking-[0.2em]">AI ADVISOR · WEEKLY BRIEF</span></Micro>
      <div className="mr-4 bg-panel-dark border border-line-dark p-2.5">
        <Micro>
          Fuel spend is <span className="text-alarm font-semibold">up 12%</span> vs April. Your I-40 corridor loads ran
          <span className="text-alarm"> 31¢/mi under</span> your other lanes.
        </Micro>
      </div>
      <div className="flex items-end gap-[5px] h-14 px-1" aria-hidden="true">
        {[38, 52, 44, 60, 47, 66, 58, 72, 64, 80].map((h, i) => (
          <span key={i} className={`flex-1 ${i >= 8 ? "bg-amber" : "bg-line-dark"}`} style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="mr-4 bg-panel-dark border border-line-dark p-2.5">
        <Micro>
          Best lane this month: <span className="text-mint font-semibold">DFW → OKC at $2.62 true RPM.</span> I can flag anything under $1.90 before you book it.
        </Micro>
      </div>
      <div className="mt-auto space-y-1.5">
        <div className="bg-amber/10 border border-amber/30 text-center py-2 font-mono text-[10px] tracking-[0.18em] text-amber">SET $1.90 FLOOR ALERT</div>
        <div className="border border-line-dark text-center py-2 font-mono text-[10px] tracking-[0.18em] text-dim">SHOW ME THE LANES</div>
      </div>
    </div>
  );
}

function ScreenTax() {
  const rows: [string, string][] = [
    ["FUEL", "$18,540"],
    ["MAINTENANCE", "$6,210"],
    ["PERMITS & IFTA", "$1,180"],
    ["MEALS (80%)", "$2,870"],
    ["INSURANCE", "$9,400"],
  ];
  return (
    <div className="p-3.5 h-[380px] flex flex-col">
      <div className="flex justify-between items-center">
        <Micro><span className="text-faint text-[9px] tracking-[0.2em]">TAX CENTER · TY 2026</span></Micro>
        <span className="font-mono text-[9px] text-mint tracking-[0.15em]">CPA-READY</span>
      </div>
      <div className="mt-2.5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between items-center font-mono text-[10.5px] py-2 border-b border-dashed border-line-dark">
            <span className="flex items-center gap-2 text-dim tracking-[0.1em]">
              <svg viewBox="0 0 24 24" className="w-3 h-3 text-mint" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M4 12.5l5.2 5.2L20 6.5" /></svg>
              {k}
            </span>
            <span className="text-chalk tabular-nums">{v}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between items-baseline bg-mint/10 border border-mint/30 p-2.5">
        <span className="font-mono text-[9px] tracking-[0.18em] text-mint">TRACKED DEDUCTIONS</span>
        <span className="font-display text-2xl text-mint">$38,200</span>
      </div>
      <Micro><span className="text-faint">Est. tax saved vs untracked:</span> <span className="text-mint font-semibold">$8,400</span></Micro>
      <div className="mt-auto bg-chalk text-ink text-center py-2.5 font-mono text-[10px] tracking-[0.22em] font-bold">EXPORT FOR MY CPA</div>
    </div>
  );
}

const SCREENS: Record<string, ReactNode> = {
  voice: <ScreenVoice />,
  rate: <ScreenRate />,
  ifta: <ScreenIfta />,
  advisor: <ScreenAdvisor />,
  tax: <ScreenTax />,
};

/* ---------- page ---------- */

export default function FeaturesPage() {
  const [active, setActive] = useState(FEATURES[0].id);
  const panelRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const els = Object.values(panelRefs.current).filter(Boolean) as HTMLElement[];
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.getAttribute("data-feature") || FEATURES[0].id);
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <SEO
        path="/features"
        title="Features — Voice Logging, True Rate, IFTA & Tax Records | Trucker Life AI"
        description="Five tools built for the cab: voice-load logging, a true rate calculator with deadhead included, IFTA reports by state, an AI advisor, and tax-ready records. Made for owner-operators."
      />
      <PageHeader
        crumb="FEATURES"
        eyebrow="BUILT FOR THE CAB, NOT THE CUBICLE"
        lines={[
          "Five tools.",
          <span key="a">One <span className="text-amber">co-driver.</span></span>,
          <span key="b">Zero typing.</span>,
        ]}
        lede="Every feature exists to answer one question: what is this truck actually making? Here's the whole back office, riding shotgun."
        meta={[["TOOLS", "5"], ["AVG LOG TIME", "14 SEC"], ["STATES TRACKED", "50"]]}
      />

      <section className="py-12 md:py-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-10">
            {/* sticky rail */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <Reveal>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="lanes lanes-slow w-16" aria-hidden="true" />
                    <span className="font-mono text-[11px] tracking-[0.3em] text-amberdark font-semibold">HOW IT RIDES WITH YOU</span>
                  </div>
                  <h2 className="font-display uppercase leading-[0.98] text-ink text-4xl sm:text-5xl">
                    Pick a tool.
                    <br />
                    <span className="text-amberdark">Watch it work.</span>
                  </h2>
                  <p className="mt-5 text-dim text-lg leading-relaxed max-w-md">
                    These are the actual screens — what the app does while you do your job. Scroll and each one takes the wheel.
                  </p>
                </Reveal>
                <nav className="mt-8 border-t-2 border-ink" aria-label="Feature list">
                  {FEATURES.map((f) => {
                    const isOn = active === f.id;
                    return (
                      <a
                        key={f.id}
                        href={`#f-${f.id}`}
                        className={`group flex items-center gap-4 border-b border-line py-4 px-2 transition-all duration-300 ${isOn ? "bg-panel pl-5" : "hover:pl-4"}`}
                      >
                        <span className={`font-mono text-xs transition-colors ${isOn ? "text-amberdark" : "text-faint"}`}>{f.num}</span>
                        <span className={`font-display text-lg md:text-xl tracking-wide uppercase transition-colors duration-300 ${isOn ? "text-ink" : "text-faint group-hover:text-dim"}`}>
                          {f.name}
                        </span>
                        <span className={`ml-auto h-1 transition-all duration-500 ${isOn ? "w-10 bg-amber" : "w-0 bg-line"}`} aria-hidden="true" />
                      </a>
                    );
                  })}
                </nav>
                <div className="mt-8 hidden lg:block">
                  <AppStoreButton />
                </div>
              </div>
            </div>

            {/* scrolling panels */}
            <div className="lg:col-span-7 space-y-16 lg:space-y-20 lg:pt-4">
              {FEATURES.map((f, i) => (
                <FeaturePanel
                  key={f.id}
                  id={f.id}
                  flip={i % 2 === 1}
                  num={f.num}
                  name={f.name}
                  tag={f.tag}
                  copy={f.copy}
                  proof={f.proof}
                  icon={f.icon}
                  screen={SCREENS[f.id]}
                  setRef={(el) => {
                    panelRefs.current[f.id] = el;
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* bottom CTA strip */}
      <section className="pb-12 md:pb-14">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="bg-coal text-chalk px-6 py-10 md:p-12 relative overflow-hidden">
              <div className="lanes absolute top-0 left-0 right-0 opacity-80" aria-hidden="true" />
              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-8">
                  <h2 className="font-display uppercase text-3xl md:text-5xl leading-tight">
                    One truck. One driver.
                    <br />
                    <span className="text-amber">A whole back office.</span>
                  </h2>
                  <p className="mt-4 text-dim text-lg max-w-xl">Try all five free for 14 days. If it doesn't pay for itself the first week, it isn't worth your dash space.</p>
                </div>
                <div className="md:col-span-4 md:text-right">
                  <AppStoreButton dark big />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function FeaturePanel({
  id, flip, num, name, tag, copy, proof, icon, screen, setRef,
}: {
  id: string; flip: boolean; num: string; name: string; tag: string; copy: string; proof: string; icon: ReactNode; screen: ReactNode;
  setRef: (el: HTMLElement | null) => void;
}) {
  const { ref, on } = useInView<HTMLDivElement>(0.18);
  return (
    <div
      id={`f-${id}`}
      data-feature={id}
      ref={(el) => {
        ref.current = el;
        setRef(el);
      }}
      className={`rv ${on ? "on" : ""}`}
    >
      <div className={`grid sm:grid-cols-2 gap-10 items-center ${flip ? "sm:[direction:rtl]" : ""}`}>
        <div className="sm:[direction:ltr]">
          <Phone label={`${num} · ${name.toUpperCase()}`}>{screen}</Phone>
        </div>
        <div className="sm:[direction:ltr]">
          <div className="flex items-center gap-3 text-amberdark">
            {icon}
            <span className="font-mono text-[10.5px] tracking-[0.28em] font-semibold">{tag}</span>
          </div>
          <h3 className="font-display uppercase text-3xl md:text-4xl text-ink mt-4 leading-tight">{name}</h3>
          <p className="mt-4 text-dim text-lg leading-relaxed">{copy}</p>
          <div className="mt-5 inline-flex items-center gap-2.5 border border-line bg-panel px-3.5 py-2 font-mono text-[10px] tracking-[0.16em] text-amberdark font-semibold">
            ◆ {proof}
          </div>
        </div>
      </div>
    </div>
  );
}
