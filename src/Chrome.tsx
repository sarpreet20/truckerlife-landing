import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { APP_STORE_URL, IconApple, IconArrow, Logo, TICKER } from "./data";
import { Marquee } from "./shared";

export const NAV_LINKS = [
  { to: "/features", label: "Features" },
  { to: "/calculator", label: "True Rate" },
  { to: "/ifta", label: "IFTA" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/story", label: "Our Story" },
];

/* ================= dispatch ticker ================= */

function DispatchTicker() {
  return (
    <div className="bg-coal text-faint border-b border-line-dark overflow-hidden" aria-hidden="true">
      <div className="marquee py-1.5" style={{ ["--marquee-speed" as string]: "38s" }}>
        <div className="marquee-track items-center">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center whitespace-nowrap font-mono text-[10.5px] tracking-[0.18em]">
              <span className={`w-1.5 h-1.5 mx-4 ${i % 2 ? "bg-amber" : "bg-line-dark"}`} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= nav ================= */

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => setOpen(false), [loc.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className={`overflow-hidden transition-all duration-300 ${scrolled ? "max-h-0" : "max-h-10"}`}>
        <DispatchTicker />
      </div>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-paper/95 backdrop-blur-md border-b border-line shadow-[0_8px_30px_-18px_rgba(26,28,31,0.35)]" : "bg-paper border-b border-line"
        }`}
        style={{ top: 0 }}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-[68px] flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Trucker Life AI — home">
            <Logo className="w-9 h-9 transition-transform duration-500 group-hover:rotate-90" />
            <span className="leading-none">
              <span className="block font-display text-lg tracking-wide text-ink">TRUCKER LIFE</span>
              <span className="block font-mono text-[8.5px] tracking-[0.42em] text-amberdark mt-0.5">AI · OWNER-OPERATOR OS</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `relative font-semibold text-[15px] transition-colors duration-300 py-1 ${
                    isActive ? "text-ink" : "text-dim hover:text-ink"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span className={`absolute left-0 -bottom-0.5 h-[2.5px] bg-amber transition-all duration-300 ${isActive ? "w-full" : "w-0"}`} />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 bg-ink text-paper font-bold px-5 py-2.5 text-[15px] hover:bg-amber hover:text-ink transition-colors duration-300"
            >
              <IconApple className="w-4.5 h-4.5" />
              Free trial
            </a>
            {/* hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden relative w-11 h-11 border border-line bg-panel flex flex-col items-center justify-center gap-[5px] active:scale-95 transition-transform"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className={`block w-5 h-[2.5px] bg-ink transition-transform duration-300 ${open ? "rotate-45 translate-y-[7.5px]" : ""}`} />
              <span className={`block w-5 h-[2.5px] bg-amber transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-[2.5px] bg-ink transition-transform duration-300 ${open ? "-rotate-45 -translate-y-[7.5px]" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${open ? "visible" : "invisible"}`}
        aria-hidden={!open}
      >
        <div className={`absolute inset-0 bg-coal transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} onClick={() => setOpen(false)} />
        <div className={`absolute inset-0 bg-coal text-chalk flex flex-col pt-24 px-7 pb-10 transition-transform duration-500 ${open ? "translate-y-0" : "-translate-y-6"}`}>
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {NAV_LINKS.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                className={`group flex items-center justify-between border-b border-line-dark py-4 transition-all duration-500 ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] text-amber">0{i + 1}</span>
                  <span className="font-display uppercase text-3xl tracking-wide group-hover:text-amber transition-colors">{l.label}</span>
                </span>
                <IconArrow className="w-5 h-5 text-faint group-hover:text-amber group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-amber text-ink font-bold text-lg py-4 active:scale-[0.98] transition-transform"
            >
              <IconApple className="w-6 h-6" />
              Download for iOS — free 14-day trial
            </a>
            <p className="mt-4 text-center font-mono text-[10px] tracking-[0.22em] text-faint">NO CREDIT CARD · BUILT BY A TRUCKER</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ================= footer ================= */

const FOOT_LINKS: { head: string; links: [string, string, boolean][] }[] = [
  {
    head: "PRODUCT",
    links: [
      ["Features", "/features", false],
      ["True Rate Calculator", "/calculator", false],
      ["IFTA Center", "/ifta", false],
      ["Pricing", "/pricing", false],
      ["Download iOS", APP_STORE_URL, true],
    ],
  },
  {
    head: "RESOURCES",
    links: [
      ["Owner-Operator Blog", "/blog", false],
      ["Cost Per Mile Guide", "/calculator", false],
      ["IFTA Playbook", "/ifta", false],
      ["Load Profit Guide", "/calculator", false],
    ],
  },
  {
    head: "COMPANY",
    links: [
      ["Why We Built It", "/story", false],
      ["The Founder", "/story", false],
      ["Pricing & Trial", "/pricing", false],
      ["Owner-Operators Only", "/", false],
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-coal text-chalk">
      <Marquee dark speed="40s" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 md:py-16">
        <div className="grid md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <Logo className="w-10 h-10 transition-transform duration-500 group-hover:rotate-90" />
              <span className="leading-none">
                <span className="block font-display text-xl tracking-wide">TRUCKER LIFE</span>
                <span className="block font-mono text-[10px] tracking-[0.42em] text-amber mt-1">AI · EST. I-80</span>
              </span>
            </Link>
            <p className="mt-5 text-dim leading-relaxed max-w-sm text-[15px]">
              The AI co-driver for owner-operators. Voice-log loads at highway speed, price every mile — loaded and empty — and file IFTA and taxes without the all-nighter.
            </p>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 bg-chalk text-ink pl-4 pr-5 py-2.5 font-semibold text-sm hover:bg-amber transition-colors duration-300"
            >
              <IconApple className="w-5 h-5" />
              Get it on iOS
            </a>
          </div>
          {FOOT_LINKS.map((col) => (
            <div key={col.head} className="md:col-span-2">
              <div className="font-mono text-[10px] tracking-[0.3em] text-faint mb-4">{col.head}</div>
              <ul className="space-y-2.5">
                {col.links.map(([label, href, ext]) => (
                  <li key={label}>
                    {ext ? (
                      <a href={href} target="_blank" rel="noreferrer" className="sweep text-dim hover:text-chalk transition-colors text-[15px] font-medium">
                        {label}
                      </a>
                    ) : (
                      <Link to={href} className="sweep text-dim hover:text-chalk transition-colors text-[15px] font-medium">
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="md:col-span-2">
            <div className="font-mono text-[10px] tracking-[0.3em] text-faint mb-4">DISPATCH</div>
            <div className="border border-line-dark bg-panel-dark p-4 font-mono text-[11px] leading-relaxed text-dim">
              <div className="flex items-center gap-2 text-mint mb-2">
                <span className="pulse-dot inline-block w-1.5 h-1.5 rounded-full bg-mint" />
                ON THE ROAD
              </div>
              IFTA · Q2 TRACKING<br />
              RECORDS · 50 STATES<br />
              SUPPORT · REAL TRUCKERS
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-line-dark flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <div className="font-mono text-[10.5px] tracking-[0.18em] text-faint">
              © 2026 TRUCKER LIFE AI · BUILT BETWEEN MILE MARKERS · FOR OWNER-OPERATORS, BY ONE
            </div>
            <div className="flex items-center gap-3 font-mono text-[10.5px] tracking-[0.18em] text-faint">
              <a href="/privacy" className="sweep hover:text-chalk transition-colors">PRIVACY</a>
              <span aria-hidden="true">·</span>
              <a href="/terms" className="sweep hover:text-chalk transition-colors">TERMS</a>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.18em] text-faint">
            <span className="lanes lanes-slow w-10 opacity-60" aria-hidden="true" />
            KEEP THE WHEELS TURNING
          </div>
        </div>
      </div>
    </footer>
  );
}
