import { useEffect, useState } from 'react'

const WikiViewer = ({ title, onNavigate }) => {
  const [html, setHtml] = useState('<p>Loading...</p>')
  const cache = {}

  useEffect(() => {
    console.log(`[WikiViewer] Current title: ${title}`)
    if (!title) {
      console.warn('[WikiViewer] No title provided.')
      setHtml('<p>No article selected</p>')
      return
    }

    const fetchWiki = async () => {
      if (cache[title]) {
        console.log(`[WikiViewer] Loaded from cache: ${title}`)
        setHtml(cache[title])
        return
      }
      try {
        const res = await fetch(
          `https://en.wikipedia.org/w/api.php?action=parse&page=${title}&format=json&origin=*`
        )
        const data = await res.json()
        let parsedHTML = data?.parse?.text?.['*'] || '<p>Article not found</p>'

        // Preprocess internal links
        parsedHTML = parsedHTML.replace(
          /href="\/wiki\/([^":#]+)"/g,
          (_, article) => `href="#" data-wiki-title="${decodeURIComponent(article)}"`
        )

        cache[title] = parsedHTML
        setHtml(parsedHTML)
        console.log(`[WikiViewer] Fetched and cached: ${title}`)
      } catch (err) {
        console.error(`[WikiViewer] Error loading article: ${title}`, err)
        setHtml('<p>Error loading article</p>')
      }
    }

    fetchWiki()
  }, [title])

  const handleClick = (e) => {
    const link = e.target.closest('a[data-wiki-title]')
    if (!link) return
    e.preventDefault()
    const nextTitle = link.getAttribute('data-wiki-title')
    console.log(`[WikiViewer] Navigating to: ${nextTitle}`)
    if (onNavigate) onNavigate(nextTitle)
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
        overflowY: 'scroll',
        marginTop: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        lineHeight: '1.6'
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

const getRandomArticle = async () => {
  const res = await fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=1&rnnamespace=0&origin=*')
  const data = await res.json()
  return data?.query?.random?.[0]?.title?.replace(/ /g, '_') || 'Elon_Musk'
}

const GamePage = () => {
  const [articleTitle, setArticleTitle] = useState(null)
  const [goalTitle, setGoalTitle] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      const start = await getRandomArticle()
      const goal = await getRandomArticle()
      setArticleTitle(start)
      setGoalTitle(goal)
    }
    fetchArticles()
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Navigate to: {goalTitle || '...'}</h2>
      {articleTitle && <WikiViewer title={articleTitle} onNavigate={setArticleTitle} />}
    </div>
  )
}

export default GamePage
