import React, { useEffect, useState } from "react";
import { useTheme } from "../components/ThemeContext";

const LeaderboardPage = () => {
  const { theme } = useTheme();
  const [leaderboard, setLeaderboard] = useState([]);
  const isDark = theme === 'dark';

  useEffect(() => {
    console.log('[LeaderboardPage] Component mounted. Theme:', theme, 'isDark:', isDark);
    console.log('[LeaderboardPage] Fetching leaderboard from /api/leaderboard...');
    fetch('/api/leaderboard')
      .then(response => {
        console.log('[LeaderboardPage] Received response status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('[LeaderboardPage] Response JSON:', data);
        const entries = data.leaderboard || [];
        console.log('[LeaderboardPage] Parsed leaderboard entries:', entries);
        setLeaderboard(entries);
      })
      .catch(error => {
        console.error('[LeaderboardPage] Error fetching leaderboard:', error);
      });
  }, [theme, isDark]);

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
            background-color: ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(219, 234, 254, 0.5)'};
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
            <th style={cellStyle}>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.length > 0 ? (
            leaderboard.map((entry, index) => (
              <tr key={entry.id} style={{ backgroundColor: 'transparent' }}>
                <td style={cellStyle}>{index + 1}</td>
                <td style={cellStyle}>{entry.name}</td>
                <td style={cellStyle}>{entry.time}</td>
                <td style={cellStyle}>{entry.clicks}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={cellStyle} colSpan="4">
                No leaderboard data available. Be the first to set a record!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;
