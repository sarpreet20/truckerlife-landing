export const hubs = [
  {
    slug: 'owner-operator-numbers',
    title: 'Owner-Operator Numbers: Cost, Profit, Deadhead & True Rate',
    metaTitle: 'Owner-Operator Numbers Hub: CPM, Profit & True Rate',
    metaDescription:
      'Hub for owner-operator cost per mile, profit per mile, deadhead, and how to know if a load is profitable — the math that keeps a one-truck business alive.',
    keyword: 'owner operator cost per mile profit',
    date: '2026-09-05',
    category: 'Numbers',
    excerpt:
      'Rate boards talk loaded RPM. Owner-operators stay solvent with cost per mile, true rate, deadhead, and profit per mile. Start here.',
    posts: [
      'owner-operator-cost-per-mile',
      'owner-operator-profit-per-mile',
      'how-to-know-if-a-load-is-profitable',
      'deadhead-miles-owner-operator',
    ],
    body: `Owner-operators do not fail from lack of miles. They fail from saying yes on **loaded rate** and finding out the truth on the settlement.

This hub is the numbers stack: what it costs to turn a wheel, what is left after the truck and the empty miles, and how to kill a bad offer in sixty seconds.

## Start with cost, not the board

[Owner-operator cost per mile](/blog/owner-operator-cost-per-mile) is your break-even on **all** miles — loaded and deadhead. Without it, every quote is a guess.

## Then measure what you keep

[Profit per mile](/blog/owner-operator-profit-per-mile) is what remains after fuel, the note, insurance, and empty miles. Rate is marketing. Profit is payroll.

## Decide before you book

[How to know if a load is profitable](/blog/how-to-know-if-a-load-is-profitable) turns CPM into a yes/no: true rate = pay ÷ total miles. If true rate is under CPM, you are hauling their freight for free.

## Hunt the silent tax

[Deadhead miles](/blog/deadhead-miles-owner-operator) are the quiet weekly tax. A pretty loaded RPM with 15% empty is often a loser once you do the all-miles math.

## How to use this hub

1. Calculate CPM from your books this month
2. Set a personal floor: true rate ≥ CPM + the profit you need
3. Log deadhead on every empty
4. Review profit per mile weekly — not once a year

Trucker Life AI is built only for owner-operators so these numbers live in the cab, not a spreadsheet you never open.`,
  },
  {
    slug: 'ifta-and-taxes',
    title: 'IFTA & Taxes for Owner-Operators',
    metaTitle: 'IFTA & Taxes Hub for Owner-Operators',
    metaDescription:
      'Owner-operator hub for IFTA filing, fuel logs, tax deductions, and per diem — records that survive an audit and make quarterly filing an afternoon, not a second job.',
    keyword: 'IFTA filing owner operators taxes',
    date: '2026-09-05',
    category: 'Compliance',
    excerpt:
      'IFTA is miles and gallons by state. Income tax is the deduction story. Per diem and fuel logs connect them. Read the stack in order.',
    posts: [
      'ifta-filing-for-owner-operators',
      'owner-operator-fuel-log',
      'owner-operator-tax-deductions',
      'owner-operator-per-diem',
    ],
    body: `Compliance for owner-operators is not one form. It is a weekly habit that makes quarterlies boring.

## IFTA first

[IFTA filing for owner-operators](/blog/ifta-filing-for-owner-operators) is miles by state and gallons by state. Keep receipts. Do not invent MPG.

## Fuel log is the backbone

An [owner-operator fuel log](/blog/owner-operator-fuel-log) feeds IFTA **and** cost per mile. One stop, one line: gallons, state, total, odometer.

## Income-tax side

[Owner-operator tax deductions](/blog/owner-operator-tax-deductions) cover fuel, truck, insurance, road, and the quiet fees. IFTA is not your whole Schedule C story.

## Per diem without getting greedy

[Owner-operator per diem](/blog/owner-operator-per-diem) can matter — and it is easy to overclaim. Logs and nights away beat memory.

## Order of operations

1. Log fuel the day you pump
2. Capture state miles weekly
3. File IFTA on time
4. Hand a clean export to a trucking CPA for income tax

Nothing here is tax advice. It is a records system so you and your preparer are not guessing in April.`,
  },
  {
    slug: 'trucking-bookkeeping',
    title: 'Trucking Bookkeeping for Owner-Operators',
    metaTitle: 'Trucking Bookkeeping Hub for Owner-Operators',
    metaDescription:
      'Owner-operator bookkeeping hub: weekly tracking system and the expenses checklist so tax season is export-and-file, not glovebox archaeology.',
    keyword: 'trucking bookkeeping owner operators',
    date: '2026-09-05',
    category: 'Operations',
    excerpt:
      'The office is a driver’s seat. Bookkeeping only works if it fits the cab — weekly rhythm plus a complete expense list.',
    posts: ['trucking-bookkeeping-for-owner-operators', 'owner-operator-expenses-checklist'],
    body: `Owner-operator books fail when the filing cabinet is a door pocket and “I’ll catch up Sunday” becomes December.

## The weekly system

[Trucking bookkeeping for owner-operators](/blog/trucking-bookkeeping-for-owner-operators) is settlements, fuel, expenses, and miles on a rhythm you can keep tired.

## The checklist

The [owner-operator expenses checklist](/blog/owner-operator-expenses-checklist) catches the quiet money: factoring, wash, parking, scales, subscriptions — the lines that fake your CPM when you only log diesel.

## Why this hub exists

Numbers hubs tell you **what** to calculate. This hub is **how** the inputs stay honest. Without bookkeeping, cost per mile is a story.

Link both guides from your phone. Snap receipts the day they happen. Separate personal from business when you can.

Trucker Life AI is built for that cab workflow — loads, fuel, maintenance, and travel expenses in one place.`,
  },
]

export function getHub(slug) {
  return hubs.find((h) => h.slug === slug)
}
