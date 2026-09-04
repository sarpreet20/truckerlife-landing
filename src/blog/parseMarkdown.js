export function parseMarkdown(md) {
  const lines = md.replace(/\r\n/g, '\n').trim().split('\n')
  const blocks = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) {
      i += 1
      continue
    }
    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3) })
      i += 1
      continue
    }
    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.slice(4) })
      i += 1
      continue
    }
    if (line.startsWith('- ')) {
      const items = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i += 1
      }
      blocks.push({ type: 'ul', items })
      continue
    }
    const para = [line.trim()]
    i += 1
    while (i < lines.length && lines[i].trim() && !lines[i].startsWith('#') && !lines[i].startsWith('- ')) {
      para.push(lines[i].trim())
      i += 1
    }
    blocks.push({ type: 'p', text: para.join(' ') })
  }
  return blocks
}
