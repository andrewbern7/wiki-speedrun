import { useEffect, useState } from 'react'
import WikiViewer from '../components/WikiViewer'

const getRandomArticle = async () => {
  const res = await fetch(
    'https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnlimit=1&rnnamespace=0&origin=*'
  )
  const data = await res.json()
  return (data?.query?.random?.[0]?.title || 'Elon_Musk').replace(/ /g, '_')
}

const GamePage = () => {
  const [articleTitle, setArticleTitle] = useState(null)
  const [goalTitle, setGoalTitle] = useState(null)
  const [clicks, setClicks] = useState(0)

  useEffect(() => {
    const boot = async () => {
      try {
        const [start, goal] = await Promise.all([
          getRandomArticle(),
          getRandomArticle()
        ])
        setArticleTitle(start)
        setGoalTitle(goal.replace(/_/g, ' '))
      } catch (err) {
        console.error('Failed to fetch start/goal:', err)
      }
    }
    boot()
  }, [])

  // wrap navigation so we also bump the click counter
  const handleNavigate = (nextTitle) => {
    setArticleTitle(nextTitle)
    setClicks(c => c + 1)
  }

  const handleEndGame = () => {
    alert(`Game over! You took ${clicks} clicks.`)
    // reset or redirect as you see fit
    setClicks(0)
    // e.g. setArticleTitle(null)
  }

  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      <h2>Navigate to: {goalTitle || '...'}</h2>

      {articleTitle ? (
        <WikiViewer
          title={articleTitle}
          onNavigate={handleNavigate}
        />
      ) : (
        <p>Loading…</p>
      )}

      {/* End Game button (bottom‑left) */}
      <button
        onClick={handleEndGame}
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          padding: '0.5rem 1rem',
          background: '#e53e3e',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        End Game
      </button>

      {/* Click counter (bottom‑right) */}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          background: 'rgba(0,0,0,0.6)',
          color: '#fff',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          fontSize: '0.9rem'
        }}
      >
        Clicks: {clicks}
      </div>
    </div>
  )
}

export default GamePage