from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
from app.utils import create_get_response, create_post_response
from ml_model.text_classification import text_classification_model
from collections import defaultdict 

app = Flask(__name__)
socketio = SocketIO(app)
c_dict = []

@app.route('/')
def index():
    return render_template("index.html")

@socketio.on('connect')
def connect():
    with open("file_storage/file.txt", "r") as file:
        text = file.read()
    text = {"text" : text}
    emit("connect_response", text)

@socketio.on('update_text')
def handle_text_update(data):
    with open("file_storage/file.txt", "w") as file:
        file.write(data["text"])

@app.route('/classify', methods=['POST'])
def classify():
    text = request.json['text']
    categories = ["Meetings and Events", "To-Do Lists and Tasks", "Project Updates", "Class Notes"]
    model = text_classification_model()
    c_dict.clear()
    for s in text:
        c_dict.append({"text": s, "class" : model.classify(categories, s)})
    return create_post_response("classification complete")

@app.route('/get_classified_text', methods=['GET'])
def get_classified_text():
    return jsonify(c_dict)

if __name__ == '__main__':
    app.run(debug=True)
    socketio.run(app, debug=True)
