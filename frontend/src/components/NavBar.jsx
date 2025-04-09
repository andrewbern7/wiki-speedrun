import { NavLink } from 'react-router-dom'

const NavBar = () => {
  const linkStyle = {
    marginRight: '1.5rem',
    color: '#fff',
    textDecoration: 'none'
  }

  const activeStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline'
  }

  return (
    <nav style={{ padding: '1rem', background: '#222' }}>
      <NavLink to="/" style={linkStyle} activeStyle={activeStyle} end>Home</NavLink>
      <NavLink to="/game" style={linkStyle} activeStyle={activeStyle}>Game</NavLink>
      <NavLink to="/leaderboard" style={linkStyle} activeStyle={activeStyle}>Leaderboard</NavLink>
    </nav>
  )
}

export default NavBar
