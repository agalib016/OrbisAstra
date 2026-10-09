import os
from flask import Flask, render_template, send_from_directory

# Base directory of the project
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_DIR = os.path.join(BASE_DIR, 'templates')
STATIC_DIR = os.path.join(BASE_DIR, 'static')

app = Flask(
    __name__,
    template_folder=TEMPLATE_DIR,
    static_folder=STATIC_DIR
)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(STATIC_DIR, 'images'),
                               'favicon.jpg', mimetype='image/jpeg')

@app.route('/manifest.json')
def manifest():
    return send_from_directory(STATIC_DIR,
                               'manifest.json', mimetype='application/json')

@app.route('/sw.js')
def service_worker():
    return send_from_directory(STATIC_DIR,
                               'sw.js', mimetype='application/javascript')

if __name__ == '__main__':
    # Listen on all network interfaces so phones on the local Wi-Fi can connect
    app.run(debug=True, host='0.0.0.0', port=5000)
