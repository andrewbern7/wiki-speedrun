# Wiki Speedrun Trainer

Wiki Speedrun Trainer is a web application that lets users race through Wikipedia pages using only in-text links. Navigate from a starting article to a target article using as few clicks and as little time as possible.

## Creators
 - **Andrew Bernacki**
 - **Clarence Funkhouser**
 - **Chase Corbett**
 - **Lucas Kuhn**

## Features

- **Random Mode:** Navigate from a randomly selected article to a randomly chosen goal.
- **Path Precomputation (Optional):** Backend-precomputed start/goal pairs with shortest paths.
- **Timer and Click Counter:** Real-time tracking of time and link clicks.
- **Pause/Resume Functionality:** Temporary break during runs without losing progress.
- **Session Persistence:** Games auto-save in localStorage; continue where you left off.
- **Leaderboard:** Record and submit high scores (clicks + time).
- **Theming Support:** Light/Dark mode toggle via `ThemeContext`.
- **React + Vite Frontend:** Fast, modular modern UI.
- **Flask Backend:** Handles leaderboard logic and API routes.

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Flask + Flask-CORS
- **Languages:** JavaScript, Python
- **Database:** SQLite (for local leaderboard)

## Folder Structure

```
wiki-speedrun-trainer/
├── backend/           # Flask server
│   ├── app.py         # API endpoints and leaderboard logic
│   ├── db.py          # SQLite database interface
│   └── leaderboard.db # SQLite database file
├── frontend/          # React app (Vite)
│   ├── components/    # WikiViewer, NavBar, ThemeContext, etc.
│   ├── pages/         # HomePage, GamePage, LeaderboardPage, etc.
│   └── App.jsx        # Root component
├── .gitignore
├── README.md
```

## Development

### 1. Backend (Flask)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py
```

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

- `GET /api/leaderboard` → Fetch leaderboard data
- `POST /api/submit-run` → Submit a new speedrun
- `GET /api/get-precomputed-pairs` → Get precomputed start/goal pairs

## License

MIT License. See `LICENSE` file.
