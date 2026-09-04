import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { parseMarkdown } from './parseMarkdown'

function Inline({ text }) {
  const parts = []
  const re = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g
  let last = 0
  let match
  let key = 0
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    const token = match[0]
    if (token.startsWith('**')) {
      parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>)
    } else {
      const m = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      const href = m[2]
      const label = m[1]
      parts.push(
        href.startsWith('/') ? (
          <Link key={key++} to={href}>
            {label}
          </Link>
        ) : (
          <a key={key++} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        )
      )
    }
    last = match.index + token.length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

export function MarkdownBody({ markdown }) {
  const blocks = parseMarkdown(markdown)
  return (
    <div className="prose">
      {blocks.map((block, i) => {
        if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>
        if (block.type === 'h3') return <h3 key={i}>{block.text}</h3>
        if (block.type === 'ul') {
          return (
            <ul key={i}>
              {block.items.map((item, j) => (
                <li key={j}>
                  <Inline text={item} />
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p key={i}>
            <Inline text={block.text} />
          </p>
        )
      })}
    </div>
  )
}

export function FaqList({ faq }) {
  if (!faq?.length) return null
  return (
    <div className="blog-faq">
      <h2>Owner-operator FAQ</h2>
      {faq.map((item) => (
        <Fragment key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </Fragment>
      ))}
    </div>
  )
}
