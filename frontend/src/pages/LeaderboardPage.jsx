import { useTheme } from "../components/ThemeContext";


const LeaderboardPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const pageStyles = {
    minHeight: '100vh',
    backgroundColor: isDark ? '#1e1e1e' : '#f3f4f6',
    color: isDark ? '#f9fafb' : '#1e1e1e',
    padding: '4rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const headerStyles = {
    fontSize: '4rem',
    fontWeight: 900,
    color: isDark ? '#60a5fa' : '#1e40af',
    marginBottom: '2.5rem',
    textAlign: 'center',
    letterSpacing: '-1px',
  };

  const tableStyles = {
    width: '100%',
    maxWidth: '1000px',
    overflowX: 'auto',
    borderRadius: '12px',
    boxShadow: isDark
      ? '0 4px 20px rgba(255, 255, 255, 0.05)'
      : '0 4px 20px rgba(0, 0, 0, 0.06)',
    backgroundColor: 'transparent',
  };

  const theadStyles = {
    backgroundColor: isDark ? '#374151' : '#1d4ed8',
    color: 'white',
    fontWeight: 600,
    fontSize: '1.25rem',
    letterSpacing: '0.5px',
  };

  const cellStyle = {
    padding: '1.5rem',
  };

  return (
    <div style={pageStyles}>
      <h1 style={headerStyles}>Leaderboard</h1>

      <style>
        {`
          tr:hover {
            background-color: ${
              isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(219, 234, 254, 0.5)'
            };
            transition: background-color 0.2s ease;
          }
        `}
      </style>

      <table style={tableStyles}>
        <thead style={theadStyles}>
          <tr>
            <th style={cellStyle}>#</th>
            <th style={cellStyle}>Player</th>
            <th style={cellStyle}>Fastest Time</th>
            <th style={cellStyle}>Fastest Click</th>
            <th style={cellStyle}>Recent Runs</th>
            <th style={cellStyle}>Fewest Clicks</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ backgroundColor: 'transparent' }}>
            <td style={cellStyle}>01</td>
            <td style={cellStyle}>Alice</td>
            <td style={cellStyle}>1:23</td>
            <td style={cellStyle}>4</td>
            <td style={cellStyle}>6</td>
            <td style={cellStyle}>3</td>
          </tr>
          <tr style={{ backgroundColor: 'transparent' }}>
            <td style={cellStyle}>02</td>
            <td style={cellStyle}>Bob</td>
            <td style={cellStyle}>1:45</td>
            <td style={cellStyle}>5</td>
            <td style={cellStyle}>5</td>
            <td style={cellStyle}>4</td>
          </tr>
          <tr style={{ backgroundColor: 'transparent' }}>
            <td style={cellStyle}>03</td>
            <td style={cellStyle}>Charlie</td>
            <td style={cellStyle}>2:01</td>
            <td style={cellStyle}>6</td>
            <td style={cellStyle}>8</td>
            <td style={cellStyle}>4</td>
          </tr>
          <tr style={{ backgroundColor: 'transparent' }}>
            <td style={cellStyle}>04</td>
            <td style={cellStyle}>Dana</td>
            <td style={cellStyle}>2:20</td>
            <td style={cellStyle}>7</td>
            <td style={cellStyle}>9</td>
            <td style={cellStyle}>6</td>
          </tr>
          <tr style={{ backgroundColor: 'transparent' }}>
            <td style={cellStyle}>05</td>
            <td style={cellStyle}>Eli</td>
            <td style={cellStyle}>2:45</td>
            <td style={cellStyle}>8</td>
            <td style={cellStyle}>7</td>
            <td style={cellStyle}>5</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;
