import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const linkStyle = {
    marginRight: '1.5rem',
    color: '#fff',
    textDecoration: 'none',
  };

  return (
    <nav style={{ padding: '1rem', background: '#222' }}>
      <NavLink
        to="/"
        style={linkStyle}
        end
        // Check if the link is active, and apply active styles
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Home
      </NavLink>
      <NavLink
        to="/game"
        style={linkStyle}
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Game
      </NavLink>
      <NavLink
        to="/leaderboard"
        style={linkStyle}
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Leaderboard
      </NavLink>
      <NavLink
        to="/gamecontents"
        style={linkStyle}
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Game Contents
      </NavLink>
      <NavLink
        to="/teamintro"
        style={linkStyle}
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Team Intro
      </NavLink>
    </nav>
  );
};

export default NavBar;
