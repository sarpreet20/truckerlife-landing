import { Link } from "react-router-dom";
import { IconArrow } from "../data";
import { SEO } from "../shared";

export default function NotFoundPage() {
  return (
    <>
      <SEO
        path="/404"
        title="Exit Not Found — Trucker Life AI"
        description="This exit doesn't exist. Head back to the Interstate — IFTA, true rate per mile, and tax records for owner-operators."
      />
      <section className="relative min-h-screen bg-coal text-chalk flex items-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#f1f0ea 1px, transparent 1px), linear-gradient(90deg, #f1f0ea 1px, transparent 1px)", backgroundSize: "64px 64px" }}
          aria-hidden="true"
        />
        <div className="absolute top-0 left-0 right-0 lanes" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 lanes opacity-70" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-32 w-full">
          <div className="font-mono text-[11px] tracking-[0.3em] text-faint">◆ NEXT EXIT · DOESN'T EXIST</div>
          <h1 className="mt-6 font-display uppercase leading-[0.92] text-[5.5rem] sm:text-[9rem] md:text-[12rem] text-chalk">
            EXIT <span className="text-amber">404</span>
          </h1>
          <p className="mt-6 text-dim text-xl max-w-xl leading-relaxed">
            This ramp dead-ends. No freight back here — just gravel and a guardrail. The Interstate is one merge away.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link to="/" className="group inline-flex items-center justify-center gap-3 bg-amber text-ink font-bold px-7 py-4 text-lg hover:bg-chalk transition-colors duration-300">
              <IconArrow className="w-5 h-5 rotate-180 transition-transform duration-300 group-hover:-translate-x-1.5" />
              Merge back home
            </Link>
            <Link to="/calculator" className="inline-flex items-center justify-center gap-3 border-2 border-line-dark text-chalk font-bold px-7 py-4 text-lg hover:border-amber hover:text-amber transition-colors duration-300">
              Run your numbers instead
            </Link>
          </div>
          <div className="mt-14 flex flex-wrap gap-2.5">
            {["/features", "/ifta", "/pricing", "/blog", "/story"].map((p) => (
              <Link key={p} to={p} className="font-mono text-[11px] tracking-[0.15em] text-faint border border-line-dark px-3.5 py-2 hover:border-amber hover:text-amber transition-colors duration-300">
                {p}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
