import type { ReactNode } from "react";

/* ================= custom inline icons ================= */
type IconProps = { className?: string };

export const IconApple = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.05 12.54c-.03-2.62 2.14-3.88 2.24-3.94-1.22-1.79-3.12-2.03-3.8-2.06-1.61-.16-3.15.95-3.97.95-.82 0-2.09-.93-3.44-.9-1.77.03-3.4 1.03-4.31 2.61-1.84 3.19-.47 7.91 1.33 10.5.88 1.27 1.92 2.69 3.29 2.64 1.32-.05 1.82-.86 3.42-.86 1.6 0 2.05.86 3.45.83 1.42-.02 2.32-1.29 3.19-2.56 1-1.47 1.41-2.89 1.44-2.96-.03-.02-2.76-1.06-2.84-4.25zM14.44 4.83c.72-.88 1.21-2.1 1.08-3.33-1.04.04-2.3.69-3.05 1.57-.67.78-1.26 2.03-1.1 3.23 1.16.09 2.35-.59 3.07-1.47z" />
  </svg>
);

export const IconArrow = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M4 12h15" /><path d="M13 6l6 6-6 6" />
  </svg>
);

export const IconCheck = ({ className = "w-4 h-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M4 12.5l5.2 5.2L20 6.5" />
  </svg>
);

export const IconMic = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="9" y="2.5" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3.5" />
    <path d="M2 9v4M22 9v4" strokeWidth="2.4" />
  </svg>
);

export const IconGauge = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M4.5 18.5a9 9 0 1 1 15 0" />
    <path d="M12 13.8L16.2 8" strokeWidth="2.2" />
    <circle cx="12" cy="14.5" r="1.6" fill="currentColor" stroke="none" />
  </svg>
);

export const IconRoute = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="5.5" r="2.5" />
    <path d="M8 18.5h6.5a4 4 0 0 0 0-8h-5a4 4 0 0 1 0-8H12" strokeDasharray="3.5 3" />
  </svg>
);

export const IconChip = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="6.5" y="6.5" width="11" height="11" rx="1.5" />
    <path d="M10 10.5h4M10 13.5h2.5" />
    <path d="M9 2.5v4M15 2.5v4M9 17.5v4M15 17.5v4M2.5 9h4M2.5 15h4M17.5 9h4M17.5 15h4" />
  </svg>
);

export const IconLedger = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M6 2.5h12.5v19H6a2 2 0 0 1-2-2v-15a2 2 0 0 1 2-2z" />
    <path d="M8.5 7.5h7M8.5 11h7M8.5 14.5h4" />
    <path d="M15.5 16.8l1.6 1.6 3-3.4" strokeWidth="2" />
  </svg>
);

export const IconWarn = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M12 3.5L22 20H2L12 3.5z" /><path d="M12 10v4.5" /><circle cx="12" cy="17" r="0.4" fill="currentColor" />
  </svg>
);

export const IconDiamond = ({ className = "w-6 h-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="5.5" y="5.5" width="13" height="13" rx="2" transform="rotate(45 12 12)" fill="currentColor" opacity="0.14" />
    <rect x="5.5" y="5.5" width="13" height="13" rx="2" transform="rotate(45 12 12)" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8.5 14L12 8.5L15.5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

export const Logo = ({ className = "w-9 h-9" }: IconProps) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
    <rect x="7" y="7" width="26" height="26" rx="4" transform="rotate(45 20 20)" fill="#FFB400" />
    <path d="M13 24.5L20 14.5L27 24.5" stroke="#14161a" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.5 24.5h7" stroke="#14161a" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="1.5 3.2" />
  </svg>
);

/* ================= constants ================= */

export const APP_STORE_URL = "https://apps.apple.com/us/app/trucker-life-ai/id6769266788";
export const SITE_URL = "https://www.truckerlifeai.com";

export const TICKER: string[] = [
  "DIESEL NAT'L AVG $3.87 / GAL",
  "IFTA Q2 FILING — DUE JUL 31",
  "LOAD BOARD: DFW → PHX · $2.45/MI",
  "I-80 WYO — HIGH WIND ADVISORY",
  "TRUE RPM TARGET: $2.30+",
  "DEADHEAD THIS WEEK: 11% — CATCH IT",
  "RECORDS: TAX-READY · 50 STATES",
  "BUILT BY AN OWNER-OPERATOR",
];

export const MARQUEE_LINES: string[] = [
  "DEADHEAD EATS MARGIN",
  "BROKER MATH ≠ YOUR MATH",
  "KNOW YOUR TRUE RPM",
  "IFTA WITHOUT THE ALL-NIGHTER",
  "VOICE-LOG AT 65 MPH",
  "EVERY MILE ACCOUNTED FOR",
];

/* ================= rewritten content ================= */

export type Problem = { idx: string; title: string; body: string; stat: string; statLabel: string };

export const PROBLEMS: Problem[] = [
  {
    idx: "01",
    title: "The broker's rate isn't your rate",
    body: "$2.45 a mile sounds solid — until you add 210 deadhead miles, 46¢ a mile in diesel, and a three-hour detention nobody's paying for. That load didn't run at $2.45. It ran at $1.08. You found out when the check cleared. The app finds out before you say yes.",
    stat: "−$1.37",
    statLabel: "per mile, broker rate vs. real rate",
  },
  {
    idx: "02",
    title: "Paperwork runs your truck 6 hours a month",
    body: "IFTA by state. Fuel receipts in the glovebox. Maintenance logs, per-diems, tax categories. Six hours a month, at a $95-an-hour operating cost, is $570 of margin burned on paperwork that should take twenty minutes.",
    stat: "$570",
    statLabel: "a month, burned on paperwork",
  },
  {
    idx: "03",
    title: "Office software for a cab job",
    body: "Every trucking tool on the market was designed for a dispatcher with a desk and two monitors. You've got a steering wheel and 600 miles today. Pull over and type — or skip the log. Either way, you lose.",
    stat: "0",
    statLabel: "apps designed for the driver's seat",
  },
];

export type Feature = { id: string; num: string; name: string; tag: string; short: string; copy: string; proof: string; icon: ReactNode };

export const FEATURES: Feature[] = [
  {
    id: "voice",
    num: "01",
    name: "Voice Logging",
    tag: "SAY IT. IT'S BOOKED.",
    short: "Log loads, fuel, and repairs out loud — without touching the screen.",
    copy: "Rolling at 65 and the broker confirms the load? Say it. Trucker Life AI pulls out the miles, the rate, the fuel, and the state lines, then books the entry to your ledger before the next exit. No typing at the scale, no receipts in the glovebox, no 'I'll log it later.' Later is how numbers go missing.",
    proof: "AVG ENTRY TIME: 14 SECONDS, HANDS ON THE WHEEL",
    icon: <IconMic className="w-6 h-6" />,
  },
  {
    id: "rate",
    num: "02",
    name: "True Rate Calculator",
    tag: "DEADHEAD INCLUDED",
    short: "Rate per loaded mile AND per total mile — with a lowball warning.",
    copy: "A quoted rate is a sales number. A true rate is a business number. The calculator prices every load per loaded mile AND per total mile — deadhead, fuel, and extras included — and warns you before you accept anything under your break-even. Not after you've already driven it.",
    proof: "ONE CAUGHT LOWBALL ≈ $300–$500 SAVED",
    icon: <IconGauge className="w-6 h-6" />,
  },
  {
    id: "ifta",
    num: "03",
    name: "IFTA & Reports",
    tag: "QUARTERLY, HANDLED",
    short: "Miles and fuel by state, logged weekly, filed in an afternoon.",
    copy: "IFTA isn't hard math — it's a records problem. The app tracks miles and fuel by state as you drive, so when the quarter closes your report is already built. Export it, file it, get back on the road. No more rebuilding a quarter from crumpled fuel receipts at midnight.",
    proof: "AUDIT-READY RECORDS FOR ALL 50 STATES",
    icon: <IconRoute className="w-6 h-6" />,
  },
  {
    id: "advisor",
    num: "04",
    name: "AI Advisor",
    tag: "A CO-DRIVER FOR THE NUMBERS",
    short: "Your margins, lanes, and fuel burn — explained in plain English.",
    copy: "Fuel up 12% this month? A lane quietly running 30¢ under your average? The advisor watches every entry and tells you what's bleeding and what's working — in plain English, weekly. It's the back-office analyst a one-truck operation could never afford to hire.",
    proof: "WEEKLY BRIEF, EVERY MONDAY MORNING",
    icon: <IconChip className="w-6 h-6" />,
  },
  {
    id: "tax",
    num: "05",
    name: "Tax-Ready Records",
    tag: "APRIL WITHOUT PANIC",
    short: "Every dollar categorized as you go. Your CPA gets a clean file.",
    copy: "Fuel, maintenance, permits, insurance, meals at 80% — categorized the moment you log them. When tax season hits, your records are already organized the way your accountant needs them. Owner-operators who track every deduction routinely find thousands the glovebox method missed.",
    proof: "AVG TRACKED DEDUCTIONS: $30K+ / YEAR",
    icon: <IconLedger className="w-6 h-6" />,
  },
];

export type LoadExample = {
  id: string; lane: string; gross: number; quoted: string; loaded: number; deadhead: number; fuel: number; extras: number;
};

export const LOADS: LoadExample[] = [
  { id: "A", lane: "DFW → PHOENIX", gross: 1840, quoted: "$2.45/mi", loaded: 751, deadhead: 210, fuel: 486, extras: 0 },
  { id: "B", lane: "TULSA → KANSAS CITY", gross: 844, quoted: "$2.10/mi", deadhead: 318, loaded: 402, fuel: 305, extras: 0 },
  { id: "C", lane: "DENVER → SALT LAKE", gross: 1679, quoted: "$2.78/mi", loaded: 604, deadhead: 68, fuel: 287, extras: 60 },
];

export const COST_TABLE: { item: string; perMile: string; note: string }[] = [
  { item: "Diesel + DEF", perMile: "≈ 46¢", note: "National avg $3.87/gal at 6.8 MPG" },
  { item: "Maintenance & repairs", perMile: "≈ 12¢", note: "Tires, oil, PMs, the surprise $1,400 alternator" },
  { item: "Truck payment", perMile: "≈ 30¢", note: "On a $2,600/mo note at 90K miles/yr" },
  { item: "Insurance & permits", perMile: "≈ 14¢", note: "Physical damage, liability, IFTA decal, plates" },
  { item: "Driver pay & misc", perMile: "≈ 55¢", note: "Your cut, meals, tolls, ELD, everything else" },
];

export const IFTA_QUARTERS = [
  { q: "Q1", months: "Jan – Mar", due: "April 30" },
  { q: "Q2", months: "Apr – Jun", due: "July 31" },
  { q: "Q3", months: "Jul – Sep", due: "October 31" },
  { q: "Q4", months: "Oct – Dec", due: "January 31" },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "Is the free trial really free?",
    a: "Yes — 14 days of the full Pro experience, no credit card, no card-on-file trick. When the trial ends you drop to the Free plan automatically. Nothing is charged unless you choose Pro.",
  },
  {
    q: "What exactly does Pro add?",
    a: "Unlimited loads, the AI Advisor, full IFTA reports by state, the Tax Center with deduction tracking, PDF exports you can hand straight to your accountant, and priority support from people who've actually run trucks.",
  },
  {
    q: "Will it work with my ELD?",
    a: "The app stands alone — no hardware required. If you keep your hours elsewhere, that's fine. Trucker Life AI handles the money side: loads, miles, fuel, expenses, IFTA, and taxes.",
  },
  {
    q: "I'm not tech-savvy. Can I still use it?",
    a: "That's the whole point. You talk, it types. If you can send a voice text, you can run this app. And if you get stuck, support is run by people who've done IFTA at a truck stop at midnight — they'll walk you through it.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Anytime, in two taps, no phone call and no 'retention specialist.' Your records stay exportable forever — they're your business, not our hostage.",
  },
  {
    q: "Does it really pay for itself?",
    a: "One caught lowball — say a $2.10 quote that's really $1.17 after 318 deadhead miles — saves $300–$500. Pro costs $29. The math isn't close. Then add the hours back: most owner-operators get six-plus a month away from paperwork.",
  },
];

export type BlogPost = { num: string; category: string; title: string; excerpt: string; url: string; takeaways: string[] };

export const BLOG: BlogPost[] = [
  {
    num: "A-01",
    category: "NUMBERS · 8 MIN",
    title: "How to Calculate Cost Per Mile as an Owner-Operator",
    excerpt: "Rate per mile is what the broker quotes. Cost per mile is what your truck actually spends. The gap between those two numbers is your entire business — and most owner-operators have never measured it.",
    url: "https://www.truckerlifeai.com/blog/owner-operator-cost-per-mile",
    takeaways: ["Split costs into fixed and variable — they behave differently", "Use real miles, not book miles: empty miles cost money too", "Re-run the number when diesel moves 25¢ or more"],
  },
  {
    num: "A-02",
    category: "IFTA & TAXES · 8 MIN",
    title: "IFTA Filing for Owner-Operators: A Quarterly Playbook That Takes Hours, Not Weekends",
    excerpt: "IFTA isn't hard math — it's a records problem. Log miles and fuel by state each week and you file in an afternoon. Rebuild it from receipts at the end of the quarter and you file in a lost weekend.",
    url: "https://www.truckerlifeai.com/blog/ifta-filing-for-owner-operators",
    takeaways: ["Four deadlines a year: Apr 30, Jul 31, Oct 31, Jan 31", "What matters is miles and fuel per state — track both weekly", "Late filings compound: penalties stack per jurisdiction"],
  },
  {
    num: "A-03",
    category: "LOADS · 8 MIN",
    title: "How Owner-Operators Know If a Load Is Profitable Before They Say Yes",
    excerpt: "A profitable load isn't a high loaded RPM. It's a true rate above your cost per mile — after deadhead, fuel, and the extras the broker forgot to mention. Here's the full checklist.",
    url: "https://www.truckerlifeai.com/blog/how-to-know-if-a-load-is-profitable",
    takeaways: ["Price the total miles, not just the loaded ones", "Know your break-even before the broker calls", "A detention clause is part of the rate — negotiate it"],
  },
];

export const TIMELINE = [
  { year: "YEAR 1", title: "CDL and company miles", body: "Learned the lanes, the hours, and how quickly a 'good rate' dissolves once fuel and miles are counted honestly." },
  { year: "YEAR 3", title: "First truck, first all-nighter", body: "Bought the first rig. Also did the first IFTA filing at midnight in a truck stop parking lot — with a calculator and a shoebox of receipts." },
  { year: "YEAR 7", title: "A business on paper", body: "Built the operation into a real business: spreadsheets, a CPA, and a growing suspicion that the software industry had never met an owner-operator." },
  { year: "YEAR 10", title: "Started building", body: "Every tool was made for dispatchers with desks. So the app that worked from a cab, at 65, got designed on a whiteboard in a sleeper berth." },
  { year: "TODAY", title: "Trucker Life AI ships", body: "Voice logging, true rate math, IFTA, and tax records — the whole back office, riding shotgun. Built by an owner-operator, for owner-operators." },
];
