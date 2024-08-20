from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import json
import logging
import re

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Configure logging
logging.basicConfig(level=logging.INFO)

# In-memory database (for simplicity)
flashcards = []
flashcard_id = 1

@app.route('/api/flashcards', methods=['GET'])
def get_flashcards():
    return jsonify(flashcards)

@app.route('/api/flashcards', methods=['POST'])
def add_flashcard():
    global flashcard_id
    data = request.json
    new_flashcard = {
        'id': flashcard_id,
        'front': data['front'],
        'back': data['back']
    }
    flashcards.append(new_flashcard)
    flashcard_id += 1
    return jsonify(new_flashcard), 201

@app.route('/api/flashcards/<int:id>', methods=['PUT'])
def update_flashcard(id):
    data = request.json
    flashcard = next((fc for fc in flashcards if fc['id'] == id), None)
    if flashcard:
        flashcard['front'] = data.get('front', flashcard['front'])
        flashcard['back'] = data.get('back', flashcard['back'])
        return jsonify(flashcard)
    else:
        return jsonify({'error': 'Flashcard not found'}), 404

@app.route('/api/flashcards/<int:id>', methods=['DELETE'])
def delete_flashcard(id):
    global flashcards
    flashcards = [fc for fc in flashcards if fc['id'] != id]
    return jsonify({'message': 'Flashcard deleted'})

@app.route('/api/generate-flashcards', methods=['POST'])
def generate_flashcards():
    try:
        data = request.json
        notes = data.get('notes', '')

        API_KEY = 'AIzaSyBgTLInXBrx-mhdLStDlFfknwizmWFKb8I'  # Replace with your actual API key
        prompt = """Generate flashcards in the JSON format below, don't write any other things:
        {
          "flashcards": [
            { "front": "Flashcard Front 1", "back": "Flashcard Back 1" },
            { "front": "Flashcard Front 2", "back": "Flashcard Back 2" }
          ]
        }
        based on the following notes:
        """
        prompt += notes

        genai.configure(api_key=API_KEY)
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        response = model.generate_content(prompt)

        # Log the raw response for debugging
        logging.info(f"Raw API response: {response.text}")

        # Attempt to clean the response
        cleaned_response = re.search(r'\{.*\}', response.text, re.DOTALL)
        if cleaned_response:
            cleaned_json = cleaned_response.group(0)
            logging.info(f"Cleaned JSON: {cleaned_json}")
            flashcards = json.loads(cleaned_json)
        else:
            raise ValueError("Could not find valid JSON in the response")

        return jsonify(flashcards)
    except json.JSONDecodeError as e:
        logging.error(f"JSON decode error: {str(e)}")
        logging.error(f"Problematic JSON: {response.text}")
        return jsonify({'error': 'Failed to parse generated flashcards', 'details': str(e), 'raw_response': response.text}), 500
    except Exception as e:
        logging.error(f"Error generating flashcards: {str(e)}")
        return jsonify({'error': 'Failed to generate flashcards', 'details': str(e), 'raw_response': response.text if 'response' in locals() else 'No response generated'}), 500

if __name__ == '__main__':
    app.run(debug=True)
