from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from db import get_db, init_db, close_db

app = Flask(__name__, static_folder='public', static_url_path='/')
CORS(app)

# Initialize database schema
init_db(app)

# Ensure DB connection closes on teardown
app.teardown_appcontext(close_db)

@app.route("/api/leaderboard", methods=["GET"])
def get_leaderboard():
    db = get_db()
    cursor = db.execute(
        'SELECT id, name, time, clicks FROM leaderboard ORDER BY time ASC LIMIT 10'
    )
    entries = [dict(row) for row in cursor.fetchall()]
    return jsonify({"leaderboard": entries})

@app.route("/api/submit-challenge-run", methods=["POST"])
def submit_challenge_run():
    data = request.json
    required = ['start', 'goal', 'player_name', 'time_ms', 'clicks']
    if not all(k in data for k in required):
        return jsonify({"error": "Missing fields"}), 400

    db = get_db()
    db.execute(
        '''INSERT INTO challenge_runs (start, goal, player_name, time_ms, clicks)
           VALUES (?, ?, ?, ?, ?)''',
        (data['start'], data['goal'], data['player_name'], data['time_ms'], data['clicks'])
    )
    db.commit()
    return jsonify({"status": "ok"}), 201

@app.route("/api/top-runs/<start>/<goal>", methods=["GET"])
def get_top_runs(start, goal):
    db = get_db()
    cursor = db.execute(
        '''SELECT player_name, time_ms, clicks, timestamp
           FROM challenge_runs
           WHERE start = ? AND goal = ?
           ORDER BY clicks ASC, time_ms ASC
           LIMIT 10''',
        (start, goal)
    )
    results = [
        {
            "player_name": row["player_name"],
            "time_ms": row["time_ms"],
            "clicks": row["clicks"],
            "timestamp": row["timestamp"]
        } for row in cursor.fetchall()
    ]
    return jsonify(results)

@app.route('/api/get-precomputed-pairs')
def get_precomputed_pairs():
    with open('precomputed_pairs.json', 'r') as f:
        pairs = json.load(f)
    return jsonify(pairs)

if __name__ == "__main__":
    app.run(debug=True)
