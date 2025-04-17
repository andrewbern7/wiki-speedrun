import sqlite3
import random
import json
from datetime import datetime, timedelta

DB_PATH = './leaderboard.db'
PAIR_FILE = './precomputed_pairs.json'

# Simple realistic first names
FIRST_NAMES = [
    "Alex", "Jordan", "Taylor", "Morgan", "Jamie", "Casey", "Drew", "Sam", "Charlie", "Riley",
    "Skyler", "Reese", "Emerson", "Bailey", "Quinn", "Avery", "Parker", "Dakota", "Jesse", "Logan"
]

def random_name():
    return random.choice(FIRST_NAMES)

def generate_run_data(distance):
    skill = random.choices(
        ['beginner', 'intermediate', 'expert'],
        weights=[0.3, 0.5, 0.2]
    )[0]

    if skill == 'expert':
        clicks = distance
        time_ms = random.randint(15000, 30000)
    elif skill == 'intermediate':
        clicks = distance + random.randint(1, 3)
        time_ms = random.randint(30000, 70000)
    else:
        clicks = distance + random.randint(2, 6)
        time_ms = random.randint(70000, 150000)

    timestamp = datetime.now() - timedelta(days=random.randint(1, 30))
    return clicks, time_ms, timestamp

def populate_challenges():
    with open(PAIR_FILE, 'r') as f:
        challenges = json.load(f)

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Ensure table exists
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS challenge_runs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            start TEXT NOT NULL,
            goal TEXT NOT NULL,
            player_name TEXT,
            time_ms INTEGER,
            clicks INTEGER,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    for challenge in challenges:
        for _ in range(random.randint(5, 10)):
            name = random_name()
            clicks, time_ms, ts = generate_run_data(challenge['distance'])
            cursor.execute('''
                INSERT INTO challenge_runs (start, goal, player_name, time_ms, clicks, timestamp)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (
                challenge['start'],
                challenge['goal'],
                name,
                time_ms,
                clicks,
                ts.isoformat()
            ))

    conn.commit()
    conn.close()
    print("✅ challenge_runs table populated with realistic fake entries.")

if __name__ == '__main__':
    populate_challenges()
