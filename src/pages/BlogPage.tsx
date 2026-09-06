import { Link } from "react-router-dom";
import { APP_STORE_URL, BLOG, IconArrow } from "../data";
import { useInView } from "../hooks";
import { Diamond, PageHeader, Reveal, SEO } from "../shared";
import { SEO_ROUTES } from "../seoRoutes";

function ArticleRow({ b, i }: { b: (typeof BLOG)[number]; i: number }) {
  const { ref, on } = useInView<HTMLElement>(0.12);
  return (
    <article
      ref={ref}
      className={`rv ${on ? "on" : ""} group grid lg:grid-cols-12 gap-6 lg:gap-10 border-b-2 border-line py-10 md:py-14 first:border-t-2 first:border-ink`}
      style={{ transitionDelay: `${i * 90}ms` }}
    >
      <div className="lg:col-span-3 flex lg:flex-col items-baseline lg:items-start gap-4 lg:gap-5">
        <span className="font-display text-5xl md:text-6xl text-line group-hover:text-amber transition-colors duration-500">{b.num}</span>
        <span className="font-mono text-[10px] tracking-[0.25em] text-amberdark font-semibold">{b.category}</span>
      </div>
      <div className="lg:col-span-6">
        <h2 className="font-display uppercase text-2xl md:text-4xl text-ink leading-tight tracking-wide group-hover:translate-x-2 transition-transform duration-500">
          {b.title}
        </h2>
        <p className="mt-4 text-dim leading-relaxed text-[16.5px] max-w-2xl">{b.excerpt}</p>
        <Link
          to={b.url}
          className="mt-6 inline-flex items-center gap-3 bg-ink text-paper font-bold px-6 py-3 hover:bg-amberdark transition-colors duration-300"
        >
          Open in the app
          <IconArrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </div>
      <div className="lg:col-span-3">
        <div className="border border-line bg-panel p-5">
          <div className="font-mono text-[9.5px] tracking-[0.25em] text-faint mb-3.5">WHAT YOU'LL WALK AWAY WITH</div>
          <ul className="space-y-3">
            {b.takeaways.map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-dim text-[14px] leading-snug">
                <Diamond className="w-2 h-2 text-amberdark shrink-0 mt-1.5" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

const EXTRA_GUIDES = [
  "Deadhead: the silent margin killer — and how to price it",
  "Detention pay: what to ask for before you wait",
  "Fuel cards vs. cash price: running the real numbers",
  "Escrow accounts: what the contract won't explain",
  "Lease-on vs. authority: the first-year math",
  "Preventive maintenance schedule that pays for itself",
  "Quarterly estimated taxes without the April panic",
];

export default function BlogPage() {
  return (
    <>
      <SEO path="/blog" {...SEO_ROUTES["/blog"]} />
      <PageHeader
        crumb="BLOG"
        eyebrow="WRITTEN FOR THE CAB, NOT THE BOARDROOM"
        lines={[
          "Numbers a trucker",
          <span key="a">can <span className="text-amber">use today.</span></span>,
        ]}
        lede="Cost per mile, IFTA, load math, and the fine print brokers count on you skipping. Every guide is written by someone who has run the lanes — no theory, all ledger."
        meta={[["GUIDES", "10+"], ["READING LEVEL", "TRUCKER"], ["FLUFF", "0%"]]}
      />

      <section className="py-12 md:py-14">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-faint">FEATURED TOPICS</div>
              <h2 className="font-display uppercase text-3xl md:text-4xl text-ink tracking-wide mt-2">Start with these three.</h2>
            </div>
          </div>

          {BLOG.map((b, i) => (
            <ArticleRow key={b.num} b={b} i={i} />
          ))}
        </div>
      </section>

      {/* library shelf */}
      <section className="pb-12 md:pb-14">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="bg-coal text-chalk p-7 md:p-12 relative overflow-hidden">
              <div className="lanes absolute top-0 left-0 right-0 opacity-80" aria-hidden="true" />
              <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-faint mt-2">ON THE ROADMAP</div>
                  <h2 className="font-display uppercase text-3xl md:text-5xl leading-tight mt-3">
                    Seven more topics,
                    <br />
                    <span className="text-amber">coming soon.</span>
                  </h2>
                  <p className="mt-4 text-dim leading-relaxed max-w-sm">Real numbers, real consequences, no filler — written as the guides go live. Meanwhile, the app already does the math on all of it.</p>
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-7 inline-flex items-center gap-3 bg-amber text-ink font-bold px-6 py-3.5 hover:bg-chalk transition-colors duration-300"
                  >
                    Start free trial
                    <IconArrow className="w-4 h-4" />
                  </a>
                </div>
                <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10 content-start">
                  {EXTRA_GUIDES.map((g, i) => (
                    <li key={g} className="flex items-start gap-4 border-b border-line-dark py-4">
                      <span className="font-mono text-[10px] text-amber mt-1.5 shrink-0">{String(i + 4).padStart(2, "0")}</span>
                      <span className="font-semibold text-chalk/60 leading-snug text-[16px]">
                        {g}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
