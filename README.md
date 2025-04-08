# Wiki Speedrun Trainer

Wiki Speedrun Trainer is a web application that lets users race through Wikipedia pages using only in-text links. Compete with yourself or others by navigating from one article to another as fast and efficiently as possible.

## Features

- Two game modes:
  - Random Start → Target
  - Challenge Mode (reach a famous person/place in X clicks)
- Timer and click counter
- Simple leaderboard (via Flask backend)
- Anti-bot ideas for future implementation
- Modern React frontend with Vite

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Flask + Flask-CORS
- **Languages:** JavaScript, Python

## Folder Structure

```
wiki-speedrun-trainer/
├── backend/           # Flask server
├── frontend/          # React app (Vite)
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

## Future Plans

- User accounts & login
- Persistent database
- Better bot detection
- Global leaderboards

## License

MIT License. See `LICENSE` file (to be added).
