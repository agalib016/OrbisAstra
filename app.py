import os
from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static', 'images'),
                               'favicon.jpg', mimetype='image/jpeg')

@app.route('/manifest.json')
def manifest():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'manifest.json', mimetype='application/json')

@app.route('/sw.js')
def service_worker():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'sw.js', mimetype='application/javascript')

if __name__ == '__main__':
    # Listen on all network interfaces so phones on the local Wi-Fi can connect
    app.run(debug=True, host='0.0.0.0', port=5000)
