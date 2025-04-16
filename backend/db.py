import sqlite3
from flask import g

DATABASE = './leaderboard.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
        db.row_factory = sqlite3.Row
    return db


def init_db(app):
    """
    Initialize the database schema. Call this early in your app setup (e.g., before first request).
    """
    with app.app_context():
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


def close_db(e=None):
    """
    Close the database connection at the end of a request.
    """
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()