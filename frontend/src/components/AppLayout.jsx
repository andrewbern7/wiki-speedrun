import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import { useTheme } from './ThemeContext'

const AppLayout = () => {
  const { toggleTheme } = useTheme()

  return (
    <>
      <NavBar />
      <main style={{
        padding: '1.5rem',
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-text)',
        minHeight: '100vh'
      }}>
        <button onClick={toggleTheme} style={{
          marginBottom: '1rem',
          background: '#333',
          color: '#eee',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Toggle Theme
        </button>
        <Outlet />
      </main>
    </>
  )
}

export default AppLayout
