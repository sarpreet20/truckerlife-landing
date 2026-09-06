import { useEffect } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useInView } from "./hooks";
import { APP_STORE_URL, IconApple, MARQUEE_LINES, SITE_URL } from "./data";

/* ================= per-page SEO ================= */

export function SEO({
  title,
  description,
  path,
  jsonLd,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  jsonLd?: object;
  noindex?: boolean;
}) {
  useEffect(() => {
    document.title = title;
    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", `${SITE_URL}${path}`);
    setMeta("property", "og:image", `${SITE_URL}/og-image.png`);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", `${SITE_URL}/og-image.png`);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${SITE_URL}${path}`);

    let ld = document.getElementById("page-jsonld");
    if (jsonLd) {
      if (!ld) {
        ld = document.createElement("script");
        ld.id = "page-jsonld";
        ld.setAttribute("type", "application/ld+json");
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(jsonLd);
    } else if (ld) {
      ld.remove();
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [title, description, path, jsonLd, noindex]);
  return null;
}

/* ================= reveal wrapper ================= */

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, on } = useInView<HTMLDivElement>(0.14);
  return (
    <div ref={ref} className={`rv ${on ? "on" : ""} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

/* ================= amber marquee ================= */

export function Marquee({ dark = false, speed = "26s" }: { dark?: boolean; speed?: string }) {
  const lines = [...MARQUEE_LINES, ...MARQUEE_LINES];
  return (
    <div className={`${dark ? "bg-coal border-y border-line-dark" : "bg-amber text-ink border-y border-ink/10"} py-3 select-none`} aria-hidden="true">
      <div className="marquee" style={{ ["--marquee-speed" as string]: speed }}>
        <div className="marquee-track items-center">
          {lines.map((l, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              <span className={`font-display text-lg md:text-xl tracking-wide ${dark ? "text-chalk" : ""}`}>{l}</span>
              <svg viewBox="0 0 24 24" className={`w-3.5 h-3.5 mx-5 shrink-0 ${dark ? "text-amber" : "text-ink"}`} fill="currentColor">
                <rect x="7" y="7" width="10" height="10" transform="rotate(45 12 12)" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= section heading (light) ================= */

export function SectionHead({
  eyebrow,
  lines,
  lede,
  tone = "amber",
  className = "",
}: {
  eyebrow: string;
  lines: ReactNode[];
  lede?: string;
  tone?: "amber" | "alert" | "money";
  className?: string;
}) {
  const color = tone === "alert" ? "text-alert" : tone === "money" ? "text-money" : "text-amberdark";
  return (
    <Reveal className={className}>
      <div className="flex items-center gap-3 mb-5">
        <span className={`lanes lanes-slow w-14 ${tone === "alert" ? "opacity-90" : ""}`} aria-hidden="true" />
        <span className={`font-mono text-[11px] tracking-[0.3em] font-semibold ${color}`}>{eyebrow}</span>
      </div>
      <h2 className="font-display uppercase leading-[0.98] text-ink text-4xl sm:text-5xl md:text-6xl max-w-3xl">
        {lines.map((l, i) => (
          <span key={i} className="mask-line"><span>{l}</span></span>
        ))}
      </h2>
      {lede && <p className="mt-6 text-dim text-lg md:text-xl leading-relaxed max-w-2xl">{lede}</p>}
    </Reveal>
  );
}

/* ================= interior page header (dark asphalt band) ================= */

export function PageHeader({
  crumb,
  eyebrow,
  lines,
  lede,
  meta,
}: {
  crumb: string;
  eyebrow: string;
  lines: ReactNode[];
  lede: string;
  meta?: [string, string][];
}) {
  const { ref, on } = useInView<HTMLDivElement>(0.1);
  return (
    <header className="relative bg-coal text-chalk overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(#f1f0ea 1px, transparent 1px), linear-gradient(90deg, #f1f0ea 1px, transparent 1px)", backgroundSize: "64px 64px" }}
        aria-hidden="true"
      />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber/10 blur-[120px] pointer-events-none" aria-hidden="true" />
      <div ref={ref} className={`relative max-w-7xl mx-auto px-5 md:px-8 pt-32 md:pt-36 pb-10 md:pb-12 ${on ? "on" : ""}`}>
        <div className="rv flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-faint">
          <Link to="/" className="hover:text-amber transition-colors">HOME</Link>
          <span className="text-amber">→</span>
          <span className="text-chalk/80">{crumb}</span>
        </div>
        <div className="rv flex items-center gap-3 mt-8" style={{ transitionDelay: "80ms" }}>
          <span className="lanes w-16" aria-hidden="true" />
          <span className="font-mono text-[11px] tracking-[0.3em] text-amber">{eyebrow}</span>
        </div>
        <h1 className="mt-5 font-display uppercase leading-[0.95] text-[2.7rem] sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl">
          {lines.map((l, i) => (
            <span key={i} className="mask-line"><span style={{ transitionDelay: `${i * 90}ms` }}>{l}</span></span>
          ))}
        </h1>
        <p className="rv mt-7 text-dim text-lg md:text-xl leading-relaxed max-w-2xl" style={{ transitionDelay: "240ms" }}>
          {lede}
        </p>
        {meta && (
          <div className="rv mt-10 flex flex-wrap gap-3" style={{ transitionDelay: "340ms" }}>
            {meta.map(([k, v]) => (
              <div key={k} className="border border-line-dark bg-panel-dark/70 px-4 py-2.5 flex items-baseline gap-2.5">
                <span className="font-display text-xl text-amber">{v}</span>
                <span className="font-mono text-[10px] tracking-[0.18em] text-dim uppercase">{k}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="lanes opacity-80" aria-hidden="true" />
    </header>
  );
}

/* ================= CTA blocks ================= */

export function AppStoreButton({ dark = false, big = false, className = "" }: { dark?: boolean; big?: boolean; className?: string }) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center gap-3 font-bold transition-all duration-300 ${
        big ? "pl-6 pr-7 py-4 text-lg" : "pl-5 pr-6 py-3.5 text-base"
      } ${
        dark
          ? "bg-chalk text-ink hover:bg-amber shadow-[5px_5px_0_rgba(241,240,234,0.15)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_rgba(241,240,234,0.15)]"
          : "bg-ink text-paper hover:bg-amber hover:text-ink shadow-[5px_5px_0_rgba(26,28,31,0.18)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_rgba(26,28,31,0.18)]"
      } ${className}`}
    >
      <IconApple className={big ? "w-6 h-6" : "w-5 h-5"} />
      Download for iOS
    </a>
  );
}

/* ================= mobile sticky CTA ================= */

export function MobileCTABar() {
  useEffect(() => {
    const el = document.getElementById("mobile-cta");
    if (!el) return;
    const onScroll = () => {
      const show = window.scrollY > 520;
      el.style.transform = show ? "translateY(0)" : "translateY(110%)";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      id="mobile-cta"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden transition-transform duration-500"
      style={{ transform: "translateY(110%)", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="lanes" aria-hidden="true" />
      <div className="bg-coal/95 backdrop-blur-md px-4 py-3 flex items-center justify-between gap-3">
        <div className="leading-tight">
          <div className="font-display text-chalk text-lg tracking-wide">FREE 14-DAY TRIAL</div>
          <div className="font-mono text-[9.5px] tracking-[0.18em] text-faint">NO CARD · CANCEL ANYTIME</div>
        </div>
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 flex items-center gap-2 bg-amber text-ink font-bold px-5 py-3 text-[15px] active:scale-95 transition-transform"
        >
          <IconApple className="w-5 h-5" />
          Get the app
        </a>
      </div>
    </div>
  );
}

/* ================= misc ================= */

export function Diamond({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" transform="rotate(45 12 12)" />
    </svg>
  );
}
