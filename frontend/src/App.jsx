import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import GameContents from './pages/GameContents'
import TeamIntro from './pages/TeamIntro'
import LeaderboardPage from './pages/LeaderboardPage'
import AppLayout from './components/AppLayout'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/gamecontents" element={<GameContents />} />
        <Route path="/teamintro" element={<TeamIntro />} />
      </Route>
    </Routes>
  )
}

export default App
