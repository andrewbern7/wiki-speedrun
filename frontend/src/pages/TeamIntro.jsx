import React from "react";
import { useTheme } from "../components/ThemeContext";

const TeamIntro = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const containerStyle = {
    padding: "4rem 2rem",
    backgroundColor: isDark ? "#1e1e1e" : "#f3f4f6",
    color: isDark ? "#f9fafb" : "#1e1e1e",
    fontFamily: "system-ui, sans-serif",
    maxWidth: "850px",
    margin: "0 auto",
    lineHeight: 1.75
  };

  const headingStyle = {
    fontSize: "3rem",
    fontWeight: 800,
    color: isDark ? "#60a5fa" : "#1e40af",
    textAlign: "center",
    marginBottom: "2rem"
  };

  const subheadingStyle = {
    fontSize: "1.5rem",
    fontWeight: 600,
    marginTop: "2rem",
    marginBottom: "1rem",
    color: isDark ? "#a0aec0" : "#1e3a8a"
  };

  const paragraphStyle = {
    fontSize: "1.15rem"
  };

  const listItemStyle = {
    marginBottom: "1rem"
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Meet the Team</h1>

      <p style={paragraphStyle}>
        We are a team of passionate college students building a high-quality, accessible
        experience with the Wiki Speedrun Trainer. Each member has contributed their own unique skills to help bring
        this app to life.
      </p>

      <h2 style={subheadingStyle}>Team Members</h2>
      <ul style={{ paddingLeft: "1.5rem" }}>
        <li style={listItemStyle}>
          <strong>Andrew Bernacki</strong><br />
          Project Lead · Fullstack Developer<br />
          Responsible for architecture, backend logic, game tracking, and team coordination.
        </li>
        <li style={listItemStyle}>
          <strong>Lucas Kuhn</strong><br />
          Frontend Developer · UI/UX Designer<br />
          Focused on layout design, accessibility, color themes, and smooth user experience.
        </li>
        <li style={listItemStyle}>
          <strong>Chase Corbett</strong><br />
          React Developer · Game Logic Specialist<br />
          Implemented navigation systems, state tracking, and challenge integration features.
        </li>
        <li style={listItemStyle}>
          <strong>Clarence Funkhouser</strong><br />
          Database Engineer · Documentation Specialist<br />
          Designed back-end API routes and helped initialize the Database. Also assisted in documentation.
        </li>
      </ul>
    </div>
  );
};

export default TeamIntro;
