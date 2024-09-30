from flask import Flask, request, jsonify
from Twillio import send_sms
from base import save_message_to_db, read_available_numbers
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

@app.route('/send-sms', methods=['POST'])
def send_sms_endpoint():
    data = request.json
    to_number = data.get('to')
    message = data.get('message')

    if not to_number or not message:
        return jsonify({"error": "Missing 'to' or 'message' in request"}), 400

    try:
        # Send SMS
        result = send_sms(to_number, message)
        
        # Save message to database
        save_message_to_db(to_number, message)
        
        return jsonify({"message": "SMS sent successfully", "result": result}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/available-numbers', methods=['GET'])
def get_available_numbers():
    try:
        numbers = read_available_numbers()
        return jsonify({"available_numbers": numbers}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
