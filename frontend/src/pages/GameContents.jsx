import React from "react";

const GameContents = () => {
  return (
    <div className="game-contents">
      <h1>Game Overview</h1>
      <p>
        Wiki Speedrun Trainer is a web application where users race through Wikipedia pages using only in-text links.
        The goal is to reach a target article as quickly as possible using the least number of clicks.
      </p>

      <h2>Game Modes</h2>
      <ul>
        <li>
          <strong>Random Start → Target:</strong> Start from a random Wikipedia page and try to reach a specific target page as quickly as possible.
        </li>
        <li>
          <strong>Challenge Mode:</strong> Attempt to reach a famous person/place within a specific number of clicks.
        </li>
      </ul>

      <h2>Game Features</h2>
      <ul>
        <li><strong>Timer</strong> to track how long the player takes to complete each game.</li>
        <li><strong>Click Counter</strong> to track the number of clicks used during gameplay.</li>
        <li><strong>Leaderboard</strong> to compare your performance with others.</li>
        <li><strong>Anti-bot Mechanisms</strong> to ensure fair play and challenge real users.</li>
        <li><strong>Responsive and modern UI</strong> built with React for a smooth user experience.</li>
      </ul>

      <h2>Game Objective</h2>
      <p>
        The objective of the game is to navigate through Wikipedia articles as fast as possible, from one page to another using only the in-text links, with minimal clicks. Compete against others or challenge yourself to beat your previous record!
      </p>
    </div>
  );
};

export default GameContents;