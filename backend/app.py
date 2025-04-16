from flask import Flask, request, jsonify
from flask_cors import CORS
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

@app.route("/api/submit-run", methods=["POST"])
def submit_run():
    data = request.json
    name = data.get("name")
    time_value = data.get("time")
    clicks = data.get("clicks")
    if not all([name, time_value, clicks]):
        return jsonify({"error": "Missing data"}), 400

    db = get_db()
    cursor = db.execute(
        'INSERT INTO leaderboard (name, time, clicks) VALUES (?, ?, ?)',
        (name, time_value, clicks)
    )
    db.commit()
    return jsonify({"message": "Run submitted!", "id": cursor.lastrowid}), 201

if __name__ == "__main__":
    app.run(debug=True)
