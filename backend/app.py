from flask import Flask, request, jsonify
from flask_cors import CORS
import math

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

def scale_bdi_score(score):
    """Scale BDI score (0-3) to match 0-4 range."""
    scaled = round(score * 4 / 3)
    return min(scaled, 4)  # Ensure score doesn't exceed 4

def reverse_pss_score(score):
    """Reverse score for PSS positive questions."""
    return 4 - score

def calculate_total_score(responses):
    """Calculate total score with adjustments."""
    total = 0
    
    # HAM-A questions (q1-q7): Direct scoring (0-4)
    for i in range(1, 8):
        total += responses[f"q{i}"]
    
    # BDI questions (q8-q14): Scale 0-3 to 0-4
    for i in range(8, 15):
        total += scale_bdi_score(responses[f"q{i}"])
    
    # PSS questions (q15-q20): Direct scoring, reverse q18, q19
    for i in range(15, 21):
        if i in [18, 19]:
            total += reverse_pss_score(responses[f"q{i}"])
        else:
            total += responses[f"q{i}"]
    
    return total

def get_severity_category(score):
    """Map total score to severity category."""
    if 0 <= score <= 20:
        return "Low severity"
    elif 21 <= score <= 40:
        return "Mild to moderate severity"
    elif 41 <= score <= 60:
        return "Moderate to severe"
    elif 61 <= score <= 80:
        return "Severe to extreme"
    else:
        return "Invalid score"

@app.route('/calculate-score', methods=['POST'])
def calculate_score():
    """
    API endpoint to calculate total score and severity category.
    Expects JSON payload: {"q1": 0, "q2": 1, ..., "q20": 2}
    Returns: {"total_score": int, "severity_category": str}
    """
    try:
        data = request.get_json()
        if not data or not all(f"q{i}" in data for i in range(1, 21)):
            return jsonify({"error": "Missing or incomplete responses"}), 400
        
        # Validate response values
        responses = {}
        for i in range(1, 21):
            score = data[f"q{i}"]
            if not isinstance(score, int):
                return jsonify({"error": f"Invalid score for q{i}: must be an integer"}), 400
            
            # HAM-A (q1-q7) and PSS (q15-q20): 0-4
            if i <= 7 or i >= 15:
                if score < 0 or score > 4:
                    return jsonify({"error": f"Invalid score for q{i}: must be 0-4"}), 400
            # BDI (q8-q14): 0-3
            else:
                if score < 0 or score > 3:
                    return jsonify({"error": f"Invalid score for q{i}: must be 0-3"}), 400
            responses[f"q{i}"] = score
        
        # Calculate total score
        total_score = calculate_total_score(responses)
        
        # Get severity category
        severity_category = get_severity_category(total_score)
        
        return jsonify({
            "total_score": total_score,
            "severity_category": severity_category
        }), 200
    
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3000)