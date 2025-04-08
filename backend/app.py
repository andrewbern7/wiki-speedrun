from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

leaderboard = []

@app.route("/api/leaderboard", methods=["GET"])
def get_leaderboard():
    return jsonify(leaderboard)

@app.route("/api/submit-run", methods=["POST"])
def submit_run():
    data = request.json
    leaderboard.append({
        "name": data["name"],
        "time": data["time"],
        "clicks": data["clicks"]
    })
    return jsonify({"message": "Run submitted!"}), 201

if __name__ == "__main__":
    app.run(debug=True)
