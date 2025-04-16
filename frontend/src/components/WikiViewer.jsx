import { useEffect, useState, useRef } from 'react'

const WikiViewer = ({ title, onNavigate }) => {
  const [html, setHtml] = useState('<p>Loading...</p>')
  // useRef so cache survives rerenders
  const cacheRef = useRef({})

  useEffect(() => {
    if (!title) {
      setHtml('<p>No article selected</p>')
      return
    }

    const fetchWiki = async () => {
      // if we’ve already cleaned this page, just use it
      if (cacheRef.current[title]) {
        setHtml(cacheRef.current[title])
        return
      }

      try {
        const res = await fetch(
          `https://en.wikipedia.org/w/api.php?action=parse&page=${title}&format=json&origin=*`
        )
        const data = await res.json()
        let parsedHTML = data?.parse?.text?.['*'] || '<p>Article not found</p>'

        // fix all internal links to cheat‑mode
        parsedHTML = parsedHTML.replace(
          /href="\/wiki\/([^":#]+)"/g,
          (_, article) => `href="#" data-wiki-title="${decodeURIComponent(article)}"`
        )

        // build a DOM to surgically remove stuff
        const container = document.createElement('div')
        container.innerHTML = parsedHTML

        // 1) remove any edit‑section controls
        container.querySelectorAll('span.mw-editsection').forEach(el => el.remove())
        // (optionally) remove the TOC
        container.querySelectorAll('#toc, .toc').forEach(el => el.remove())

        // 2) convert each headline span into plain text so you keep "History", but lose its wrapper
        container.querySelectorAll('span.mw-headline').forEach(el => {
          const txt = document.createTextNode(el.textContent || '')
          el.replaceWith(txt)
        })

        // 3) remove all the other cruft
        const selectors = [
          '.infobox',
          '.reference',
          'sup',
          '.navbox',
          '.reflist',
          'style',
          'script',
          '.external',
          '.shortdescription',
          '.noprint',
          '.plainlinks'
        ]
        selectors.forEach(sel =>
          container.querySelectorAll(sel).forEach(el => el.remove())
        )

        // 4) nuke the entire References / External Links sections
        container.querySelectorAll('h2, h3').forEach(heading => {
          const txt = heading.textContent?.toLowerCase() || ''
          if (
            txt.includes('references') ||
            txt.includes('external links') ||
            txt.includes('citations')
          ) {
            let sib = heading.nextElementSibling
            while (sib && !['H2', 'H3'].includes(sib.tagName)) {
              const next = sib.nextElementSibling
              sib.remove()
              sib = next
            }
            heading.remove()
          }
        })

        // 5) finally, strip any remaining non‑/wiki/ links
        container.querySelectorAll('a').forEach(link => {
          const href = link.getAttribute('href') || ''
          // keep only our data‑wiki‑title links
          if (!link.hasAttribute('data-wiki-title')) {
            link.remove()
          }
        })

        const cleaned = container.innerHTML
        cacheRef.current[title] = cleaned
        setHtml(cleaned)
      } catch (err) {
        console.error('WikiViewer error:', err)
        setHtml('<p>Error loading article</p>')
      }
    }

    fetchWiki()
  }, [title])

  const handleClick = e => {
    const a = e.target.closest('a[data-wiki-title]')
    if (!a) return
    e.preventDefault()
    onNavigate(a.getAttribute('data-wiki-title'))
  }

  return (
    <div
      onClick={handleClick}
      style={{
        padding: '1rem',
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)',
        borderRadius: '8px',
        maxHeight: '70vh',
        overflowY: 'auto',
        marginTop: '1rem',
        border: '1px solid rgba(255,255,255,0.1)',
        lineHeight: '1.6'
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default WikiViewer