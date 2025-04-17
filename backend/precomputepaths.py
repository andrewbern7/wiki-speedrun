import requests
from collections import deque
import json

WIKI_API = "https://en.wikipedia.org/w/api.php"

# Simple similarity score based on shared keywords
def similarity_score(title, candidate, goal):
    title_words = set(title.lower().split())
    goal_words = set(goal.lower().split())
    candidate_words = set(candidate.lower().split())
    shared_with_goal = len(candidate_words & goal_words)
    shared_with_start = len(candidate_words & title_words)
    return shared_with_goal + 0.5 * shared_with_start

# Get valid links from a Wikipedia page
def get_links(title):
    params = {
        "action": "parse",
        "page": title,
        "prop": "links",
        "format": "json"
    }
    headers = {
        'User-Agent': 'WikiSpeedrunBot/1.0 (your_email@example.com)'
    }
    try:
        res = requests.get(WIKI_API, params=params, headers=headers, timeout=10)
        res.raise_for_status()
        data = res.json()

        if 'error' in data:
            print(f"Wikipedia returned error for {title}: {data['error']}")
            return []

        links = data.get('parse', {}).get('links', [])
        valid_links = [link['*'] for link in links if 'exists' in link and link['ns'] == 0]
        print(f"Fetched {len(valid_links)} links from {title}")
        return valid_links
    except requests.exceptions.RequestException as e:
        print(f"RequestException fetching links from {title}: {e}")
        return []
    except ValueError as e:
        print(f"JSON decoding error for {title}: {e}")
        return []

# Compute shortest path using BFS with heuristic scoring
def shortest_path(start, goal, max_depth=5):
    visited = set()
    queue = deque([[start]])

    while queue:
        path = queue.popleft()
        node = path[-1]

        if len(path) > max_depth + 1:
            continue

        if node == goal:
            return path

        if node in visited:
            continue
        visited.add(node)

        neighbors = get_links(node)
        scored_neighbors = sorted(neighbors, key=lambda x: -similarity_score(node, x, goal))

        for neighbor in scored_neighbors:
            if neighbor not in visited:
                queue.append(path + [neighbor])

    return None

# List of start-goal pairs (refer to wikipedia for exact titles)
pairs = [
    ("Albert Einstein", "Physics"),
    ("New York City", "United States"),
    ("World War II", "Adolf Hitler"),
    ("Python (programming language)", "Programming language"),
    ("Basketball", "Sport"),
    ("Sparta", "Thermopylae"),
    ("Industrial Revolution", "Steam engine"),
    ("Minecraft", "Ender Dragon"),
    ("Moore's Law", "Transistor"),
    ("The Witcher", "Galahad"),
]

# Compute and save results
results = []
for start, goal in pairs:
    print(f"Computing: {start} → {goal}")
    path = shortest_path(start, goal, max_depth=5)
    if path:
        results.append({
            "start": start.replace(' ', '_'),
            "goal": goal.replace(' ', '_'),
            "distance": len(path) - 1,
            "path": [step.replace(' ', '_') for step in path]
        })
        print(f"Found path of distance {len(path) - 1}")
    else:
        print("No path found within max depth.")

# Function to rank results from easiest to hardest based on distance
def rank_by_difficulty(results):
    return sorted(results, key=lambda x: x['distance'])

# Rank the results
ranked_results = rank_by_difficulty(results)

# Save to JSON
with open('precomputed_pairs.json', 'w') as f:
    json.dump(ranked_results, f, indent=4)

print("Precomputation complete! Saved to precomputed_pairs.json.")
