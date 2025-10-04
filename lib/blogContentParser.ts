/**
 * Advanced blog content parser with markdown-like formatting
 * Supports: headings, lists, bold, italic, links, blockquotes, code blocks
 */

export function parseBlogContent(content: string): string {
  if (!content) return ''

  // Check if content is already HTML (contains HTML tags)
  const hasHTMLTags = /<[a-z][\s\S]*>/i.test(content)

  if (hasHTMLTags) {
    // Content is already HTML, just add internal linking
    let html = content

    // Internal linking - convert mentions of product names to links
    const internalLinks: { [key: string]: string } = {
      'PeakAI': '/',
      'LeadsAI': '/leads-ai',
      'Director Phone': '/director-phone',
      'Unlimited Email': '/unlimited-email',
      'Features': '/features',
      'Pricing': '/pricing',
      'Partners': '/partners',
      'MSME': '/msme',
    }

    Object.entries(internalLinks).forEach(([text, url]) => {
      // Only link if not already in a link or heading
      const regex = new RegExp(`(?<!<a[^>]*>)(?<!<h[1-6][^>]*>)\\b(${text})\\b(?![^<]*<\\/a>)(?![^<]*<\\/h[1-6]>)`, 'gi')
      html = html.replace(regex, `<a href="${url}" class="internal-link text-accent-600 hover:text-accent-700 underline">${text}</a>`)
    })

    return html
  }

  let html = content

  // 1. Escape HTML entities first (only for markdown content)
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  // 2. Code blocks (```code```)
  html = html.replace(/```([\s\S]*?)```/g, '<pre class="code-block"><code>$1</code></pre>')

  // 3. Inline code (`code`)
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')

  // 4. Headings (## Heading)
  html = html.replace(/^### (.*?)$/gm, '<h3 class="heading-3">$1</h3>')
  html = html.replace(/^## (.*?)$/gm, '<h2 class="heading-2">$1</h2>')
  html = html.replace(/^# (.*?)$/gm, '<h1 class="heading-1">$1</h1>')

  // 5. Blockquotes (> quote)
  html = html.replace(/^&gt; (.*?)$/gm, '<blockquote class="blockquote">$1</blockquote>')

  // 6. Bold (**text** or __text__)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>')

  // 7. Italic (*text* or _text_)
  html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>')
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>')

  // 8. Links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="content-link">$1</a>')

  // 9. Unordered lists (- item or * item)
  html = html.replace(/^[*-] (.*?)$/gm, '<li class="list-item">$1</li>')
  html = html.replace(/(<li class="list-item">.*?<\/li>\n?)+/gs, '<ul class="unordered-list">$&</ul>')

  // 10. Ordered lists (1. item)
  html = html.replace(/^\d+\. (.*?)$/gm, '<li class="list-item">$1</li>')
  html = html.replace(/(<li class="list-item">.*?<\/li>\n?)+/gs, (match) => {
    if (match.includes('unordered-list')) return match
    return `<ol class="ordered-list">${match}</ol>`
  })

  // 11. Horizontal rules (--- or ***)
  html = html.replace(/^(---|___|\*\*\*)$/gm, '<hr class="horizontal-rule" />')

  // 12. Paragraphs
  html = html.replace(/\n{2,}/g, '</p><p class="paragraph">')
  html = html.replace(/\n/g, ' ')

  // 13. Wrap in paragraph tags
  html = `<p class="paragraph">${html}</p>`

  // 14. Clean up empty paragraphs
  html = html.replace(/<p class="paragraph"><\/p>/g, '')

  // 15. Fix paragraphs around special elements
  html = html.replace(/<p class="paragraph">(<h[1-3])/g, '$1')
  html = html.replace(/(<\/h[1-3]>)<\/p>/g, '$1')
  html = html.replace(/<p class="paragraph">(<ul|<ol|<blockquote|<pre|<hr)/g, '$1')
  html = html.replace(/(<\/ul>|<\/ol>|<\/blockquote>|<\/pre>|<\/hr>)<\/p>/g, '$1')

  // 16. Internal linking - convert mentions of product names to links
  const internalLinks: { [key: string]: string } = {
    'PeakAI': '/',
    'LeadsAI': '/leads-ai',
    'Director Phone': '/director-phone',
    'Unlimited Email': '/unlimited-email',
    'Features': '/features',
    'Pricing': '/pricing',
    'Partners': '/partners',
    'MSME': '/msme',
  }

  Object.entries(internalLinks).forEach(([text, url]) => {
    // Only link if not already in a link
    const regex = new RegExp(`(?<!<a[^>]*>)\\b(${text})\\b(?![^<]*<\\/a>)`, 'gi')
    html = html.replace(regex, `<a href="${url}" class="internal-link">$1</a>`)
  })

  return html
}

/**
 * Extract internal links from blog content for SEO
 */
export function extractInternalLinks(content: string): string[] {
  const links: string[] = []
  const regex = /\[([^\]]+)\]\(([^\)]+)\)/g
  let match

  while ((match = regex.exec(content)) !== null) {
    const url = match[2]
    if (url.startsWith('/') || url.includes('thepeakai.com')) {
      links.push(url)
    }
  }

  return [...new Set(links)] // Remove duplicates
}
