import { useTheme } from '../components/ThemeContext'

const HomePage = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const pageStyles = {
    minHeight: '100vh',
    padding: '4rem 2rem',
    backgroundColor: isDark ? '#1e1e1e' : '#f3f4f6',
    color: isDark ? '#f9fafb' : '#1e1e1e',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'system-ui, sans-serif',
    lineHeight: 1.75
  }

  const headerStyle = {
    fontSize: '3.5rem',
    fontWeight: 800,
    color: isDark ? '#60a5fa' : '#1e40af',
    marginBottom: '1.5rem',
    textAlign: 'center'
  }

  const subheadingStyle = {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginTop: '2rem',
    marginBottom: '1rem',
    textAlign: 'center',
    color: isDark ? '#a0aec0' : '#1e3a8a'
  }

  const sectionStyle = {
    maxWidth: '850px',
    textAlign: 'left',
    fontSize: '1.15rem'
  }

  const listStyle = {
    paddingLeft: '1.5rem',
    marginTop: '0.5rem'
  }

  const listItemStyle = {
    marginBottom: '0.75rem'
  }

  return (
    <div style={pageStyles}>
      <h1 style={headerStyle}>Wiki Speedrun Trainer</h1>

      <div style={sectionStyle}>
        <p>
          The Wiki Speedrun Trainer is an educational and competitive tool designed to help users improve their research skills, knowledge of Wikipedia's structure, and general topic awareness. Your objective is to reach a designated target article starting from a specific origin, using only in-article links — all while minimizing your time and number of clicks.
        </p>

        <h2 style={subheadingStyle}>How It Works</h2>
        <p>
          Before starting, you can select from a curated set of challenges — each consisting of a start and goal article. When the game begins, you’ll be presented with the start page and a live timer. Navigate using only clickable Wikipedia links. Once you reach the target page, the game ends and your performance is automatically recorded.
        </p>

        <h2 style={subheadingStyle}>Core Features</h2>
        <ul style={listStyle}>
          <li style={listItemStyle}>Challenge-based navigation with precomputed Wikipedia article paths</li>
          <li style={listItemStyle}>Accurate timing and click tracking for every speedrun attempt</li>
          <li style={listItemStyle}>A public leaderboard for each challenge showing the top performances</li>
          <li style={listItemStyle}>Responsive, accessible interface with full light/dark mode support</li>
        </ul>

        <h2 style={subheadingStyle}>Ready to Begin?</h2>
        <p>
          Head to the <strong>Game</strong> tab to choose a challenge and start playing. You can review top scores on the <strong>Leaderboard</strong> page and track your progress over time.
        </p>
      </div>
    </div>
  )
}

export default HomePage
