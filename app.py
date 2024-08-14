from flask import Flask,render_template,request,jsonify
from flask_cors import CORS
from chat import get_response
from student_chat.stud_chat import get_response as gp


app=Flask(__name__)
CORS(app)

@app.route('/predict', methods=["POST"])
def predict():
    text=request.get_json().get("message")
    response=get_response(text)
    message={"answer":response}
    return jsonify(message)

@app.route('/user', methods=["POST"])
def user():
    text=request.get_json().get("message")
    response=gp(text)
    message={"answer":response}
    return jsonify(message)


if __name__=="__main__":
    app.run(debug=True)