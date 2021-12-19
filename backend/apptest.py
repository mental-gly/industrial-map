# apptest.py
from flask import Flask,render_template,request,make_response
from flask_cors import CORS

app = Flask(__name__,template_folder="templates",static_folder="static",static_url_path="/backend/static")
CORS(app)

@app.route('/',methods = ['POST','GET','OPTIONS'])
def index():
    return "1"

@app.route('/login', methods=['GET','POST'])
def login():
    return "1"

@app.route('/mdata', methods=['GET','POST'])
def mdata():
    return "1"
@app.route('/register', methods=['GET','POST'])
def register():
    return "0"

if __name__ == '__main__':
    app.run('127.0.0.1', port=5000, debug=True)