import { NavLink } from 'react-router-dom'

const NavBar = () => {
  const linkStyle = {
    marginRight: '1.5rem',
    color: '#fff',
    textDecoration: 'none',
    transition: 'color 0.3s ease'
  }

  const activeStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline'
  }

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#1a1a1a',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
      backdropFilter: 'blur(4px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <NavLink to="/" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeStyle : {}) })} end>Home</NavLink>
      <NavLink to="/game" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeStyle : {}) })}>Game</NavLink>
      <NavLink to="/leaderboard" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeStyle : {}) })}>Leaderboard</NavLink>
    </nav>
  )
}

export default NavBar
