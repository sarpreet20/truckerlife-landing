import { useEffect, useState } from 'react'

function PhoneMock({ children }) {
  return (
    <div className="tl-phone">
      <div className="tl-phone__notch" aria-hidden />
      <div className="tl-phone__screen">{children}</div>
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="tl-nav">
        <a href="#" className="tl-nav__brand" onClick={closeMenu}>
          TRUCKER LIFE AI
        </a>
        <nav className={`tl-nav__links ${menuOpen ? 'is-open' : ''}`} aria-label="Primary">
          <a href="#features" className="tl-nav__link" onClick={closeMenu}>
            Features
          </a>
          <a href="#pricing" className="tl-nav__link" onClick={closeMenu}>
            Pricing
          </a>
          <a href="#" className="tl-btn-download tl-btn-download--pulse" onClick={closeMenu}>
            Download
          </a>
        </nav>
        <button
          type="button"
          className={`tl-nav__burger ${menuOpen ? 'is-open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}>
          <span />
          <span />
          <span />
        </button>
      </header>

      <main>
        {/* Hero */}
        <section className="tl-hero" data-reveal id="top">
          <div>
            <h1 className="tl-head tl-hero__title">
              MILES UP.
              <br />
              MONEY DOWN.
              <br />
              FIND OUT WHY.
            </h1>
            <p className="tl-hero__sub">
              The AI co-driver that handles your paperwork while you handle the road. Voice logging. Deadhead
              tracking. IFTA automation. All hands-free.
            </p>
            <div className="tl-hero__actions">
              <a className="tl-btn tl-btn--gold tl-btn-pulse" href="#">
                Download for iOS
              </a>
              <a className="tl-btn tl-btn--outline tl-btn-pulse" href="#">
                Download for Android
              </a>
            </div>
            <p className="tl-micro">
              ✓ Free 14-day trial &nbsp; ✓ No credit card required &nbsp; ✓ Built by a trucker
            </p>
          </div>
          <div className="tl-hero__phone-glow">
            <PhoneMock>
              <div className="tl-dash-stat">
                <span>Gross Revenue</span>
                <span>$12,400</span>
              </div>
              <div className="tl-dash-stat">
                <span>Fuel Cost</span>
                <span>-$3,200</span>
              </div>
              <div className="tl-dash-stat tl-dash-stat--profit">
                <span>Net Profit</span>
                <span>$7,847</span>
              </div>
              <div className="tl-dash-stat">
                <span>True Rate/Mile</span>
                <span>$1.86</span>
              </div>
              <div className="tl-dash-stat">
                <span>Deadhead</span>
                <span>11%</span>
              </div>
            </PhoneMock>
          </div>
        </section>

        {/* Problem */}
        <section className="tl-section tl-problem" data-reveal id="problem">
          <div className="tl-section__inner">
            <h2 className="tl-head tl-section-title">RUNNING BLIND IS COSTING YOU THOUSANDS</h2>
            <div className="tl-cards3">
              <article className="tl-card-problem">
                <h3>Broker Math vs Real Math</h3>
                <p>
                  Broker said $1.51/mile. After 210 deadhead miles your true rate was $1.08. You almost lost $400
                  without knowing.
                </p>
              </article>
              <article className="tl-card-problem">
                <h3>Hours on Paperwork</h3>
                <p>
                  IFTA. Expense logs. Tax records. The average owner-op spends 6+ hours per month on admin that
                  should take 20 minutes.
                </p>
              </article>
              <article className="tl-card-problem">
                <h3>Built for Offices Not Trucks</h3>
                <p>
                  Every trucking app expects you to type while parked. You are not in an office. You are driving 600
                  miles today.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="tl-section tl-features" id="features" data-reveal>
          <div className="tl-section__inner">
            <div className="tl-feature-row">
              <div>
                <h2 className="tl-head tl-feature__head">TALK. IT LOGS.</h2>
                <p className="tl-feature__body">
                  Just left a pickup? Say it out loud. Loaded in Chicago heading to Dallas 847 miles Echo Global load
                  23145 $1800. Done. Load logged. Miles calculated. IFTA updated. No typing. No stopping. No app
                  switching.
                </p>
              </div>
              <PhoneMock>
                <div className="tl-wave" aria-hidden>
                  {[...Array(7)].map((_, i) => (
                    <span key={i} className="tl-wave__bar" />
                  ))}
                </div>
                <div style={{ padding: '0 16px 16px' }}>
                  <div className="tl-load-card">
                    <strong>Echo Global · Load #23145</strong>
                    Chicago → Dallas · 847 mi · $1,800
                  </div>
                </div>
              </PhoneMock>
            </div>

            <div className="tl-feature-row tl-feature-row--reverse">
              <div>
                <h2 className="tl-head tl-feature__head">THE TRUTH ABOUT YOUR LOADS</h2>
                <p className="tl-feature__body">
                  Brokers quote loaded miles. Your profit depends on total miles. Trucker Life AI shows your TRUE rate
                  after deadhead before you accept a load that looks good on paper but kills your margin on the road.
                </p>
              </div>
              <PhoneMock>
                <div className="tl-compare">
                  <div className="tl-compare__row tl-compare__row--green">
                    <span>Broker Rate</span>
                    <span>$1.51/mile</span>
                  </div>
                  <div className="tl-compare__row tl-compare__row--red">
                    <span>TRUE Rate</span>
                    <span>$1.08/mile</span>
                  </div>
                  <p className="tl-compare__warn">⚠ Margin crushed after deadhead</p>
                </div>
              </PhoneMock>
            </div>

            <div className="tl-feature-row">
              <div>
                <h2 className="tl-head tl-feature__head">IFTA IN MINUTES NOT HOURS</h2>
                <p className="tl-feature__body">
                  State crossings tracked automatically. Miles per state calculated. Quarterly report generated with one
                  tap. What used to take 4 hours now takes 8 minutes.
                </p>
              </div>
              <PhoneMock>
                <div className="tl-ifta-rows">
                  <div className="tl-ifta-row">
                    <span>Illinois</span>
                    <span>412 mi</span>
                  </div>
                  <div className="tl-ifta-row">
                    <span>Missouri</span>
                    <span>211 mi</span>
                  </div>
                  <div className="tl-ifta-row">
                    <span>Oklahoma</span>
                    <span>189 mi</span>
                  </div>
                  <div className="tl-ifta-row">
                    <span>Texas</span>
                    <span>298 mi</span>
                  </div>
                  <div className="tl-ifta-row">
                    <span style={{ color: 'var(--gold)' }}>Q4 ready</span>
                    <span>Export PDF →</span>
                  </div>
                </div>
              </PhoneMock>
            </div>

            <div className="tl-feature-row tl-feature-row--reverse">
              <div>
                <h2 className="tl-head tl-feature__head">AN ACCOUNTANT IN YOUR POCKET</h2>
                <p className="tl-feature__body">
                  Ask anything. How did I do this month? What is my best lane? Am I making money on CH Robinson loads?
                  Your AI advisor knows your numbers and tells you straight.
                </p>
              </div>
              <PhoneMock>
                <div className="tl-chat">
                  <div className="tl-chat__bubble tl-chat__bubble--user">
                    How did I do this month vs last?
                  </div>
                  <div className="tl-chat__bubble tl-chat__bubble--ai">
                    You&apos;re up 14% on net. Best lane: Dallas→Atlanta. CH Robinson loads averaged $1.42/mi true rate
                    after deadhead.
                  </div>
                </div>
              </PhoneMock>
            </div>
          </div>
        </section>

        {/* Viral deadhead */}
        <section className="tl-section tl-viral" data-reveal id="deadhead-story">
          <div className="tl-section__inner">
            <h2 className="tl-head tl-section-title">THE LOAD THAT ALMOST COST ME $400</h2>
            <p className="tl-viral__sub">Broker said $1.51/mile. Trucker Life AI showed the truth.</p>
            <div className="tl-app-card">
              <div className="tl-app-card__row">
                <span>Broker Rate</span>
                <span>$1,800</span>
              </div>
              <div className="tl-app-card__row">
                <span>Loaded Miles</span>
                <span>800 mi</span>
              </div>
              <div className="tl-app-card__row">
                <span>Loaded Rate</span>
                <span>$2.25/mile</span>
              </div>
              <div className="tl-app-card__divider">REAL PICTURE</div>
              <div className="tl-app-card__row">
                <span>Deadhead Miles</span>
                <span>210 mi</span>
              </div>
              <div className="tl-app-card__row">
                <span>Total Miles</span>
                <span>1,010 mi</span>
              </div>
              <div className="tl-app-card__row">
                <span>TRUE Rate</span>
                <span className="tl-app-card__value--gold">$1.78/mile</span>
              </div>
              <div className="tl-app-card__row">
                <span>Estimated Fuel</span>
                <span>-$420</span>
              </div>
              <div className="tl-app-card__row">
                <span>Net Profit</span>
                <span>$847</span>
              </div>
              <div className="tl-app-card__banner">
                <span className="tl-app-card__banner-row">
                  <span>Deadhead</span>
                  <span className="tl-app-card__dh-group">
                    <span className="tl-app-card__dh-pct">26%</span>
                    <span className="tl-app-card__dh-alert" title="Above threshold">
                      !
                    </span>
                  </span>
                  <span className="tl-app-card__banner-msg">
                    — above 20% threshold. Consider negotiating rate.
                  </span>
                </span>
              </div>
            </div>
            <p className="tl-viral__quote">I almost took this load. The app caught it before I did.</p>
          </div>
        </section>

        {/* Stats */}
        <section className="tl-stats" data-reveal aria-label="Industry stats">
          <div className="tl-stats__inner">
            <div className="tl-stats__item">
              <div className="tl-stats__num">587,000</div>
              <div className="tl-stats__label">Owner-Operators in the US</div>
            </div>
            <div className="tl-stats__divider" aria-hidden />
            <div className="tl-stats__item">
              <div className="tl-stats__num">$940B</div>
              <div className="tl-stats__label">Trucking Industry</div>
            </div>
            <div className="tl-stats__divider" aria-hidden />
            <div className="tl-stats__item">
              <p className="tl-stats__single">Built by a Trucker with 10 Years Experience</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="tl-section tl-pricing" id="pricing" data-reveal>
          <div className="tl-section__inner">
            <h2 className="tl-head tl-section-title">PAY FOR ITSELF WITH ONE CAUGHT BAD LOAD</h2>
            <div className="tl-pricing__grid">
              <article className="tl-price-card">
                <div className="tl-price-card__tier">FREE</div>
                <p className="tl-price-card__amt">14 Days Full Access</p>
                <ul>
                  <li>Voice logging</li>
                  <li>Load tracking</li>
                  <li>Fuel entries</li>
                  <li>Basic reports</li>
                  <li>IFTA tracking</li>
                </ul>
                <a className="tl-btn tl-btn--outline" href="#">
                  Start Free Trial
                </a>
              </article>
              <article className="tl-price-card tl-price-card--featured">
                <span className="tl-price-card__badge">MOST POPULAR</span>
                <div className="tl-price-card__tier">PRO</div>
                <p className="tl-price-card__amt">$29 per month</p>
                <ul>
                  <li>Everything in Free</li>
                  <li>Unlimited loads</li>
                  <li>AI Advisor</li>
                  <li>Full IFTA reports</li>
                  <li>Tax Center</li>
                  <li>PDF exports</li>
                  <li>Priority support</li>
                </ul>
                <a className="tl-btn tl-btn--gold tl-btn-pulse" href="#">
                  Get Pro
                </a>
              </article>
              <article className="tl-price-card">
                <div className="tl-price-card__tier">PRO PLUS</div>
                <p className="tl-price-card__amt">$49 per month</p>
                <ul>
                  <li>Everything in Pro</li>
                  <li>Advanced AI insights</li>
                  <li>Monthly business summary</li>
                  <li>Rate negotiation tips</li>
                  <li>Broker performance tracking</li>
                  <li>Custom expense categories</li>
                </ul>
                <a className="tl-btn tl-btn--outline" href="#">
                  Get Pro Plus
                </a>
              </article>
            </div>
            <p className="tl-pricing__footnote">
              Cancel anytime. No contracts. No hidden fees. One bad load avoided pays for 12 months of Pro.
            </p>
          </div>
        </section>

        {/* Built by */}
        <section className="tl-section tl-built" data-reveal id="built-by">
          <div className="tl-section__inner">
            <h2 className="tl-head tl-section-title">BUILT BY SOMEONE WHO HAS BEEN THERE</h2>
            <p className="tl-built__body">
              I spent a decade as an owner-operator. Built a trucking business from scratch. Drove the lanes. Dealt
              with the brokers. Did IFTA at midnight. Every trucking app I tried was built by someone who had never sat
              in a cab. They built software for dispatchers and accountants. Not for drivers. So I built the app I
              wished existed. One that works while you are driving. One that knows deadhead math. One that has your back
              at 3am on I-80. This is Trucker Life AI.
            </p>
            <div className="tl-checks">
              <span>10 years owner-operator experience</span>
              <span>Understands real trucking economics</span>
              <span>Built for the road not the office</span>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="tl-final-cta" data-reveal id="download">
          <div className="tl-section__inner">
            <h2 className="tl-head">KNOW YOUR NUMBERS. OWN YOUR BUSINESS.</h2>
            <p className="tl-final-cta__sub">
              Join thousands of owner-operators who finally know exactly what they are making mile by mile.
            </p>
            <div className="tl-final-cta__btns">
              <a className="tl-btn tl-btn--gold tl-btn-pulse" href="#">
                Download for iOS — App Store
              </a>
              <a className="tl-btn tl-btn--outline tl-btn-pulse" href="#">
                Download for Android — Google Play
              </a>
            </div>
            <p className="tl-micro">Free 14-day trial. No credit card required.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="tl-footer" id="support">
          <div className="tl-footer__inner">
            <div className="tl-footer__brand">TRUCKER LIFE AI</div>
            <nav className="tl-footer__links" aria-label="Footer">
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="https://trucker-life-legal.vercel.app" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </a>
              <a href="https://trucker-life-legal.vercel.app" target="_blank" rel="noopener noreferrer">
                Terms of Service
              </a>
              <a href="#">Support</a>
            </nav>
            <p className="tl-footer__copy">
              © 2025 Trucker Life AI. Built for owner-operators, by an owner-operator.
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}
