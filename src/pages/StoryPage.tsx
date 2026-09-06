import { IconCheck, TIMELINE } from "../data";
import { useInView } from "../hooks";
import { AppStoreButton, PageHeader, Reveal, SectionHead, SEO } from "../shared";
import { SEO_ROUTES } from "../seoRoutes";
import founderDusk from "../assets/founder-dusk.jpg";

export default function StoryPage() {
  return (
    <>
      <SEO path="/story" {...SEO_ROUTES["/story"]} />
      <PageHeader
        crumb="OUR STORY"
        eyebrow="TEN YEARS BEHIND THE WHEEL"
        lines={[
          "I was the guy",
          <span key="a">this app <span className="text-amber">is for.</span></span>,
        ]}
        lede="No venture-backed 'mobility platform.' One truck, one driver, one midnight IFTA filing too many — and the app that came out of it."
        meta={[["EXPERIENCE", "10 YRS O/O"], ["BUILT IN", "A SLEEPER BERTH"], ["AUDIENCE", "OWNER-OPERATORS"]]}
      />

      {/* letter + photo */}
      <section className="py-12 md:py-14">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="kenburns relative aspect-[4/5] border-2 border-ink shadow-[12px_12px_0_rgba(255,180,0,0.6)]">
              <img
                src={founderDusk}
                alt="An owner-operator standing beside his truck at dusk, checking numbers on his phone"
                width={960}
                height={1200}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover bg-panel"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coal/70 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-chalk/90">
                <span>THE FOUNDER · UNIT 14</span>
                <span className="text-amber">10 YRS O/O</span>
              </div>
            </div>
            <div className="mt-6 border border-line bg-panel p-5">
              <div className="font-mono text-[9.5px] tracking-[0.25em] text-faint mb-3">WHAT TEN YEARS TEACHES YOU</div>
              <ul className="space-y-3">
                {["Understands real trucking economics — because he paid them", "Has done IFTA at midnight in a truck stop parking lot", "Builds for the road, because the office never worked"].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-ink font-medium text-[15px] leading-snug">
                    <span className="w-5 h-5 bg-amber flex items-center justify-center shrink-0 mt-0.5">
                      <IconCheck className="w-3 h-3 text-ink" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <SectionHead
              eyebrow="A LETTER FROM THE FOUNDER"
              lines={[
                "Every app I tried was built",
                "by someone who'd never",
                <span key="a" className="text-amberdark">sat in a cab.</span>,
              ]}
            />
            <Reveal delay={150}>
              <div className="mt-8 space-y-6 text-dim text-lg leading-relaxed max-w-2xl">
                <p>
                  <span className="text-ink font-semibold">Ten years behind the wheel as an owner-operator.</span> Built a trucking business from scratch. Ran the lanes. Fought the brokers. Learned what a "good rate" feels like in the morning and what it actually cost by Friday.
                </p>
                <p>
                  Software designed for dispatchers. Accounting tools that assumed you had a desk, a second monitor, and a quiet hour. Nothing that understood deadhead math, or knew what it costs to run empty 200 miles — because nobody who built it had ever done it.
                </p>
                <p>
                  So I built the app I needed. One that works while you're driving. One that knows what a load actually costs you. <span className="text-ink font-semibold">One that has your back at 3 a.m. on I-80.</span>
                </p>
                <p className="border-l-4 border-amber pl-5 font-semibold text-ink text-xl leading-relaxed">
                  If you own the truck, you own the risk. You deserve to own the numbers too.
                </p>
              </div>
            </Reveal>

            {/* timeline */}
            <div className="mt-14">
              <div className="font-mono text-[10px] tracking-[0.3em] text-faint mb-6">THE ROAD HERE</div>
              <div className="border-l-2 border-ink">
                {TIMELINE.map((t, i) => (
                  <TimelineRow key={t.year} t={t} last={i === TIMELINE.length - 1} delay={i * 90} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-12 md:pb-14">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <Reveal>
            <div className="bg-coal text-chalk px-6 py-10 md:p-12 grid md:grid-cols-12 gap-8 items-center relative overflow-hidden">
              <div className="lanes absolute top-0 left-0 right-0 opacity-80" aria-hidden="true" />
              <div className="md:col-span-8">
                <h2 className="font-display uppercase text-3xl md:text-5xl leading-tight">
                  Ten years of lessons.
                  <br />
                  <span className="text-amber">Free for 14 days.</span>
                </h2>
                <p className="mt-4 text-dim text-lg max-w-xl">Put the co-driver in the seat and see if it talks like someone who's actually hauled freight. It does.</p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <AppStoreButton dark big />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function TimelineRow({ t, last, delay }: { t: (typeof TIMELINE)[number]; last: boolean; delay: number }) {
  const { ref, on } = useInView<HTMLDivElement>(0.2);
  return (
    <div ref={ref} className={`rv ${on ? "on" : ""} relative pl-8 md:pl-10 ${last ? "" : "pb-9"}`} style={{ transitionDelay: `${delay}ms` }}>
      <span className={`absolute -left-[9px] top-1.5 w-4 h-4 rotate-45 border-2 ${last ? "bg-amber border-amber" : "bg-paper border-ink"}`} aria-hidden="true" />
      <div className="font-mono text-[10px] tracking-[0.3em] text-amberdark font-bold">{t.year}</div>
      <h3 className="font-display uppercase text-2xl text-ink tracking-wide mt-1.5">{t.title}</h3>
      <p className="mt-2 text-dim leading-relaxed max-w-xl text-[16px]">{t.body}</p>
    </div>
  );
}
