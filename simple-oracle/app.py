
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

class Condition(object):
    def __init__(self):
        self._condition = False
    
    def set_condition(self):
        self._condition = True
    
    def get_condition(self):
        return self._condition

condition = Condition()


def handle_requests(method):
    data = {}
    if request.method == "POST":
        condition.set_condition()
        data["status"] = "Success"
        data["mesaage"] = "Condition set successfully"
    else:
        state = condition.get_condition()
        data["status"] = "Success"
        data["message"] = "{}".format(state)
    return data


@app.route('/set-condition', methods=['GET', 'POST'])
def set_condition():
    method = request.method
    data = handle_requests(method)
    return jsonify(data)

if __name__ == "__main__":
    app.run()
