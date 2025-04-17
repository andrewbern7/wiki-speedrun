import React from "react";
import { useTheme } from "../components/ThemeContext";

const GameContents = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const pageStyle = {
    padding: "4rem 2rem",
    backgroundColor: isDark ? "#1e1e1e" : "#f3f4f6",
    color: isDark ? "#f9fafb" : "#1e1e1e",
    fontFamily: "system-ui, sans-serif",
    lineHeight: 1.75,
    maxWidth: "850px",
    margin: "0 auto"
  };

  const headerStyle = {
    fontSize: "2.75rem",
    fontWeight: 800,
    marginBottom: "1rem",
    color: isDark ? "#60a5fa" : "#1e40af"
  };

  const subHeader = {
    fontSize: "1.5rem",
    fontWeight: 700,
    marginTop: "2rem",
    marginBottom: "1rem",
    color: isDark ? "#a0aec0" : "#1e3a8a"
  };

  const listStyle = {
    paddingLeft: "1.5rem",
    marginTop: "0.5rem"
  };

  const listItem = {
    marginBottom: "0.75rem"
  };

  return (
    <div style={pageStyle}>
      <h1 style={headerStyle}>Game Overview</h1>
      <p>
        The Wiki Speedrun Trainer is a timed challenge where you must navigate from one Wikipedia article to another using only in-article hyperlinks. Your goal is to reach the destination as quickly and efficiently as possible.
      </p>

      <h2 style={subHeader}>Game Modes</h2>
      <ul style={listStyle}>
        <li style={listItem}>
          <strong>Challenge Mode:</strong> Choose from precomputed challenges that test your speed and logic across real Wikipedia paths. Your score is tracked on challenge-specific leaderboards.
        </li>
        <li style={listItem}>
          <strong>Free Play (Planned):</strong> In future versions, users may select their own start and end pages to practice freely or create custom runs.
        </li>
      </ul>

      <h2 style={subHeader}>Features</h2>
      <ul style={listStyle}>
        <li style={listItem}><strong>Live Timer</strong> that records total run duration in real-time</li>
        <li style={listItem}><strong>Click Counter</strong> that tracks each page visited</li>
        <li style={listItem}><strong>Automatic Goal Detection</strong> when the target page is reached</li>
        <li style={listItem}><strong>Challenge-Based Leaderboards</strong> with performance breakdowns</li>
        <li style={listItem}><strong>Dark and Light Theme</strong> support across the entire app</li>
        <li style={listItem}><strong>Responsive UI</strong> optimized for desktop and modern browsers</li>
      </ul>

      <h2 style={subHeader}>Objective</h2>
      <p>
        Your mission is to navigate from a designated start article to a known goal article using as few clicks and as little time as possible. You may only use valid, in-article links.
      </p>
    </div>
  );
};

export default GameContents;
