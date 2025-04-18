import { useEffect, useState } from 'react'
import WikiViewer from '../components/WikiViewer'
import { useTheme } from '../components/ThemeContext'

// keys for localStorage
const STORAGE_KEYS = {
  history: 'wiki_history',
  currentIndex: 'wiki_currentIndex',
  clicks: 'wiki_clicks',
  goalTitle: 'wiki_goalTitle',
  startTime: 'wiki_startTime',
}

// format ms to MM:SS
const formatTime = ms => {
  const m = Math.floor(ms / 60000)
  const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0')
  return `${m}:${s}`
}

const GamePage = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // pause & start flags
  const [gameStarted, setGameStarted] = useState(false)
  const [paused, setPaused] = useState(false)
  const [pauseStart, setPauseStart] = useState(null)
  const [accumPaused, setAccumPaused] = useState(0)

  // persistent states
  const [history, setHistory] = useState([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [clicks, setClicks] = useState(0)
  const [goalTitle, setGoalTitle] = useState(null)
  const [startTime, setStartTime] = useState(0)
  const [elapsed, setElapsed] = useState(0)

  // new states for selecting challenge
  const [challenges, setChallenges] = useState([])
  const [selectedChallenge, setSelectedChallenge] = useState(null)

  // fetch predefined challenges
  useEffect(() => {
    fetch('/api/get-precomputed-pairs')
      .then(res => res.json())
      .then(data => setChallenges(data))
  }, [])

  // initialize game from selected challenge
  const initGameFromSelection = () => {
    if (!selectedChallenge) return
    const now = Date.now()
    setHistory([selectedChallenge.start])
    setCurrentIndex(0)
    setGoalTitle(selectedChallenge.goal)
    setClicks(0)
    setStartTime(now)
    setElapsed(0)
    setAccumPaused(0)
    localStorage.setItem(STORAGE_KEYS.history, JSON.stringify([selectedChallenge.start]))
    localStorage.setItem(STORAGE_KEYS.currentIndex, '0')
    localStorage.setItem(STORAGE_KEYS.goalTitle, selectedChallenge.goal)
    localStorage.setItem(STORAGE_KEYS.clicks, '0')
    localStorage.setItem(STORAGE_KEYS.startTime, now.toString())
    setGameStarted(true)
    setPaused(false)
  }

  // load stored game on mount
  useEffect(() => {
    const savedGoal = localStorage.getItem(STORAGE_KEYS.goalTitle)
    if (savedGoal) {
      const h = JSON.parse(localStorage.getItem(STORAGE_KEYS.history) || '[]')
      const idx = parseInt(localStorage.getItem(STORAGE_KEYS.currentIndex), 10)
      const c = parseInt(localStorage.getItem(STORAGE_KEYS.clicks), 10)
      const t0 = parseInt(localStorage.getItem(STORAGE_KEYS.startTime), 10)
      setHistory(h)
      setCurrentIndex(isNaN(idx) ? 0 : idx)
      setClicks(isNaN(c) ? 0 : c)
      setGoalTitle(savedGoal)
      setStartTime(isNaN(t0) ? Date.now() : t0)
      setElapsed(Date.now() - (isNaN(t0) ? Date.now() : t0) - accumPaused)
      setGameStarted(true)
    }
  }, [])

  // timer effect
  useEffect(() => {
    if (!gameStarted || paused) return
    const id = setInterval(() => {
      setElapsed(Date.now() - startTime - accumPaused)
    }, 1000)
    return () => clearInterval(id)
  }, [gameStarted, paused, startTime, accumPaused])

  const articleTitle = history[currentIndex]

  // check if user reached goal page
  useEffect(() => {
    if (!gameStarted || paused) return;

    if (articleTitle === goalTitle) {
      setPaused(true); // stop timer
      const timeTaken = Date.now() - startTime - accumPaused;

      const playerName = prompt("🎉 You reached the goal!\nEnter your name for the leaderboard:");

      if (playerName) {
        fetch('/api/submit-challenge-run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            start: history[0],
            goal: goalTitle,
            player_name: playerName,
            time_ms: timeTaken,
            clicks: clicks
          })
        }).then(() => {
          alert(`✅ Score submitted!\nTime: ${formatTime(timeTaken)}, Clicks: ${clicks}`);
          handleEndGame();
        });
      } else {
        alert("❌ Score not submitted. No name entered.");
        handleEndGame();
      }
    }
  }, [articleTitle, goalTitle, gameStarted])

  // navigation handlers count clicks
  const handleNavigate = next => {
    if (paused) return
    const newHist = history.slice(0, currentIndex + 1).concat(next)
    setHistory(newHist)
    setCurrentIndex(ci => ci + 1)
    setClicks(c => c + 1)
    localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(newHist))
    localStorage.setItem(STORAGE_KEYS.currentIndex, String(currentIndex + 1))
    localStorage.setItem(STORAGE_KEYS.clicks, String(clicks + 1))
  }
  const handleBack = () => {
    if (!paused && currentIndex > 0) {
      setCurrentIndex(ci => ci - 1)
      setClicks(c => c + 1)
      localStorage.setItem(STORAGE_KEYS.currentIndex, String(currentIndex - 1))
      localStorage.setItem(STORAGE_KEYS.clicks, String(clicks + 1))
    }
  }
  const handleForward = () => {
    if (!paused && currentIndex < history.length - 1) {
      setCurrentIndex(ci => ci + 1)
      setClicks(c => c + 1)
      localStorage.setItem(STORAGE_KEYS.currentIndex, String(currentIndex + 1))
      localStorage.setItem(STORAGE_KEYS.clicks, String(clicks + 1))
    }
  }

  // pause / resume game
  const handlePause = () => {
    if (!paused) {
      setPauseStart(Date.now())
      setPaused(true)
    } else {
      const duration = Date.now() - pauseStart
      setAccumPaused(a => a + duration)
      setPauseStart(null)
      setPaused(false)
    }
  }

  // end game and reset
  const handleEndGame = () => {
    alert(`Game over! Time: ${formatTime(elapsed)}, Clicks: ${clicks}`)
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k))
    setGameStarted(false)
    setPaused(false)
  }

  // common button style
  const commonBtn = {
    border: 'none',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    color: isDark ? '#fff' : '#1e1e1e',
    transition: 'transform 0.3s ease-in-out'
  }

  // pre-game challenge selection UI
  if (!gameStarted) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2 style={{ color: isDark ? '#f9fafb' : '#1e1e1e' }}>Choose a Challenge</h2>
        {challenges.map((c, i) => (
          <button
            key={i}
            onClick={() => setSelectedChallenge(c)}
            style={{
              ...commonBtn,
              display: 'block',
              margin: '0.5rem auto',
              background: selectedChallenge?.start === c.start && selectedChallenge?.goal === c.goal ? '#4299e1' : (isDark ? '#2d3748' : '#cbd5e0')
            }}
          >
            {c.start.replace(/_/g, ' ')} → {c.goal.replace(/_/g, ' ')} ({c.distance} clicks)
          </button>
        ))}
        {selectedChallenge && (
          <button onClick={initGameFromSelection} style={{
            ...commonBtn,
            marginTop: '1.5rem',
            background: isDark ? '#2f855a' : '#48bb78',
            animation: 'pulse 1.5s infinite',
            cursor: 'pointer'
          }}>
            Start Game
          </button>
        )}
        <style>{`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.08); }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>
    )
  }

  // main game UI
  return (
    <div style={{ padding: '2rem', position: 'relative' }}>
      <h2 style={{ color: isDark ? '#f9fafb' : '#1e1e1e' }}>
        Navigate to: {goalTitle?.replace(/_/g, ' ') || '...'}
      </h2>

      <div style={{ position: 'relative' }}>
        {articleTitle ? (
          <WikiViewer title={articleTitle} onNavigate={handleNavigate} />
        ) : (
          <p style={{ color: isDark ? '#f9fafb' : '#1e1e1e' }}>Loading…</p>
        )}
        <div style={{
          position: 'absolute', top: '0.5rem', right: '0.5rem',
          background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.6)',
          color: isDark ? '#f9fafb' : '#fff', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.9rem'
        }}>
          Time: {formatTime(elapsed)}
        </div>
      </div>

      <button onClick={handleBack} disabled={currentIndex <= 0} style={{
        position: 'absolute', bottom: '1rem', left: '0rem',
        ...commonBtn, background: isDark ? '#4a5568' : '#e2e8f0', cursor: currentIndex > 0 ? 'pointer' : 'not-allowed'
      }}>
        ◀ Back
      </button>
      <button onClick={handlePause} style={{
        position: 'absolute', bottom: '-2rem', left: '0rem',
        ...commonBtn,
        background: isDark ? '#dd6b20' : '#ed8936',
        cursor: 'pointer',
        animation: paused ? 'pulse 1.5s infinite' : 'none'
      }}>
        {paused ? 'Resume' : 'Pause'}
      </button>
      <button onClick={handleEndGame} style={{
        position: 'absolute', bottom: '-2rem', left: '6rem',
        ...commonBtn, background: isDark ? '#e53e3e' : '#fca5a5', cursor: 'pointer'
      }}>
        End Game
      </button>
      <button onClick={handleForward} disabled={currentIndex >= history.length - 1} style={{
        position: 'absolute', bottom: '1rem', left: '6rem',
        ...commonBtn, background: isDark ? '#4a5568' : '#e2e8f0', cursor: currentIndex < history.length - 1 ? 'pointer' : 'not-allowed'
      }}>
        Forward ▶
      </button>
      <div style={{
        position: 'absolute', bottom: '1rem', right: '1rem',
        background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.6)', color: isDark ? '#f9fafb' : '#fff', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.9rem'
      }}>
        Clicks: {clicks}
      </div>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

export default GamePage
