# app.py
from flask import Flask,render_template

app = Flask(__name__,template_folder="templates",static_folder="static",static_url_path="/backend/static")

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run('127.0.0.1', port=5000, debug=True)