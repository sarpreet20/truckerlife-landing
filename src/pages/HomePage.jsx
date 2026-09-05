import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { posts } from '../blog/posts'
import { Seo } from '../components/Seo'
import { APP_STORE_URL, SITE_NAME, SITE_URL } from '../config'

const DASH_TILES = [
  { label: 'Loads', sub: '3 this month', bg: '#2563eb', icon: 'briefcase' },
  { label: 'Fuel', sub: '$6,180 this month', bg: '#f59e0b', icon: 'flame' },
  { label: 'Maintenance', sub: '1 this month', bg: '#10b981', icon: 'wrench' },
  { label: 'Accessorial', sub: '$132 this month', bg: '#8b5cf6', icon: 'plus' },
  { label: 'Travel Expense', sub: '$74 this month', bg: '#ef4444', icon: 'pin' },
  { label: 'Reports', sub: 'May 2026', bg: '#06b6d4', icon: 'chart' },
]

function TileIcon({ name }) {
  const props = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: '#fff', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  switch (name) {
    case 'briefcase':
      return (
        <svg {...props}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
        </svg>
      )
    case 'flame':
      return (
        <svg {...props}>
          <path d="M12 22c4-2.5 7-6.5 7-11a7 7 0 00-7-7c-1.5 2-4 3.5-4 6.5 0 2 1.5 3.5 3 4.5-2-1-3.5-3-3.5-5.5 0-3 2.5-5.5 5-7.5-3 1.5-5 4.5-5 8 0 5 3.5 9 5 10.5z" />
        </svg>
      )
    case 'wrench':
      return (
        <svg {...props}>
          <path d="M14.7 6.3a4 4 0 00-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 005.4-5.4l-2.2 2.2-3.2-3.2 2.2-2.2z" />
        </svg>
      )
    case 'plus':
      return (
        <svg {...props}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      )
    case 'pin':
      return (
        <svg {...props}>
          <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" fill="#fff" stroke="none" />
        </svg>
      )
    case 'chart':
      return (
        <svg {...props}>
          <path d="M4 19V5M10 19V9M16 19v-6M22 19V3" />
        </svg>
      )
    default:
      return null
  }
}

function LiveDashboardMock() {
  return (
    <div className="live-dash" aria-label="App dashboard preview">
      <header className="live-dash__header">
        <div className="live-dash__header-left">
          <span className="live-dash__brand">TRUCKER LIFE AI</span>
          <h2 className="live-dash__company">Steven Trucking Inc</h2>
        </div>
        <div className="live-dash__header-actions">
          <span className="live-dash__ai-pill">AI</span>
          <svg className="live-dash__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <circle cx="12" cy="12" r="3" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
          <span className="live-dash__bell">
            <svg className="live-dash__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            <span className="live-dash__badge">2</span>
          </span>
          <svg className="live-dash__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </div>
      </header>

      <div className="live-dash__stats">
        <div className="live-dash__stat-row">
          <div className="live-dash__stat">
            <span className="live-dash__stat-label">Total revenue</span>
            <strong className="live-dash__stat-value live-dash__stat-value--green">$17,500</strong>
            <span className="live-dash__stat-sub">This month · revenue</span>
          </div>
          <div className="live-dash__stat">
            <span className="live-dash__stat-label">Total miles</span>
            <strong className="live-dash__stat-value">7,402</strong>
            <span className="live-dash__stat-sub">This month · loaded + deadhead</span>
          </div>
        </div>
        <div className="live-dash__stat-row">
          <div className="live-dash__stat">
            <span className="live-dash__stat-label">Total fuel</span>
            <strong className="live-dash__stat-value">$6,180</strong>
            <span className="live-dash__stat-sub">This month · fuel cost</span>
          </div>
          <div className="live-dash__stat">
            <span className="live-dash__stat-label">RPM</span>
            <strong className="live-dash__stat-value">$2.36</strong>
            <span className="live-dash__stat-sub">This month · Rev. Per Mile</span>
          </div>
        </div>
      </div>

      <div className="live-dash__tiles">
        {DASH_TILES.map((tile) => (
          <div key={tile.label} className="live-dash__tile" style={{ backgroundColor: tile.bg }}>
            <TileIcon name={tile.icon} />
            <span className="live-dash__tile-label">{tile.label}</span>
            <span className="live-dash__tile-sub">{tile.sub}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const SCREENS = {
  voiceLog: { src: '/screens/voice-log.png', alt: 'Voice Log screen — speak to log a load hands-free' },
  loads: { src: '/screens/loads.png', alt: 'Loads screen with true rate per mile on every load' },
  reports: { src: '/screens/reports.png', alt: 'Monthly reports overview with revenue, expenses, and miles' },
  monthlyReport: { src: '/screens/monthly-report.png', alt: 'Monthly performance report PDF preview' },
  aiAdvisor: { src: '/screens/ai-advisor.png', alt: 'AI Advisor answering profitability questions' },
}

function AppScreenshot({ src, alt }) {
  return (
    <div className="app-shot">
      <img src={src} alt={alt} width="473" height="1024" loading="lazy" decoding="async" />
    </div>
  )
}

function PhoneMock({ children, label, variant = 'default' }) {
  const isApp = variant === 'app'
  const isScreenshot = variant === 'screenshot'
  return (
    <div className={`phone ${isApp ? 'phone--app' : ''} ${isScreenshot ? 'phone--screenshot' : ''}`}>
      {label && <span className="phone__label">{label}</span>}
      <div className="phone__frame">
        <div className="phone__island" aria-hidden />
        <div className="phone__screen">
          {!isApp && !isScreenshot && (
            <div className="phone__status">
              <span>9:41</span>
              <span className="phone__status-icons" aria-hidden>
                <i /><i /><i />
              </span>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}

function Eyebrow({ children }) {
  return <p className="eyebrow">{children}</p>
}

function CheckItem({ children }) {
  return (
    <li className="check-item">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <circle cx="9" cy="9" r="9" fill="currentColor" fillOpacity="0.12" />
        <path
          d="M5.5 9.2l2.1 2.1 4.9-5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </li>
  )
}

const PROBLEMS = [
  {
    icon: '📉',
    title: 'Broker math vs your math',
    body: "Broker quoted $1.51/mile. Sounds decent. But after 210 deadhead miles, your true rate was $1.08. You ran that load for almost nothing — and didn't know until it was too late.",
  },
  {
    icon: '⏱️',
    title: 'Admin is eating your hours',
    body: 'IFTA filings. Expense logs. Tax records. Fuel receipts stuffed in the glovebox. The average owner-operator loses 6+ hours a month to paperwork that should take 20 minutes.',
  },
  {
    icon: '🚛',
    title: 'Every app was built for an office',
    body: "Trucking software is designed for dispatchers sitting at a desk. You're doing 600 miles today. You shouldn't have to pull over to log a load.",
  },
]

const FEATURE_SLIDES = [
  {
    id: 'voice-log',
    eyebrow: 'Voice Logging',
    title: 'Just talk.',
    body: '"Picked up in Dallas, delivering to Memphis, $2,800, 450 miles." Done. Logged, categorized, calculated — while you drive.',
    screen: SCREENS.voiceLog,
  },
  {
    id: 'true-rate',
    eyebrow: 'True Rate Calculator',
    title: 'Know what a load actually pays.',
    body: "Rate per loaded mile AND rate per total mile, deadhead included. Get warned before you accept a load that's not worth running.",
    screen: SCREENS.loads,
  },
  {
    id: 'reports',
    eyebrow: 'IFTA & Reports',
    title: 'File-ready in minutes.',
    body: 'Miles tracked by state automatically. Quarterly IFTA report ready to file. Monthly performance report shows gross, net, cost per mile, and deadhead percentage. One tap to PDF.',
    screen: SCREENS.reports,
  },
  {
    id: 'advisor',
    eyebrow: 'AI Advisor',
    title: 'Plain answers. No spreadsheet.',
    body: 'Ask anything. "Am I profitable this month?" "Which broker pays best?" "How much did I spend on fuel in April?"',
    screen: SCREENS.aiAdvisor,
  },
  {
    id: 'tax-records',
    eyebrow: 'Tax-Ready Records',
    title: 'Every expense. Ready to file.',
    body: 'Fuel, showers, laundry, truck wash, tolls, meals, maintenance — captured, categorized, and ready for your accountant or DIY filing.',
    screen: SCREENS.monthlyReport,
  },
]

function FeatureShowcase() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const slide = FEATURE_SLIDES[active]
  const count = FEATURE_SLIDES.length

  const goTo = (index) => {
    setActive((index + count) % count)
    setPaused(true)
  }

  const goNext = () => goTo(active + 1)
  const goPrev = () => goTo(active - 1)

  useEffect(() => {
    if (paused) return undefined
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % count)
    }, 5500)
    return () => clearInterval(timer)
  }, [paused, count])

  return (
    <div
      className="feature-showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>
      <div className="feature-showcase__tabs" role="tablist" aria-label="App features">
        {FEATURE_SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`feature-showcase__tab ${i === active ? 'is-active' : ''}`}
            onClick={() => goTo(i)}>
            <span className="feature-showcase__tab-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="feature-showcase__tab-text">{s.eyebrow}</span>
          </button>
        ))}
      </div>

      <div className="feature-showcase__main">
        <div className="feature-showcase__copy">
          <div className="feature-showcase__detail" key={slide.id}>
            <Eyebrow>{slide.eyebrow}</Eyebrow>
            <h3 className="feature-showcase__title">{slide.title}</h3>
            <p className="feature-showcase__body">{slide.body}</p>
          </div>

          <div className="feature-showcase__controls">
            <button type="button" className="feature-showcase__arrow" onClick={goPrev} aria-label="Previous feature">
              ←
            </button>
            <div className="feature-showcase__dots" role="tablist" aria-label="Feature slides">
              {FEATURE_SLIDES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={s.eyebrow}
                  className={`feature-showcase__dot ${i === active ? 'is-active' : ''}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <button type="button" className="feature-showcase__arrow" onClick={goNext} aria-label="Next feature">
              →
            </button>
          </div>
        </div>

        <div className="feature-showcase__visual">
          <PhoneMock variant="screenshot">
            <div className="feature-showcase__carousel" aria-live="polite">
              {FEATURE_SLIDES.map((s, i) => (
                <div
                  key={s.id}
                  className={`feature-showcase__slide ${i === active ? 'is-active' : ''}`}
                  aria-hidden={i !== active}>
                  <AppScreenshot src={s.screen.src} alt={s.screen.alt} />
                </div>
              ))}
            </div>
          </PhoneMock>
          <p className="feature-showcase__caption">
            {active + 1} / {count} · {slide.eyebrow}
          </p>
        </div>
      </div>
    </div>
  )
}

const FEATURED_SLUGS = [
  'owner-operator-cost-per-mile',
  'ifta-filing-for-owner-operators',
  'how-to-know-if-a-load-is-profitable',
]

export function HomePage() {
  const location = useLocation()

  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
    return () => window.clearTimeout(t)
  }, [location.hash])

  const featured = FEATURED_SLUGS.map((slug) => posts.find((p) => p.slug === slug)).filter(Boolean)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'iOS',
    url: SITE_URL,
    offers: { '@type': 'Offer', price: '29.00', priceCurrency: 'USD' },
    audience: { '@type': 'Audience', audienceType: 'Owner-operators' },
    description:
      'AI co-driver for owner-operators: loads, fuel, deadhead, IFTA, and true profit per mile from the cab.',
  }

  return (
    <main>
      <Seo
        title="Trucker Life AI — IFTA & Profit Per Mile for Owner-Operators"
        description="The AI co-driver for owner-operators. Track loads, fuel, deadhead, IFTA, and true profit per mile — built for the cab, not the cubicle."
        path="/"
        jsonLd={jsonLd}
      />
      <section className="hero" data-reveal id="top">
        <div className="hero__bg" aria-hidden />
        <div className="container hero__inner">
          <div className="hero__copy">
            <Eyebrow>Your AI co-pilot. Built for the road.</Eyebrow>
            <h1 className="hero__title">
              Miles up.
              <br />
              <span className="hero__title-accent">Money down.</span>
              <br />
              Find out why.
            </h1>
            <p className="hero__sub">
              You&apos;re running a business from a cab. Brokers lowball you. Deadhead eats your margin. Tax
              season hits like a wall. Trucker Life AI is the co-driver that handles the numbers — while you
              handle the road.
            </p>
            <div className="hero__actions">
              <a
                className="btn btn--primary btn--lg"
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.63 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Download for iOS
              </a>
            </div>
            <ul className="hero__trust">
              <li>14-day free trial</li>
              <li>No credit card</li>
              <li>Built by a trucker</li>
            </ul>
          </div>

          <div className="hero__visual">
            <PhoneMock label="Live dashboard" variant="app">
              <LiveDashboardMock />
            </PhoneMock>
          </div>
        </div>
      </section>

      <section className="section section--alt" data-reveal id="problem">
        <div className="container">
          <div className="section__header">
            <Eyebrow>Why most owner-operators bleed money</Eyebrow>
            <h2 className="section__title">You&apos;re working hard. The numbers don&apos;t add up. Here&apos;s why.</h2>
          </div>
          <div className="problem-grid">
            {PROBLEMS.map((item) => (
              <article key={item.title} className="problem-card">
                <span className="problem-card__icon" aria-hidden>
                  {item.icon}
                </span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="features" data-reveal>
        <div className="container">
          <div className="section__header section__header--center">
            <Eyebrow>Built for the cab, not the cubicle</Eyebrow>
            <h2 className="section__title">
              Everything you need to know your real numbers — without typing a word.
            </h2>
          </div>

          <FeatureShowcase />
        </div>
      </section>

      <section className="section section--warm" data-reveal id="deadhead-story">
        <div className="container">
          <div className="story-block">
            <div className="story-block__copy">
              <Eyebrow>No more guessing</Eyebrow>
              <h2 className="section__title section__title--left">
                You&apos;ll know your margin before you leave the truck stop.
              </h2>
              <p className="story-block__body">
                Gross revenue means nothing without net profit. Loaded miles mean nothing without deadhead. For
                the first time, you&apos;ll see the full picture — every load, every month, every mile.
              </p>
              <ul className="story-block__stats">
                <li>
                  <strong>15.8%</strong>
                  <span>net margin tracked</span>
                </li>
                <li>
                  <strong>89%</strong>
                  <span>loaded miles</span>
                </li>
                <li>
                  <strong>11%</strong>
                  <span>deadhead caught</span>
                </li>
              </ul>
              <blockquote className="quote quote--left">
                &ldquo;I finally know what I&apos;m actually making — mile by mile.&rdquo;
              </blockquote>
            </div>
            <PhoneMock variant="screenshot">
              <AppScreenshot src={SCREENS.monthlyReport.src} alt={SCREENS.monthlyReport.alt} />
            </PhoneMock>
          </div>
        </div>
      </section>

      <section className="stats-bar" data-reveal aria-label="Industry stats">
        <div className="container stats-bar__inner">
          <div className="stats-bar__item">
            <strong>587,000</strong>
            <span>Owner-operators in the US</span>
          </div>
          <div className="stats-bar__item">
            <strong>$940B</strong>
            <span>Trucking industry</span>
          </div>
          <div className="stats-bar__item stats-bar__item--wide">
            <strong>10 years</strong>
            <span>Owner-operator experience behind this app</span>
          </div>
        </div>
      </section>

      <section className="section" id="pricing" data-reveal>
        <div className="container">
          <div className="section__header section__header--center">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="section__title">Pays for itself with one caught bad load</h2>
          </div>

          <div className="pricing-grid">
            <article className="price-card">
              <div className="price-card__header">
                <h3>Free</h3>
                <p className="price-card__price">
                  <span>$0</span>
                  <small>14-day trial</small>
                </p>
              </div>
              <ul>
                <CheckItem>Voice logging</CheckItem>
                <CheckItem>Load tracking</CheckItem>
                <CheckItem>Fuel entries</CheckItem>
                <CheckItem>Basic reports</CheckItem>
                <CheckItem>IFTA tracking</CheckItem>
              </ul>
              <a
                className="btn btn--outline btn--block"
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer">
                Start free trial
              </a>
            </article>

            <article className="price-card price-card--featured">
              <span className="price-card__badge">Most popular</span>
              <div className="price-card__header">
                <h3>Pro</h3>
                <p className="price-card__price">
                  <span>$29</span>
                  <small>/month</small>
                </p>
              </div>
              <ul>
                <CheckItem>Everything in Free</CheckItem>
                <CheckItem>Unlimited loads</CheckItem>
                <CheckItem>AI Advisor</CheckItem>
                <CheckItem>Full IFTA reports</CheckItem>
                <CheckItem>Tax Center</CheckItem>
                <CheckItem>PDF exports</CheckItem>
                <CheckItem>Priority support</CheckItem>
              </ul>
              <a
                className="btn btn--primary btn--block"
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer">
                Get Pro
              </a>
            </article>
          </div>

          <p className="pricing-note">
            Cancel anytime. No contracts. No hidden fees. One bad load avoided pays for 12 months of Pro.
          </p>
        </div>
      </section>

      <section className="section section--alt" data-reveal id="about-us">
        <div className="container">
          <div className="section__header section__header--center">
            <Eyebrow>Why I built this</Eyebrow>
            <h2 className="section__title">I was the guy this app is for.</h2>
          </div>
          <div className="founder-card" data-reveal>
            <div className="founder-card__avatar" aria-hidden>
              J
            </div>
            <div className="founder-card__content">
              <div className="founder-card__body">
                <p>
                  Ten years behind the wheel as an owner-operator. Built a trucking business from scratch. Ran the
                  lanes. Fought the brokers. Did IFTA at midnight in a truck stop parking lot.
                </p>
                <p>
                  Every app I tried was built by someone who&apos;d never sat in a cab. Software designed for
                  dispatchers. Accounting tools that assumed you had a desk. Nothing that understood deadhead math,
                  or knew what it costs to run empty 200 miles.
                </p>
                <p>
                  So I built the app I needed. One that works while you&apos;re driving. One that knows what a load
                  actually costs you. One that has your back at 3am on I-80.
                </p>
              </div>
              <ul className="founder-card__checks">
                <CheckItem>10 years owner-operator experience</CheckItem>
                <CheckItem>Understands real trucking economics</CheckItem>
                <CheckItem>Built for the road, not the office</CheckItem>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" data-reveal id="blog">
        <div className="container">
          <div className="section__header section__header--center">
            <Eyebrow>Owner-operator blog</Eyebrow>
            <h2 className="section__title">Cost per mile, IFTA, and load math — written for you, not a fleet office.</h2>
          </div>
          <div className="blog-grid blog-grid--home">
            {featured.map((post) => (
              <article key={post.slug} className="blog-card">
                <p className="blog-card__meta">
                  <span>{post.category}</span>
                  <span aria-hidden>·</span>
                  <span>{post.readMinutes} min read</span>
                </p>
                <h3 className="blog-card__title">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="blog-card__excerpt">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="blog-card__more">
                  Read article →
                </Link>
              </article>
            ))}
          </div>
          <p className="blog-home-more">
            <Link to="/blog" className="btn btn--outline">
              View all 10 guides
            </Link>
          </p>
        </div>
      </section>

      <section className="cta" data-reveal id="download">
        <div className="cta__bg" aria-hidden />
        <div className="cta__inner container">
          <h2 className="cta__title">Know your numbers. Own your business.</h2>
          <p className="cta__sub">
            Join owner-operators who finally know exactly what they&apos;re making — mile by mile.
          </p>
          <div className="cta__actions">
            <a
              className="btn btn--primary btn--lg btn--inverse"
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer">
              Download for iOS — App Store
            </a>
          </div>
          <p className="cta__fine">Free 14-day trial · No credit card required</p>
        </div>
      </section>
    </main>
  )
}
