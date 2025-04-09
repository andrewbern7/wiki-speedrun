import { useEffect, useState } from 'react'

const WikiViewer = ({ title }) => {
  const [html, setHtml] = useState('<p>Loading...</p>')

  useEffect(() => {
    const fetchWiki = async () => {
      try {
        const res = await fetch(
          `https://en.wikipedia.org/w/api.php?action=parse&page=${title}&format=json&origin=*`
        )
        const data = await res.json()
        const parsedHTML = data?.parse?.text?.['*']
        setHtml(parsedHTML || '<p>Article not found</p>')
      } catch (err) {
        console.error(err)
        setHtml('<p>Error loading article</p>')
      }
    }

    fetchWiki()
  }, [title])

  return (
    <div
      style={{
        padding: '1rem',
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)',
        borderRadius: '8px',
        maxHeight: '70vh',
        overflowY: 'scroll',
        marginTop: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        lineHeight: '1.6'
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default WikiViewer