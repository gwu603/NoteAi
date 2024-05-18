from flask import jsonify

def create_post_response(message=''):
    response = {
        'data': message
    }
    return jsonify(response)

def create_get_response(data):
    return jsonify(data)