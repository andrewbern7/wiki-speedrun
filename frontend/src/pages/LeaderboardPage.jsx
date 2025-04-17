import React, { useEffect, useState } from "react";
import { useTheme } from "../components/ThemeContext";

const LeaderboardPage = () => {
  const { theme } = useTheme();
  const [leaderboard, setLeaderboard] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const isDark = theme === 'dark';

  // Fetch precomputed challenge options
  useEffect(() => {
    fetch('/api/get-precomputed-pairs')
      .then(res => res.json())
      .then(data => setChallenges(data))
  }, [])

  // Fetch leaderboard data for selected challenge
  useEffect(() => {
    if (!selectedChallenge) return
    const { start, goal } = selectedChallenge
    fetch(`/api/top-runs/${start}/${goal}`)
      .then(res => res.json())
      .then(data => setLeaderboard(data))
  }, [selectedChallenge])

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

      {/* Dropdown selector for challenges */}
      <div style={{ marginBottom: '2rem' }}>
        <select
          onChange={e => {
            const index = e.target.value;
            setSelectedChallenge(challenges[index]);
          }}
          defaultValue=""
          style={{ padding: '0.75rem', fontSize: '1.1rem', borderRadius: '6px' }}
        >
          <option value="" disabled>Select a challenge</option>
          {challenges.map((c, i) => (
            <option key={i} value={i}>
              {c.start.replace(/_/g, ' ')} → {c.goal.replace(/_/g, ' ')} ({c.distance} clicks)
            </option>
          ))}
        </select>
      </div>

      <style>
        {`
          tr:hover {
            background-color: ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(219, 234, 254, 0.5)'};
            transition: background-color 0.2s ease;
          }
        `}
      </style>

      {selectedChallenge && (
        <table style={tableStyles}>
          <thead style={theadStyles}>
            <tr>
              <th style={cellStyle}>#</th>
              <th style={cellStyle}>Player</th>
              <th style={cellStyle}>Time</th>
              <th style={cellStyle}>Clicks</th>
              <th style={cellStyle}>Date</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => (
                <tr key={index} style={{ backgroundColor: 'transparent' }}>
                  <td style={cellStyle}>{index + 1}</td>
                  <td style={cellStyle}>{entry.player_name || 'Anonymous'}</td>
                  <td style={cellStyle}>{Math.floor(entry.time_ms / 1000)}s</td>
                  <td style={cellStyle}>{entry.clicks}</td>
                  <td style={cellStyle}>{new Date(entry.timestamp).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={cellStyle} colSpan="5">
                  No leaderboard data available for this challenge.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaderboardPage;
