import { useEffect, useState } from 'react'

const WikiViewer = ({ title }) => {
  const [html, setHtml] = useState('Loading...')

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `https://en.wikipedia.org/w/api.php?action=parse&page=${title}&format=json&origin=*`
        )
        const data = await res.json()
        const content = data?.parse?.text?.['*']
        setHtml(content || '<p>Article not found</p>')
      } catch (err) {
        console.error(err)
        setHtml('<p>Failed to load article.</p>')
      }
    }

    fetchArticle()
  }, [title])

  return (
    <div
      id="wiki-content"
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        maxHeight: '80vh',
        overflowY: 'scroll',
        padding: '1rem',
        backgroundColor: 'white',
        border: '1px solid #ccc'
      }}
    />
  )
}

export default WikiViewer
