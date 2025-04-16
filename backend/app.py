import sqlite3
from flask import g

DATABASE = './leaderboard.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db

def init_db():
    db = get_db()
    db.execute('''
        CREATE TABLE IF NOT EXISTS leaderboard (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            time TEXT NOT NULL,
            clicks INTEGER NOT NULL
        )
    ''')
    db.commit()

@app.before_first_request
def initialize():
    init_db()

@app.route("/api/leaderboard", methods=["GET"])
def get_leaderboard():
    db = get_db()
    cursor = db.execute('SELECT id, name, time, clicks FROM leaderboard ORDER BY time ASC LIMIT 10')
    entries = [dict(row) for row in cursor.fetchall()]
    return jsonify({"leaderboard": entries})

@app.route("/api/submit-run", methods=["POST"])
def submit_run():
    data = request.json
    name = data.get("name")
    time = data.get("time")
    clicks = data.get("clicks")
    if not all([name, time, clicks]):
        return jsonify({"error": "Missing data"}), 400

    db = get_db()
    cursor = db.execute('INSERT INTO leaderboard (name, time, clicks) VALUES (?, ?, ?)', (name, time, clicks))
    db.commit()
    return jsonify({"message": "Run submitted!", "id": cursor.lastrowid}), 201

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

if __name__ == "__main__":
    app.run(debug=True)
